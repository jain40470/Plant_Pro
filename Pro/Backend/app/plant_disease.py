import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import *
from tensorflow.keras.models import Model

class ClassToken(Layer):
    
    def __init__(self):
        super().__init__()
        
    def build(self, input_shape):
        
        w_init = tf.random_normal_initializer()
        self.w = tf.Variable(
            initial_value = w_init( shape = (1 , 1 , input_shape[-1]) , dtype = tf.float32 ),
            trainable = True
        )
    
    def call(self , inputs):
        
        batch_size = tf.shape(inputs)[0]
        hidden_dim = self.w.shape[-1]
        cls = tf.broadcast_to( self.w , [batch_size , 1 , hidden_dim ])
        cls = tf.cast(cls , dtype = inputs.dtype)
        
        return cls

tf.keras.utils.get_custom_objects().update({"ClassToken": ClassToken})

def mlp(x,cf):
    x = Dense(cf["mlp_dim"] , activation = "gelu")(x)
    x = Dropout(cf["dropout_rate"])(x)
    x = Dense(cf["hidden_dim"])(x)
    x = Dropout(cf["dropout_rate"])(x)
    return x
    
def transformer_encoder(x , cf):
    
    skip_1 = x
    
    x = LayerNormalization()(x)
    x = MultiHeadAttention(
        num_heads = cf["num_head"] , key_dim = cf["hidden_dim"]
    )(x , x)
    x = Add()([x,skip_1])
    
    skip_2 = x
    x = LayerNormalization()(x)
    x = mlp(x,cf)
    x = Add()([x , skip_2])
    
    return x
    

def Vit(cf): 
    
    print(cf)
    
    #cf : config
    
    #Inputs
    input_shape = ( cf["num_patches"] , cf["patch_size"] * cf["patch_size"] *  cf["num_channels"] )
    inputs = Input(input_shape)   # (None, 144, 3072)
    print("Input shape :",inputs.shape)

    
    #Patch + Posn Embeddings
    patch_embed = Dense(cf["hidden_dim"])(inputs)   #(None, 144, 768)
    print("Patch_Embed shape :",patch_embed.shape)
    
    positions = tf.range(start = 0,limit = cf["num_patches"] ,delta = 1)  #(144,)
    pos_embed = Embedding(input_dim = cf["num_patches"] , output_dim = cf["hidden_dim"] )(positions)  #(144, 768)
    print("Position_Embed shape :",pos_embed.shape)
    
    embed = patch_embed + pos_embed   #(None, 144, 768)
    print("Embedding shape :",embed.shape)
    
    #Adding ClassToken
    token = ClassToken()(embed) 
    x = Concatenate(axis = 1)([token , embed])  #(None, 145, 768)
    print("After added the class token :",x.shape)
    
    #Transformer Encoder 
    
    for _ in range(cf["num_layers"]):   #(None, 145, 768)
        x = transformer_encoder(x,cf)
    print("After Transformer Encoder",x.shape)
    
    #Classification Head
    x = LayerNormalization()(x)   #(None, 145, 768)
    x = x[:,0,:]
    print("Classfin head shape :",x.shape)  
    
    x = Dropout(0.1)(x)
    x = Dense(cf["num_classes"],activation = 'softmax')(x)
    
    print("Output",x.shape)
    
    model = Model(inputs,x)
    
    return model
    