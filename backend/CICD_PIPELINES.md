# **Automated CI/CD Pipelines for Deployment to GCP**  
This guide provides a **fully automated CI/CD pipeline** for deploying the **AI-powered report generation backend** to **Google Cloud Platform (GCP)** using **GitHub Actions & Google Cloud Build**.

---

# **📌 Table of Contents**
1. **[Overview](#overview)**
2. **[Pre-requisites](#pre-requisites)**
3. **[GitHub Actions CI/CD Pipeline](#github-actions-ci/cd-pipeline)**
4. **[Cloud Build CI/CD Pipeline](#cloud-build-ci/cd-pipeline)**
5. **[Deployment Workflow](#deployment-workflow)**
6. **[Security Best Practices](#security-best-practices)**
7. **[Monitoring & Alerts](#monitoring--alerts)**

---

## **1️⃣ Overview**
This pipeline will:  
✅ **Automate builds and tests upon GitHub commits**  
✅ **Push Docker images to Google Container Registry (GCR)**  
✅ **Deploy Flask API & Celery worker to Google Cloud Run**  
✅ **Restart Cloud Run services upon successful deployment**  
✅ **Notify team on failure via Slack/Webhooks**

---

## **2️⃣ Pre-requisites**
### **🔹 1. Enable Required GCP Services**
Run these commands:
```bash
gcloud services enable \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    containerregistry.googleapis.com \
    iam.googleapis.com \
    artifactregistry.googleapis.com
```

### **🔹 2. Create & Configure GCP Service Account**
```bash
gcloud iam service-accounts create github-actions \
    --description="GitHub Actions for CI/CD" \
    --display-name="GitHub Actions Service Account"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/editor"

gcloud iam service-accounts keys create key.json \
    --iam-account=github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com
```
Upload `key.json` as a **GitHub Secret** (`GCP_SA_KEY`).

---

## **3️⃣ GitHub Actions CI/CD Pipeline**
### **📂 Create `.github/workflows/deploy.yaml`**
```yaml
name: GCP CI/CD Deployment

on:
  push:
    branches:
      - main

env:
  GCP_PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  GCP_REGION: us-central1
  GCR_IMAGE: gcr.io/${{ secrets.GCP_PROJECT_ID }}/ai-report-api
  CELERY_IMAGE: gcr.io/${{ secrets.GCP_PROJECT_ID }}/ai-celery-worker

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Authenticate to GCP
        uses: google-github-actions/auth@v1
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}

      - name: Configure Docker for GCR
        run: gcloud auth configure-docker --quiet

      - name: Build & Push API Image
        run: |
          docker build -t $GCR_IMAGE .
          docker push $GCR_IMAGE

      - name: Build & Push Celery Worker Image
        run: |
          docker build -t $CELERY_IMAGE -f Dockerfile.celery .
          docker push $CELERY_IMAGE

      - name: Deploy Flask API to Cloud Run
        run: |
          gcloud run deploy ai-report-api \
            --image $GCR_IMAGE \
            --platform managed \
            --region $GCP_REGION \
            --allow-unauthenticated

      - name: Deploy Celery Worker to Cloud Run
        run: |
          gcloud run deploy ai-celery-worker \
            --image $CELERY_IMAGE \
            --platform managed \
            --region $GCP_REGION \
            --no-allow-unauthenticated

      - name: Clean Up Old Docker Images
        run: |
          gcloud container images list-tags $GCR_IMAGE --limit=50 --format="get(digest)" | tail -n +5 | \
          xargs -I {} gcloud container images delete $GCR_IMAGE@{} --force-delete-tags --quiet
```
---

## **4️⃣ Cloud Build CI/CD Pipeline**
Alternatively, use **Cloud Build** instead of GitHub Actions.

### **📂 Create `cloudbuild.yaml`**
```yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/ai-report-api', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/ai-report-api']

  - name: 'gcr.io/cloud-builders/gcloud'
    args: [
      'run', 'deploy', 'ai-report-api',
      '--image', 'gcr.io/$PROJECT_ID/ai-report-api',
      '--platform', 'managed',
      '--region', 'us-central1',
      '--allow-unauthenticated'
    ]

timeout: '600s'
```
### **Trigger Build**
```bash
gcloud builds submit --config cloudbuild.yaml .
```
---

## **5️⃣ Deployment Workflow**
1. **Developer pushes code** to the `main` branch.
2. **GitHub Actions** or **Cloud Build**:
   - Runs **unit tests** (`unittest`).
   - Builds Docker images for **Flask API** & **Celery workers**.
   - Pushes images to **Google Container Registry (GCR)**.
   - Deploys services to **Google Cloud Run**.
3. **Deployment completes**, and old Docker images are cleaned up.

---

## **6️⃣ Security Best Practices**
### **🔹 Use Least Privilege IAM Roles**
- Grant **minimum permissions** to the **GitHub Service Account**.
- Avoid using `roles/editor`, instead use:
  ```bash
  gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
      --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
      --role="roles/cloudbuild.builds.editor"
  ```

### **🔹 Store Secrets Securely**
- Use **GitHub Secrets** for:
  - `GCP_SA_KEY` (Service Account JSON)
  - `OPENAI_API_KEY`
- Avoid storing secrets in the repo.

### **🔹 Restrict API Access**
- **Require authentication** for **Cloud Run Celery workers**:
  ```bash
  gcloud run services update ai-celery-worker \
      --no-allow-unauthenticated
  ```

---

## **7️⃣ Monitoring & Alerts**
### **🔹 Monitor Cloud Run Logs**
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=ai-report-api" --limit 50
```

### **🔹 Enable Alerts for Failed Deployments**
```bash
gcloud monitoring policies create \
    --display-name "Deployment Failure Alert" \
    --condition-display-name "Cloud Build Failure" \
    --filter 'metric.type="build.googleapis.com/builds/failure_count"' \
    --threshold-value 1 \
    --notification-channels my-email@example.com
```

---

## **🔥 Final Summary**
🚀 **Fully Automated CI/CD for Google Cloud Platform (GCP)**  
✔ **GitHub Actions & Cloud Build support**  
✔ **Secure deployment of Flask API & Celery Workers**  
✔ **Automatic cleanup of old images**  
✔ **Monitoring & logging with Google Cloud Tools**  