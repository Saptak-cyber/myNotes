# Deployment Guide: Frontend (Vercel) + Backend (Render)

This guide will help you deploy your Notes application with the frontend on Vercel and backend on Render.

## Prerequisites

- GitHub account
- Vercel account (free)
- Render account (free)
- MongoDB Atlas database (or another MongoDB hosting service)
- Upstash Redis account (optional, for rate limiting)

## Step 1: Prepare Your Repository

1. Make sure all your code is committed and pushed to GitHub
2. Ensure your project structure matches:
   ```
   /backend (Express.js API)
   /frontend (React + Vite app)
   ```

## Step 2: Deploy Backend to Render

### 2.1: Create Render Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `your-notes-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2.2: Set Environment Variables

In Render dashboard, go to Environment and add these variables:

| Key | Value | Description |
|-----|-------|-------------|
| `NODE_ENV` | `production` | Sets production mode |
| `MONGO_URL` | `mongodb+srv://...` | Your MongoDB connection string |
| `FRONTEND_URL` | `https://your-app.vercel.app` | Your Vercel domain (add after frontend deployment) |
| `UPSTASH_REDIS_REST_URL` | `your-redis-url` | (Optional) Upstash Redis URL |
| `UPSTASH_REDIS_REST_TOKEN` | `your-redis-token` | (Optional) Upstash Redis token |

### 2.3: Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your backend URL: `https://your-app-name.onrender.com`

## Step 3: Deploy Frontend to Vercel

### 3.1: Update Configuration

1. In your `frontend/vercel.json`, replace `your-backend-domain.onrender.com` with your actual Render domain
2. In your `frontend/src/lib/axios.js`, replace `your-backend-domain.onrender.com` with your actual Render domain

### 3.2: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.3: Set Environment Variables

In Vercel dashboard, go to Settings > Environment Variables and add:

| Key | Value | Environment |
|-----|-------|-------------|
| `VITE_API_BASE_URL` | `https://your-backend.onrender.com/api` | Production |

### 3.4: Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Note your frontend URL: `https://your-app.vercel.app`

## Step 4: Update CORS Configuration

1. Go back to Render dashboard
2. Update the `FRONTEND_URL` environment variable with your actual Vercel domain
3. In your backend code, update the CORS configuration:
   ```javascript
   // In backend/index.js, replace this line:
   "https://your-frontend-domain.vercel.app"
   // With your actual Vercel domain:
   "https://your-actual-app.vercel.app"
   ```
4. Redeploy your backend service

## Step 5: Test Your Deployment

1. Visit your Vercel frontend URL
2. Test all functionality:
   - Creating notes
   - Reading notes
   - Updating notes
   - Deleting notes
   - Rate limiting (if implemented)

## Troubleshooting

### Common Issues

1. **CORS Errors**: 
   - Ensure `FRONTEND_URL` is set correctly in Render
   - Check that your Vercel domain is added to the CORS allowedOrigins

2. **API Not Found (404)**:
   - Verify your backend URL in `frontend/src/lib/axios.js`
   - Check that `/api/notes` endpoint is working on Render

3. **Database Connection Issues**:
   - Verify `MONGO_URL` in Render environment variables
   - Ensure your MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

4. **Build Failures**:
   - Check build logs in both Vercel and Render
   - Ensure all dependencies are in package.json

### Logs and Debugging

- **Render Logs**: Dashboard > Your Service > Logs
- **Vercel Logs**: Dashboard > Your Project > Functions tab
- **Browser Console**: Check for network errors and API responses

## Environment URLs

After deployment, you'll have:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.onrender.com`
- **API Endpoint**: `https://your-app.onrender.com/api/notes`

## Automatic Deployments

Both Vercel and Render will automatically redeploy when you push to your main branch on GitHub.

---

🎉 Your application is now live! Share your Vercel URL with users to access your notes app.
