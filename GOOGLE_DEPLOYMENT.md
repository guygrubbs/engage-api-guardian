# VCConnect Google Cloud Platform Deployment Guide

## Overview

This guide details how to migrate VCConnect from Supabase to Google Cloud Platform (GCP) services while maintaining OpenAI integration.

## Service Migration Map

### Database Migration (from Supabase PostgreSQL)
1. Cloud SQL for PostgreSQL
   - Create a new Cloud SQL instance
   - Configure high availability
   - Set up automated backups
   - Implement connection pooling
   ```bash
   # Export Supabase database
   pg_dump -h your-supabase-host -U postgres -d your-db > backup.sql
   
   # Import to Cloud SQL
   gcloud sql import sql your-instance-name gs://bucket/backup.sql
   ```

### Authentication (from Supabase Auth)
1. Firebase Authentication
   - Enable email/password authentication
   - Configure OAuth providers
   - Set up custom claims for user roles
   - Implement security rules

### File Storage (from Supabase Storage)
1. Google Cloud Storage
   - Create storage buckets for pitch files
   - Configure CORS policies
   - Set up lifecycle management
   - Implement signed URLs

### Edge Functions (from Supabase Edge Functions)
1. Cloud Functions
   - Migrate report generation logic
   - Set up OpenAI integration
   - Configure environment variables
   - Implement error handling

## Required GCP Services

### Core Services
1. Cloud SQL
   - Instance type: db-custom-4-8192
   - Storage: 100GB SSD
   - High availability configuration
   - Private IP configuration

2. Cloud Storage
   - Multi-regional storage
   - Object lifecycle management
   - Versioning enabled
   - Object-level permissions

3. Cloud Functions
   - Memory: 1GB
   - Timeout: 120s
   - Runtime: Node.js 18
   - VPC connector configuration

4. Firebase
   - Authentication
   - Cloud Firestore (optional)
   - Hosting
   - Security Rules

### Supporting Services
1. Cloud Load Balancing
   - Global load balancer
   - SSL certificate management
   - Custom domain mapping

2. Cloud CDN
   - Content caching
   - Edge locations
   - Cache invalidation

3. Cloud Monitoring
   - Uptime checks
   - Alert policies
   - Dashboard creation

4. Cloud Logging
   - Log routing
   - Log-based metrics
   - Error reporting

## Security Configuration

### Identity and Access Management (IAM)
1. Service Accounts
   - Create dedicated service accounts
   - Configure least privilege access
   - Manage key rotation

2. Security Rules
   - Firebase Authentication rules
   - Storage bucket policies
   - Cloud SQL access control

### Network Security
1. VPC Configuration
   - Private IP addressing
   - Firewall rules
   - VPC peering

2. Cloud Armor
   - DDoS protection
   - WAF rules
   - IP allowlisting

## OpenAI Integration

### API Configuration
1. Environment Setup
   ```bash
   # Set OpenAI API key in Cloud Functions
   gcloud functions deploy generate-report \
     --set-env-vars OPENAI_API_KEY=your-key
   ```

2. Error Handling
   - Implement retry logic
   - Rate limit handling
   - Fallback mechanisms

### Secret Management
1. Secret Manager
   - Store API keys
   - Manage access control
   - Configure automatic rotation

## Deployment Steps

### 1. Initial Setup
```bash
# Install Google Cloud SDK
curl https://sdk.cloud.google.com | bash

# Initialize project
gcloud init

# Set project ID
gcloud config set project your-project-id
```

### 2. Database Migration
```bash
# Create Cloud SQL instance
gcloud sql instances create vcconnect-db \
  --database-version=POSTGRES_14 \
  --cpu=2 \
  --memory=4GB \
  --region=us-central1

# Create database
gcloud sql databases create vcconnect \
  --instance=vcconnect-db
```

### 3. Storage Setup
```bash
# Create storage bucket
gsutil mb -l us-central1 gs://vcconnect-files

# Configure CORS
gsutil cors set cors-config.json gs://vcconnect-files
```

### 4. Function Deployment
```bash
# Deploy report generation function
gcloud functions deploy generate-report \
  --runtime nodejs18 \
  --trigger-http \
  --allow-unauthenticated
```

## Frontend Updates

### 1. Authentication
```typescript
// Update authentication imports
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
```

### 2. Storage
```typescript
// Update storage imports
import { getStorage, ref, uploadBytes } from 'firebase/storage';

// Initialize Storage
const storage = getStorage(app);
```

### 3. API Calls
```typescript
// Update API endpoints
const API_BASE_URL = 'https://your-cloud-function-url';
```

## Monitoring Setup

### 1. Uptime Checks
```bash
# Create uptime check
gcloud monitoring uptime-checks create http \
  --display-name="Frontend Check" \
  --uri="https://your-domain.com"
```

### 2. Alert Policies
```bash
# Create alert policy
gcloud alpha monitoring policies create \
  --display-name="High Error Rate" \
  --condition-filter="metric.type=\"logging.googleapis.com/user/error_count\""
```

## Cost Optimization

### 1. Resource Planning
- Right-size Cloud SQL instances
- Implement caching strategies
- Use preemptible instances where possible

### 2. Budget Alerts
```bash
# Set budget alert
gcloud billing budgets create \
  --billing-account=your-billing-account \
  --display-name="Monthly Budget" \
  --budget-amount=1000USD
```

## Testing Procedures

### 1. Load Testing
```bash
# Install Artillery
npm install -g artillery

# Run load test
artillery run load-test.yml
```

### 2. Integration Testing
```bash
# Run integration tests
npm run test:integration
```

## Rollback Procedures

### 1. Database Rollback
```bash
# Restore from backup
gcloud sql backups restore your-backup-id \
  --instance=vcconnect-db
```

### 2. Function Rollback
```bash
# Revert to previous version
gcloud functions rollback generate-report
```

## Maintenance Procedures

### 1. Regular Updates
- Schedule maintenance windows
- Update dependencies
- Rotate credentials

### 2. Backup Verification
- Test backup restoration
- Verify data integrity
- Document recovery time

## Troubleshooting Guide

### Common Issues
1. Database Connection
   - Check VPC configuration
   - Verify credentials
   - Check firewall rules

2. Authentication
   - Verify Firebase configuration
   - Check OAuth settings
   - Review security rules

3. Storage
   - Check bucket permissions
   - Verify CORS configuration
   - Review lifecycle policies

## Contact Information

### Support Channels
- GCP Support: cloud.google.com/support
- OpenAI Support: help.openai.com
- Internal DevOps: devops@your-company.com