# VCConnect AWS Deployment Guide

## Infrastructure Overview

### Required AWS Services
1. **Compute & Hosting**
   - Amazon ECS (Elastic Container Service)
     - Container orchestration for application services
     - Auto-scaling configuration
     - Load balancing integration
   - AWS Fargate
     - Serverless compute for containers
     - Resource allocation management
   
2. **Database & Storage**
   - Amazon RDS (PostgreSQL)
     - High-availability configuration
     - Automated backups
     - Read replicas setup
   - Amazon S3
     - Pitch deck storage
     - Static asset hosting
     - Backup storage
   
3. **Authentication & Security**
   - Amazon Cognito
     - User pools configuration
     - Identity pools setup
     - OAuth/Social integration
   - AWS WAF
     - Web application firewall rules
     - DDoS protection
     - IP-based access control

4. **AI & Machine Learning**
   - Amazon SageMaker
     - Model deployment
     - Inference endpoint configuration
     - Auto-scaling settings
   - Amazon Comprehend
     - Natural language processing
     - Entity recognition
     - Sentiment analysis

5. **Monitoring & Logging**
   - Amazon CloudWatch
     - Metrics collection
     - Log aggregation
     - Alarm configuration
   - AWS X-Ray
     - Distributed tracing
     - Performance monitoring
     - Service map visualization

## Migration Steps

### 1. Database Migration
```bash
# Export existing Supabase database
pg_dump -h <supabase-host> -U postgres -d postgres > backup.sql

# Import to RDS
psql -h <rds-endpoint> -U <master-username> -d postgres < backup.sql

# Verify data integrity
psql -h <rds-endpoint> -U <master-username> -d postgres -c "SELECT COUNT(*) FROM profiles;"
```

### 2. Storage Migration
```bash
# Sync Supabase storage to S3
aws s3 sync ./local-backup s3://vcconnect-production/pitch-files

# Update storage permissions
aws s3api put-bucket-policy --bucket vcconnect-production --policy file://bucket-policy.json
```

### 3. Authentication Setup
1. Create Cognito User Pool
   ```bash
   aws cognito-idp create-user-pool \
     --pool-name vcconnect-production \
     --policies '{"PasswordPolicy":{"MinimumLength":8}}' \
     --schema '[{"Name":"email","Required":true}]'
   ```

2. Configure App Client
   ```bash
   aws cognito-idp create-user-pool-client \
     --user-pool-id <user-pool-id> \
     --client-name vcconnect-web \
     --no-generate-secret
   ```

### 4. Container Setup
1. Create ECR Repository
   ```bash
   aws ecr create-repository \
     --repository-name vcconnect \
     --image-scanning-configuration scanOnPush=true
   ```

2. Build and Push Docker Image
   ```bash
   docker build -t vcconnect .
   aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin
   docker tag vcconnect:latest <account-id>.dkr.ecr.<region>.amazonaws.com/vcconnect:latest
   docker push <account-id>.dkr.ecr.<region>.amazonaws.com/vcconnect:latest
   ```

### 5. ECS Configuration
1. Create ECS Cluster
   ```bash
   aws ecs create-cluster \
     --cluster-name vcconnect-production \
     --capacity-providers FARGATE
   ```

2. Create Task Definition
   ```bash
   aws ecs register-task-definition \
     --family vcconnect \
     --requires-compatibilities FARGATE \
     --network-mode awsvpc \
     --cpu 256 \
     --memory 512 \
     --container-definitions file://container-definitions.json
   ```

### 6. Load Balancer Setup
1. Create Application Load Balancer
   ```bash
   aws elbv2 create-load-balancer \
     --name vcconnect-alb \
     --subnets <subnet-1> <subnet-2> \
     --security-groups <security-group-id>
   ```

2. Create Target Group
   ```bash
   aws elbv2 create-target-group \
     --name vcconnect-targets \
     --protocol HTTP \
     --port 80 \
     --vpc-id <vpc-id> \
     --target-type ip
   ```

### 7. DNS & SSL Setup
1. Create Route 53 Records
   ```bash
   aws route53 change-resource-record-sets \
     --hosted-zone-id <zone-id> \
     --change-batch file://dns-changes.json
   ```

2. Request Certificate
   ```bash
   aws acm request-certificate \
     --domain-name api.vcconnect.com \
     --validation-method DNS
   ```

## Environment Configuration

### Required Environment Variables
```plaintext
# AWS Configuration
AWS_REGION=<region>
AWS_ACCESS_KEY_ID=<access-key>
AWS_SECRET_ACCESS_KEY=<secret-key>

# Database
DATABASE_URL=postgresql://<username>:<password>@<rds-endpoint>:5432/postgres

# Storage
S3_BUCKET=vcconnect-production
S3_REGION=<region>

# Authentication
COGNITO_USER_POOL_ID=<user-pool-id>
COGNITO_CLIENT_ID=<client-id>

# External Services
OPENAI_API_KEY=<openai-key>
STRIPE_SECRET_KEY=<stripe-key>
```

## Monitoring Setup

### CloudWatch Dashboards
1. Create Dashboard
   ```bash
   aws cloudwatch put-dashboard \
     --dashboard-name VCConnect \
     --dashboard-body file://dashboard.json
   ```

2. Configure Alarms
   ```bash
   aws cloudwatch put-metric-alarm \
     --alarm-name api-latency \
     --metric-name Latency \
     --namespace AWS/ApiGateway \
     --statistic Average \
     --period 300 \
     --threshold 1000 \
     --comparison-operator GreaterThanThreshold
   ```

## Backup & Recovery

### Automated Backup Configuration
1. RDS Snapshots
   ```bash
   aws rds create-db-snapshot \
     --db-instance-identifier vcconnect \
     --db-snapshot-identifier manual-snapshot-1
   ```

2. S3 Versioning
   ```bash
   aws s3api put-bucket-versioning \
     --bucket vcconnect-production \
     --versioning-configuration Status=Enabled
   ```

## Security Configuration

### WAF Rules Setup
```bash
aws wafv2 create-web-acl \
  --name vcconnect-waf \
  --scope REGIONAL \
  --default-action Block={} \
  --rules file://waf-rules.json
```

## Performance Optimization

### CloudFront Distribution
```bash
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json
```

## Deployment Verification

### Health Check Script
```bash
#!/bin/bash
# Verify all services are running
aws ecs describe-services \
  --cluster vcconnect-production \
  --services vcconnect-service

# Check RDS connection
psql -h <rds-endpoint> -U <username> -c "SELECT 1;"

# Verify S3 access
aws s3 ls s3://vcconnect-production

# Test Cognito configuration
aws cognito-idp describe-user-pool \
  --user-pool-id <user-pool-id>
```

## Rollback Procedures

### Emergency Rollback Steps
1. Revert to Previous ECS Task Definition
   ```bash
   aws ecs update-service \
     --cluster vcconnect-production \
     --service vcconnect-service \
     --task-definition vcconnect:<previous-version>
   ```

2. Database Rollback
   ```bash
   aws rds restore-db-instance-from-db-snapshot \
     --db-instance-identifier vcconnect \
     --db-snapshot-identifier <snapshot-id>
   ```

## Cost Optimization

### Resource Tagging
```bash
aws resourcegroupstaggingapi tag-resources \
  --resource-arn-list <resource-arns> \
  --tags Environment=Production,Project=VCConnect
```

## Maintenance Procedures

### Regular Maintenance Tasks
1. Database Optimization
   ```bash
   # Update statistics
   ANALYZE VERBOSE;
   
   # Vacuum database
   VACUUM ANALYZE;
   ```

2. Log Rotation
   ```bash
   aws logs put-retention-policy \
     --log-group-name /aws/ecs/vcconnect \
     --retention-in-days 30
   ```

## Compliance & Auditing

### Audit Configuration
```bash
# Enable CloudTrail
aws cloudtrail create-trail \
  --name vcconnect-audit \
  --s3-bucket-name vcconnect-audit-logs
```

## Documentation Requirements

### API Documentation
- OpenAPI specifications location: `docs/api/openapi.yaml`
- Integration guides: `docs/integration/`
- Authentication flows: `docs/auth/`

### System Documentation
- Architecture diagrams: `docs/architecture/`
- Deployment guides: `docs/deployment/`
- Troubleshooting guides: `docs/troubleshooting/`

## Contact Information

### Support Escalation
1. Development Team: dev@vcconnect.com
2. DevOps Team: devops@vcconnect.com
3. Security Team: security@vcconnect.com

## Version History

### Deployment Versions
- v1.0.0: Initial AWS deployment
- v1.1.0: Added WAF configuration
- v1.2.0: Implemented CloudFront CDN