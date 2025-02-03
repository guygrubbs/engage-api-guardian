# **AI-Powered Report Generation Backend - README**  
This **README** provides detailed instructions for configuring, testing, deploying, and updating the **AI-powered report generation backend** using **Flask, Celery, OpenAI, Google Cloud Services, and Redis**.

---

# **📌 Table of Contents**
1. **[Overview](#overview)**
2. **[System Architecture](#system-architecture)**
3. **[Configuration](#configuration)**
4. **[Setting Up the Environment](#setting-up-the-environment)**
5. **[Running the Application Locally](#running-the-application-locally)**
6. **[Testing the Application](#testing-the-application)**
7. **[Deploying the Application](#deploying-the-application)**
8. **[Updating the Application](#updating-the-application)**
9. **[Monitoring and Logging](#monitoring-and-logging)**
10. **[Troubleshooting](#troubleshooting)**

---

## **1️⃣ Overview**
This backend processes **startup reports** by:
- Extracting text from **submitted PDFs** via **Google Document AI**.
- Conducting **AI-driven market research** using **OpenAI GPT-4**.
- Formatting **structured business reports** using **CrewAI**.
- **Asynchronously processing reports** using **Celery & Redis**.
- Storing reports in **Google Cloud Storage (GCS)** for retrieval.

---

## **2️⃣ System Architecture**
```
backend/
│── api/
│   ├── report_api.py          # Flask API for report generation & retrieval
│── services/
│   ├── document_processor.py  # Extracts text from PDFs using Google Document AI
│   ├── research_agent.py      # AI-driven research using OpenAI GPT-4
│   ├── section_generator.py   # Formats structured report sections
│   ├── final_report_generator.py # Generates executive summary & recommendations
│   ├── full_pipeline.py       # Orchestrates full report generation
│── tasks/
│   ├── tasks.py               # Celery tasks for background processing
│   ├── celery_config.py       # Celery broker & backend configuration
│── monitoring/
│   ├── flower_dashboard.py    # Celery task monitoring using Flower
│── tests/
│   ├── test_document_processor.py  # Unit tests for document processing
│   ├── test_research_agent.py      # Unit tests for AI research
│   ├── test_section_generator.py   # Unit tests for section formatting
│   ├── test_tasks.py               # Unit tests for Celery background jobs
│── config.py                      # Application configuration settings
│── main.py                         # Entry point for Flask API
│── requirements.txt                 # Dependencies list
│── Dockerfile                       # Docker setup for API deployment
│── .env                              # Environment variables for local development
│── README.md                         # Documentation (this file)
```

---

## **3️⃣ Configuration**
### **🔹 Required Environment Variables (`.env` file)**
Create a `.env` file in the `backend/` directory:
```ini
# Google Cloud Configuration
GCP_PROJECT_ID=your-gcp-project-id
GCS_BUCKET_NAME=your-bucket-name
DOCUMENT_AI_PROCESSOR_ID=your-document-ai-processor-id

# OpenAI API Configuration
OPENAI_API_KEY=your-openai-api-key

# Celery & Redis Configuration
REDIS_URL=redis://localhost:6379/0

# Flask Server
PORT=5000
DEBUG_MODE=True
```

---

## **4️⃣ Setting Up the Environment**
### **🔹 Install Dependencies**
```bash
pip install -r requirements.txt
```

### **🔹 Start Redis**
Celery requires **Redis** as a message broker. Start Redis locally:
```bash
docker run -d -p 6379:6379 redis
```

---

## **5️⃣ Running the Application Locally**
### **🔹 1. Start the Flask API**
```bash
python main.py
```
API will run at: **http://localhost:5000**

### **🔹 2. Start the Celery Worker**
```bash
celery -A tasks.tasks worker --loglevel=info
```

### **🔹 3. Start the Celery Monitoring Dashboard (Flower)**
```bash
python monitoring/flower_dashboard.py
```
Monitor Celery tasks at: **http://localhost:5555**

---

## **6️⃣ Testing the Application**
### **🔹 Run Unit Tests**
```bash
python -m unittest discover tests/
```

### **🔹 Run Individual Tests**
```bash
python -m unittest tests/test_document_processor.py
python -m unittest tests/test_research_agent.py
python -m unittest tests/test_section_generator.py
python -m unittest tests/test_tasks.py
```

---

## **7️⃣ Deploying the Application**
### **🔹 1. Build & Push Docker Image**
```bash
docker build -t ai-report-api .
docker tag ai-report-api:latest gcr.io/YOUR_PROJECT_ID/ai-report-api
docker push gcr.io/YOUR_PROJECT_ID/ai-report-api
```

### **🔹 2. Deploy to Google Cloud Run**
```bash
gcloud run deploy ai-report-api \
    --image gcr.io/YOUR_PROJECT_ID/ai-report-api \
    --platform managed \
    --allow-unauthenticated \
    --region us-central1
```

### **🔹 3. Deploy Celery Worker**
```bash
docker build -t ai-celery-worker -f Dockerfile.celery .
docker run --network="host" ai-celery-worker
```

---

## **8️⃣ Updating the Application**
### **🔹 Pull Latest Code**
```bash
git pull origin main
```

### **🔹 Rebuild & Deploy**
```bash
docker build -t ai-report-api .
docker push gcr.io/YOUR_PROJECT_ID/ai-report-api
gcloud run deploy ai-report-api --image gcr.io/YOUR_PROJECT_ID/ai-report-api
```

---

## **9️⃣ Monitoring and Logging**
### **🔹 View Celery Task Logs**
```bash
celery -A tasks.tasks worker --loglevel=info
```

### **🔹 Check Flask API Logs**
```bash
docker logs -f <container_id>
```

### **🔹 Monitor Background Jobs in Flower**
```bash
python monitoring/flower_dashboard.py
```
Access dashboard at: **http://localhost:5555**

---

## **🔟 Troubleshooting**
| **Issue** | **Solution** |
|-----------|-------------|
| API not starting | Check `.env` file and `PORT` value. |
| Redis error | Ensure Redis is running (`docker ps`). |
| Celery task not executing | Restart Celery worker (`celery -A tasks.tasks worker --loglevel=info`). |
| OpenAI API error | Verify `OPENAI_API_KEY` in `.env`. |
| Google Cloud errors | Ensure valid `GCP_PROJECT_ID` and permissions. |

---

## **🔥 Summary**
This backend provides:
✔ **AI-powered startup report generation**  
✔ **Asynchronous task processing with Celery**  
✔ **Flask API for structured report generation**  
✔ **Google Cloud Storage for storing reports**  
✔ **Redis queue for scalable background jobs**  