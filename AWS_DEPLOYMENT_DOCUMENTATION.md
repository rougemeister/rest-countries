# Rest Countries Angular App - AWS Deployment Documentation

## Project Overview

This documentation covers the complete deployment setup for the **Rest Countries** Angular 18 application using AWS services and GitHub Actions for continuous integration and deployment.

### Technology Stack
- **Frontend**: Angular 18 with SCSS
- **Builder**: @angular-devkit/build-angular:application (Angular 17+ structure)
- **Assets**: Public folder structure
- **Deployment**: AWS S3 + CloudFront
- **CI/CD**: GitHub Actions
- **Region**: EU North 1 (Stockholm)

## Architecture Overview

The deployment architecture follows a modern serverless pattern optimized for static single-page applications:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Developer     │───▶│   GitHub Repo    │───▶│ GitHub Actions  │
│   Push to Main  │    │  rest-countries  │    │   Workflow      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Actions Pipeline                      │
│  1. Checkout Code   4. Build Angular App   7. Deploy to S3     │
│  2. Setup Node.js   5. Verify Build        8. Set Cache Headers│
│  3. Install Deps    6. Configure AWS       9. Invalidate CDN   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Amazon S3     │───▶│   CloudFront     │───▶│   Global Users  │
│ Static Hosting  │    │  Global CDN      │    │   Worldwide     │
│ kruzzstaticbucket│    │ Edge Locations   │    │   Fast Access   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## AWS Services Used

### 1. Amazon S3 (Simple Storage Service)
- **Bucket Name**: `kruzzstaticbucket`
- **Region**: `eu-north-1` (Stockholm)
- **Purpose**: Static website hosting for Angular build files
- **Configuration**: Public read access, website hosting enabled

### 2. Amazon CloudFront
- **Purpose**: Content Delivery Network (CDN)
- **Features**: 
  - Global edge locations for fast content delivery
  - Custom error pages for SPA routing support
  - Cache optimization for different file types
  - HTTPS termination

### 3. AWS IAM (Identity and Access Management)
- **Purpose**: Secure access for GitHub Actions
- **Components**: IAM user with programmatic access
- **Permissions**: S3 bucket access, CloudFront invalidation rights

## Project Structure

```
rest-countries/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD pipeline configuration
├── src/
│   ├── app/                        # Angular application code
│   ├── assets/                     # Static assets (deprecated in Angular 17+)
│   ├── environments/
│   │   ├── environment.ts          # Development configuration
│   │   └── environment.prod.ts     # Production configuration
│   ├── styles.scss                 # Global styles
│   └── main.ts                     # Application bootstrap
├── public/                         # Static files (Angular 17+ structure)
│   ├── favicon.ico
│   └── [other static assets]
├── dist/
│   └── rest-countries/
│       └── browser/                # Build output (Angular 17+ with application builder)
│           ├── index.html
│           ├── main-[hash].js
│           ├── styles-[hash].css
│           └── assets/
├── angular.json                    # Angular workspace configuration
├── package.json                    # NPM dependencies and scripts
└── README.md
```

## Build Configuration

### Angular.json Configuration
```json
{
  "projects": {
    "rest-countries": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/rest-countries",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": ["src/styles.scss"],
            "scripts": []
          }
        }
      }
    }
  }
}
```

### Key Build Features
- **Application Builder**: Uses the modern Angular application builder
- **SCSS Support**: Inline style language set to SCSS
- **Public Folder**: Assets served from the `public` directory
- **Output Structure**: Files built to `dist/rest-countries/browser/`

## GitHub Actions Workflow

### Workflow Triggers
- **Push to main branch**: Automatically triggers deployment
- **Manual trigger**: Can be triggered manually from GitHub Actions tab

### Workflow Steps

#### 1. Environment Setup
```yaml
env:
  NODE_VERSION: '20'
  AWS_REGION: 'eu-north-1'
  ANGULAR_PROJECT_NAME: 'rest-countries'
  S3_BUCKET: 'kruzzstaticbucket'
```

#### 2. Build Process
1. Checkout repository code
2. Setup Node.js environment with npm caching
3. Install dependencies with `npm ci`
4. Build Angular application for production
5. Verify build output structure

#### 3. AWS Deployment
1. Configure AWS credentials
2. Deploy files to S3 with cache headers
3. Set optimized cache policies
4. Invalidate CloudFront distribution

### Cache Strategy

| File Type | Cache Duration | Reason |
|-----------|----------------|--------|
| HTML files | No cache | Instant updates for app shell |
| JS/CSS files | 1 year (31536000s) | Files have content hashes |
| Font files | 1 year (31536000s) | Rarely change |
| Images | 30 days (2592000s) | Balance between performance and updates |
| Other files | 1 day (86400s) | Default safe caching |

## GitHub Secrets Configuration

Required secrets in GitHub repository settings:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | AWS programmatic access key | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | AWS secret access key | `wJalrX...` |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution identifier | `E1234567890ABC` |

## AWS Configuration Requirements

### S3 Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::kruzzstaticbucket/*"
    }
  ]
}
```

### S3 Static Website Configuration
- **Index document**: `index.html`
- **Error document**: `index.html` (for SPA routing)
- **Public access**: Enabled for static website hosting

### CloudFront Configuration
- **Origin**: S3 website endpoint (not REST endpoint)
- **Default root object**: `index.html`
- **Error pages**: 403 and 404 redirect to `/index.html` with 200 status
- **Compression**: Enabled for text files
- **Price class**: Optimized for Europe and North America

### IAM Policy for GitHub Actions
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetBucketLocation",
        "s3:ListBucket",
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:PutObjectAcl"
      ],
      "Resource": [
        "arn:aws:s3:::kruzzstaticbucket",
        "arn:aws:s3:::kruzzstaticbucket/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation",
        "cloudfront:ListInvalidations"
      ],
      "Resource": "*"
    }
  ]
}
```

## Deployment Process

### Automatic Deployment
1. Developer pushes code to `main` branch
2. GitHub Actions workflow triggers automatically
3. Code is checked out and dependencies installed
4. Angular app is built for production
5. Build artifacts are deployed to S3
6. CloudFront cache is invalidated
7. New version is live globally within 5-15 minutes

### Manual Deployment
```bash
# Local build and deploy (requires AWS CLI configured)
npm run build
aws s3 sync dist/rest-countries/browser s3://kruzzstaticbucket --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## Performance Optimizations

### Build Optimizations
- **Tree shaking**: Removes unused code
- **Minification**: Reduces file sizes
- **Code splitting**: Lazy loading for routes
- **Output hashing**: Cache busting for updated files

### CDN Optimizations
- **Global edge locations**: Reduces latency worldwide
- **Gzip compression**: Reduces transfer sizes
- **HTTP/2**: Improved connection efficiency
- **Optimized cache headers**: Reduces origin requests

## Monitoring and Debugging

### GitHub Actions Monitoring
- **Actions tab**: View workflow runs and logs
- **Build artifacts**: Download build outputs if needed
- **Status checks**: Integration with GitHub status checks

### AWS CloudWatch Integration
- **S3 access logs**: Track file access patterns
- **CloudFront logs**: Monitor CDN performance
- **Cost monitoring**: Track AWS usage and costs

## Troubleshooting Guide

### Common Issues

#### Build Failures
- **Symptom**: `index.html not found in build output`
- **Solution**: Check Angular application builder output structure
- **Debug**: Run `npm run build` locally and examine `dist/` folder

#### Deployment Failures
- **Symptom**: AWS access denied errors
- **Solution**: Verify IAM permissions and GitHub secrets
- **Debug**: Check IAM policy allows S3 and CloudFront operations

#### SPA Routing Issues
- **Symptom**: 404 errors on direct URL access
- **Solution**: Ensure CloudFront error pages redirect to `index.html`
- **Debug**: Test direct navigation to application routes

#### Cache Issues
- **Symptom**: Old version still showing after deployment
- **Solution**: Wait for CloudFront invalidation to complete (5-15 minutes)
- **Debug**: Check CloudFront invalidation status in AWS console

## Security Considerations

### Access Control
- **IAM principle of least privilege**: GitHub Actions user has minimal required permissions
- **Secrets management**: Sensitive data stored in GitHub encrypted secrets
- **Public read-only access**: S3 bucket allows only read operations for public

### Content Security
- **HTTPS enforcement**: CloudFront provides SSL termination
- **Origin access**: Direct S3 access can be restricted (optional)
- **Security headers**: Can be added via CloudFront functions

## Cost Optimization

### S3 Costs
- **Storage**: Pay only for actual file storage
- **Requests**: Minimal cost for PUT/GET operations
- **Data transfer**: Reduced by CloudFront caching

### CloudFront Costs
- **Data transfer**: Pay per GB of data served
- **Requests**: Pay per request served
- **Invalidations**: First 1000 paths per month are free

### Estimated Monthly Costs (Small App)
- **S3 Storage**: $0.50 - $2.00
- **CloudFront**: $1.00 - $5.00
- **Total**: Under $10/month for typical small applications

## Best Practices

### Development
1. **Test builds locally** before pushing to main
2. **Use environment files** for different configurations
3. **Optimize bundle size** with lazy loading and tree shaking
4. **Version control secrets** (use GitHub secrets, not code)

### Deployment
1. **Monitor build times** and optimize if necessary
2. **Use semantic versioning** for releases
3. **Test deployed application** after each deployment
4. **Keep AWS resources in same region** when possible

### Maintenance
1. **Regular dependency updates** for security
2. **Monitor AWS costs** monthly
3. **Review CloudFront cache performance** periodically
4. **Update documentation** when making changes

## GitHub Actions Workflow File

Here's the complete `.github/workflows/deploy.yml` file for your project:


name: Deploy Angular App to AWS S3 + CloudFront

on:
  push:
    branches: [ main ]

env:
  NODE_VERSION: '20'
  AWS_REGION: 'eu-north-1'
  ANGULAR_PROJECT_NAME: 'rest-countries'
  S3_BUCKET: 'kruzzstaticbucket'

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ env.NODE_VERSION }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Cache Node.js dependencies
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Install dependencies
        run: npm ci

      - name: Build Angular project
        run: npm run build -- --configuration production

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Deploy to S3
        run: |
          aws s3 sync dist/${{ env.ANGULAR_PROJECT_NAME }}/browser s3://${{ env.S3_BUCKET }} --delete

      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.DISTRIBUTION_ID }} \
            --paths "/*"

## Support and Resources

### Documentation Links
- [Angular Deployment Guide](https://angular.io/guide/deployment)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/s3/latest/userguide/WebsiteHosting.html)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Useful Commands
```bash
# Build and test locally
npm run build
npx http-server dist/rest-countries/browser -p 8080

# AWS CLI commands
aws s3 ls s3://kruzzstaticbucket
aws cloudfront list-distributions
aws cloudfront get-invalidation --distribution-id ID --id INVALIDATION_ID

# Check build output
find dist/ -name "*.html" -o -name "*.js" -o -name "*.css" | head -10
```

---

**Note**: This documentation should be kept updated as the project evolves and new features are added to the deployment pipeline.

## File Location

Save this file as `DEPLOYMENT_GUIDE.md` in your project root directory for easy reference by your team.