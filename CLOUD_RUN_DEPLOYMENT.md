# Cloud Run Deployment

This repository includes automated deployment to Google Cloud Run via GitHub Actions.

## Setup

Before the automated deployment can work, you need to run the `deploy-to-gcp.ps1` script (to be created) to set up the required repository secrets:

### Required Secrets

The following secrets must be configured in your GitHub repository settings:

- `GCP_SA_KEY` - Service account JSON key with permissions for Cloud Build and Cloud Run
- `GCP_PROJECT` - Your Google Cloud Project ID  
- `CLOUD_RUN_SERVICE_NAME` - Name for your Cloud Run service
- `CLOUD_RUN_REGION` - GCP region for deployment (e.g., us-central1)
- `GCP_SECRET_NAME` - Name of the Secret Manager secret containing the proxy API key
- `PROXY_API_KEY` (optional) - API key that will be stored in Secret Manager

### Service Account Permissions

The service account used for deployment needs the following IAM roles:
- Cloud Build Editor
- Cloud Run Admin  
- Service Account User
- Secret Manager Secret Accessor

## Deployment Process

The workflow triggers automatically on every push to the `main` branch and:

1. Builds the React application using `npm run build`
2. Creates a Docker container with nginx serving the static files
3. Pushes the container to Google Container Registry using Cloud Build
4. Deploys the container to Cloud Run with Secret Manager integration
5. Outputs the deployed service URL

## Customization

The workflow is designed to be easily customizable:

- **Build Strategy**: Currently uses Cloud Build, but can be modified to use other strategies like Artifact Registry, kaniko, etc.
- **Container Configuration**: Modify `Dockerfile` and `nginx.conf` for different serving needs
- **Cloud Run Settings**: Adjust memory, CPU, scaling settings in the workflow
- **Secrets**: Add more secrets by modifying the `--set-secrets` parameter

## Files

- `.github/workflows/deploy-cloud-run.yml` - Main deployment workflow
- `Dockerfile` - Container definition for serving the React app
- `nginx.conf` - Nginx configuration optimized for SPAs and Cloud Run