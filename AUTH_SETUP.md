# Google Authentication with Supabase Setup Guide

This guide will help you set up Google authentication using Supabase for your ThinkBoard application.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A Google Cloud Console project with OAuth configured
3. Your MongoDB database connection string

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details:
   - Project name: `thinkboard` (or your preferred name)
   - Organization: Select your organization
   - Database password: Create a strong password
   - Region: Choose the closest region to your users
4. Click "Create new project"
5. Wait for the project to be created (this may take a few minutes)

## Step 2: Get Your Supabase Credentials

Once your project is ready:

1. Go to Settings → API
2. Copy the following values:
   - **Project URL** (something like `https://your-project-ref.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
   - **Service role key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Set Application type to "Web application"
   - Add authorized redirect URIs:
     - `https://your-project-ref.supabase.co/auth/v1/callback` (replace with your actual Supabase URL)
   - Save the Client ID and Client Secret

## Step 4: Configure Supabase Authentication

1. In your Supabase dashboard, go to Authentication → Providers
2. Find "Google" and enable it
3. Enter your Google OAuth credentials:
   - **Client ID**: Your Google OAuth Client ID
   - **Client Secret**: Your Google OAuth Client Secret
4. Save the configuration

## Step 5: Set Up Environment Variables

### Frontend (.env)
Create a `.env` file in the `frontend` directory:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key_here
```

### Backend (.env)
Create a `.env` file in the `backend` directory:

```env
# MongoDB Configuration
MONGO_URL=your_mongodb_connection_string

# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Server Configuration
PORT=5001
NODE_ENV=development
```

## Step 6: Start Your Application

1. Install dependencies (if not already done):
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

2. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

3. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

## Step 7: Test Authentication

1. Open your browser and go to `http://localhost:5173`
2. You should see a welcome screen with a "Sign in with Google" button
3. Click the button and sign in with your Google account
4. You should be redirected back to the app and be able to create notes

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI"**: Make sure you've added the correct Supabase callback URL to your Google OAuth configuration

2. **"Missing environment variables"**: Double-check that all environment variables are set correctly in both frontend and backend

3. **Authentication not working**: Verify that:
   - Google OAuth is enabled in Supabase
   - Client ID and Secret are correct
   - Redirect URI matches exactly

4. **Notes not loading**: Check that:
   - Backend server is running
   - MongoDB connection is working
   - Supabase service role key is correct

### Getting Help:

- Check the browser console for error messages
- Check the backend server logs
- Verify your Supabase project settings
- Make sure all environment variables are properly set

## Security Notes

- Never commit your `.env` files to version control
- Use the service role key only on the backend, never in frontend code
- The anon key is safe to use in frontend code as it has limited permissions
- Regularly rotate your API keys for security

## What Was Changed

The authentication system includes:

1. **Frontend changes:**
   - Added Supabase client configuration
   - Created authentication context for managing user state
   - Added login/logout components
   - Protected routes that require authentication
   - Updated navbar to show user info and auth buttons

2. **Backend changes:**
   - Added Supabase authentication middleware
   - Updated Note model to include user association
   - Modified all note operations to be user-specific
   - Added token verification for API requests

3. **Security:**
   - All notes are now private to each user
   - API endpoints require authentication
   - JWT tokens are verified on each request
   - User data is properly isolated

Your notes app now has secure Google authentication with user-specific data!
