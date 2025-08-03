# Netlify Deployment Guide

## Prerequisites
1. Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket)
2. Have a Netlify account

## Deployment Steps

### 1. Update Backend URL
Before deploying, update the production API URL in `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-actual-backend-url.com/api'  // Replace with your actual backend URL
};
```

### 2. Deploy to Netlify

#### Option A: Deploy via Netlify UI
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Connect your Git provider and select your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/admin-panel/browser`
5. Click "Deploy site"

#### Option B: Deploy via Netlify CLI
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Login: `netlify login`
3. Deploy: `netlify deploy --prod`

### 3. Environment Variables (Optional)
If you need to set environment variables:
1. Go to your site settings in Netlify
2. Navigate to "Environment variables"
3. Add any required environment variables

### 4. Custom Domain (Optional)
1. Go to your site settings in Netlify
2. Navigate to "Domain management"
3. Add your custom domain

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all dependencies are in `package.json`
2. **404 errors on routes**: The `_redirects` file should handle this
3. **API calls fail**: Ensure your backend URL is correct in `environment.prod.ts`
4. **CORS issues**: Configure your backend to allow requests from your Netlify domain

### Build Commands
- Development: `npm run build`
- Production: `npm run build --configuration=production`

## File Structure for Deployment
```
├── netlify.toml          # Netlify configuration
├── public/
│   └── _redirects        # Redirect rules for SPA
├── src/
│   ├── environments/
│   │   ├── environment.ts        # Development config
│   │   └── environment.prod.ts   # Production config
│   └── app/
│       └── core/
│           └── api.config.ts     # API configuration
└── angular.json          # Angular build configuration
```

## Notes
- The `netlify.toml` file configures the build process and redirects
- The `_redirects` file ensures Angular routing works correctly
- Environment files handle different API URLs for dev/prod
- Make sure your backend is deployed and accessible before deploying the frontend 