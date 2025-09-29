# Development Setup Guide

## Quick Start for Development

### 1. Setup Environment Variables
```bash
# Copy example env file
cp .env.example .env

# Edit .env file with your actual values:
# - Add your MongoDB connection string
# - Add your OpenAI API key
```

### 2. Option A: Run with Docker (Recommended)
```bash
# Make sure Docker Desktop is running
docker-compose up -d

# Access the applications:
# Frontend: http://localhost:3000
# Backend: http://localhost:5001
```

### 3. Option B: Run Natively
```bash
# Terminal 1: Start Backend
cd backend
npm install
npm run dev

# Terminal 2: Start Frontend  
cd frontend
npm install
npm run dev
```

### 4. Option C: MongoDB with Docker, Apps Natively
```bash
# Start only MongoDB
docker-compose up -d mongo

# Then run apps natively as in Option B
```

## Current CI/CD Status ✅

Your pipeline is working perfectly:
- ✅ **Automated Testing**: TypeScript + ESLint checks
- ✅ **Docker Build**: Backend and Frontend images
- ✅ **Container Registry**: Images pushed to Azure ACR
- ⏳ **Deployment**: Ready when Azure setup is complete

## Next Steps

1. **Continue Development**: Use the setup above to keep coding
2. **When Ready for Production**: Follow `AZURE_SETUP_REQUIREMENTS.md`
3. **Deployment**: Uncomment deployment steps in `.github/workflows/azure-deploy.yml`

## Tips

- Each push to `production` branch triggers the CI/CD pipeline
- Images are automatically built and stored in Azure Container Registry
- You can focus on features while infrastructure is prepared separately