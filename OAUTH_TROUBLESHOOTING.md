# Google OAuth Troubleshooting Guide

## Current Error: redirect_uri_mismatch

**Your Supabase callback URL**: `https://pyoouvmcamkyvfvefpjb.supabase.co/auth/v1/callback`

## Step-by-Step Fix:

### 1. Access Google Cloud Console
- Go to: https://console.cloud.google.com
- Make sure you're in the correct project

### 2. Navigate to OAuth Settings
- Click on "APIs & Services" in the left sidebar
- Click on "Credentials"
- Find your OAuth 2.0 Client ID (should be type "Web application")
- Click the pencil/edit icon

### 3. Add the Redirect URI
In the "Authorized redirect URIs" section, add this exact URI:
```
https://pyoouvmcamkyvfvefpjb.supabase.co/auth/v1/callback
```

**Important**: Make sure there are no extra spaces or characters!

### 4. Save and Wait
- Click "SAVE"
- Wait 5-10 minutes for changes to propagate
- Clear your browser cache

### 5. Test Again
- Go back to your app
- Try signing in with Google

## Common Mistakes to Avoid:

❌ **Wrong URL format**:
- Don't use: `https://pyoouvmcamkyvfvefpjb.supabase.co/auth/v1/callback/`
- Don't use: `http://pyoouvmcamkyvfvefpjb.supabase.co/auth/v1/callback`

✅ **Correct URL**:
- Use: `https://pyoouvmcamkyvfvefpjb.supabase.co/auth/v1/callback`

❌ **Adding localhost URLs**: Don't add localhost URLs to production OAuth configs

❌ **Forgetting to save**: Always click "SAVE" after adding URIs

## Verification Checklist:

- [ ] Added the exact redirect URI: `https://pyoouvmcamkyvfvefpjb.supabase.co/auth/v1/callback`
- [ ] Saved the OAuth configuration
- [ ] Waited 5-10 minutes for propagation
- [ ] Cleared browser cache
- [ ] Using the correct Google project
- [ ] OAuth 2.0 Client ID is enabled

## If Still Not Working:

1. **Double-check your Supabase URL**: 
   - Go to Supabase Dashboard → Settings → API
   - Verify the URL is exactly: `https://pyoouvmcamkyvfvefpjb.supabase.co`

2. **Check Supabase Auth Configuration**:
   - Go to Supabase Dashboard → Authentication → Providers
   - Make sure Google is enabled
   - Verify Client ID and Secret are correct

3. **Try incognito/private browsing**: Sometimes cached tokens cause issues

4. **Check for typos**: Even a single character difference will cause this error

## Need Help?

If you're still having issues, please share:
- Your Google Cloud Console OAuth configuration screenshot
- Your Supabase Auth provider settings
- Any other error messages you're seeing
