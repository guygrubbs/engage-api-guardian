# Use official Python image as the base
FROM python:3.10

# Set the working directory in the container
WORKDIR /app

# Copy all project files to the container
COPY . .

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Expose the API port
EXPOSE 5000

# Start the application using Gunicorn for Flask API
CMD ["gunicorn", "-b", "0.0.0.0:5000", "main:app"]
