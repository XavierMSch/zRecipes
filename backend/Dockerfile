# Use Python 3.12 slim image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt ./backend/

# Install Python dependencies
RUN pip install --no-cache-dir -r ./backend/requirements.txt

# Copy application code
COPY . ./backend/

# Expose port
EXPOSE 8000

# Run the application
CMD ["python", "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]