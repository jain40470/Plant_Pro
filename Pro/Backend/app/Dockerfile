FROM python:3.9-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    pkg-config \
    && apt-get clean

# Install additional dependencies for h5py
RUN apt-get install -y \
    libhdf5-dev \
    && apt-get clean

# Install h5py
RUN pip install --upgrade pip && pip install h5py


WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]