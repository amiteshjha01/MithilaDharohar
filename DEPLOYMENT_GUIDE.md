# Deployment Guide - Mithila Heritage

This guide covers deploying the Mithila Heritage e-commerce platform to Vercel.

## Prerequisites

- GitHub account with your code repository
- Vercel account (free)
- MongoDB Atlas account (free tier available)
- Razorpay business account

## Step 1: Prepare Your Code

### 1.1 Create Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Mithila Heritage e-commerce platform"
git branch -M main
git remote add origin https://github.com/yourusername/mithila-heritage.git
git push -u origin main
```

### 1.2 Ensure .env.local is in .gitignore

Your `.env.local` should never be committed. Check `.gitignore`:

```bash
# Should contain
.env.local
.env.*.local
```

## Step 2: MongoDB Atlas Setup

### 2.1 Create MongoDB Cluster

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new project (e.g., "mithila-heritage")
4. Create a cluster (free tier M0 is sufficient for testing)
5. Wait for cluster to be created (5-10 minutes)

### 2.2 Create Database User

1. Go to "Database Access" → "Add New Database User"
2. Create username (e.g., "mithila-user")
3. Create strong password (save this!)
4. Set roles: "Atlas Admin" or "Read and write to any database"
5. Click "Add User"

### 2.3 Get Connection String

1. Go to "Databases" → Click "Connect" on your cluster
2. Select "Drivers" → "Node.js"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<database>` with "mithila-store"

Example:
```
mongodb+srv://mithila-user:your-password@cluster0.xxxxx.mongodb.net/mithila-store?retryWrites=true&w=majority
```

### 2.4 Add IP Whitelist

1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (for Vercel)
   - This adds `0.0.0.0/0`
   - In production, you might restrict to Vercel's IP ranges

## Step 3: Razorpay Setup

### 3.1 Create Razorpay Account

1. Go to [razorpay.com](https://razorpay.com)
2. Sign up as a Business
3. Complete email verification
4. Fill in business details
5. Wait for approval (usually instant)

### 3.2 Get API Keys

1. Log in to [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Go to Settings → API Keys
3. Select "Live" tab (for production) or "Test" tab (for testing)
4. Copy:
   - Key ID (starts with `rzp_live_` or `rzp_test_`)
   - Key Secret (keep this secret!)

## Step 4: Deploy to Vercel

### 4.1 Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select your repository
5. Click "Import"

### 4.2 Configure Environment Variables

In the "Environment Variables" section, add:

```
MONGODB_URI = mongodb+srv://mithila-user:password@cluster.mongodb.net/mithila-store
RAZORPAY_KEY_ID = rzp_live_xxxxxx (or rzp_test_xxxxxx for testing)
RAZORPAY_KEY_SECRET = xxxxxxxxxx
ADMIN_KEY = your-secret-admin-key (use: openssl rand -base64 32)
```

### 4.3 Deploy

1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Once deployed, you'll get a URL like `https://mithila-heritage.vercel.app`

### 4.4 Test Deployment

1. Visit `https://yourdomain.vercel.app`
2. Test the product listing page
3. Try adding a product via admin dashboard
4. Test payment flow with Razorpay test credentials

## Step 5: Set Up Razorpay Webhook (Optional but Recommended)

### 5.1 Enable Webhook in Razorpay

1. Go to Dashboard → Settings → Webhooks
2. Click "Create a new webhook"
3. Webhook URL: `https://yourdomain.vercel.app/api/razorpay-webhook`
4. Events to subscribe:
   - `payment.authorized`
   - `payment.failed`
5. Secret: (leave Razorpay to generate or use a strong random string)
6. Click "Create webhook"

### 5.2 Update .env.local (local testing only)

If you want to test webhooks locally, you need to expose your local server. Use ngrok:

```bash
npm install -g ngrok
ngrok http 3000
```

This gives you a public URL to use in Razorpay webhook settings.

## Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain in Vercel

1. Go to your Vercel project → Settings → Domains
2. Enter your domain (e.g., `mithila-heritage.com`)
3. Follow the instructions to add DNS records
4. Typically takes 24-48 hours to fully propagate

### 6.2 Update Razorpay Webhook

If using custom domain, update webhook URL:
```
https://yourdomain.com/api/razorpay-webhook
```

## Step 7: Production Checklist

- [ ] MongoDB Atlas cluster created and secure
- [ ] Razorpay business account approved
- [ ] API keys safely stored in Vercel environment variables
- [ ] Code deployed to Vercel
- [ ] Admin dashboard accessible and password set
- [ ] Test payment flow completes successfully
- [ ] Webhook configured (optional but recommended)
- [ ] Custom domain set up (optional)
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Monitor Vercel analytics and logs regularly

## Monitoring & Maintenance

### Vercel Dashboard

1. Check deployment status and logs
2. Monitor function invocation times
3. Review error logs in case of issues

### MongoDB Atlas

1. Monitor cluster performance
2. Check storage usage
3. Review logs for connection issues

### Razorpay Dashboard

1. Monitor transaction success rate
2. Review payment reports
3. Check for failed payments

## Troubleshooting

### Build Fails on Vercel

**Error: Missing environment variables**
- Go to project settings → Environment Variables
- Add all required variables
- Redeploy

**Error: Cannot find module**
- Check `package.json` has all dependencies
- Run `pnpm install` locally
- Commit `pnpm-lock.yaml` or `package-lock.json`

### MongoDB Connection Failed

**Error: connect ECONNREFUSED**
- Check MONGODB_URI is correct
- Go to MongoDB Atlas → Network Access
- Add `0.0.0.0/0` to IP whitelist
- Test connection string locally first

### Razorpay Integration Issues

**Error: RAZORPAY_KEY_ID not found**
- Verify environment variables in Vercel project settings
- Make sure you're using Live keys for production
- Test keys for staging/testing

**Webhook not being called**
- Check webhook URL in Razorpay dashboard is correct
- Verify HTTPS is working
- Test webhook manually in Razorpay dashboard
- Check logs in Vercel for webhook requests

### Admin Dashboard Not Working

**Can't log in to admin**
- Verify ADMIN_KEY is set in environment variables
- Make sure you're entering the exact same key
- Check browser localStorage isn't caching old key

**Can't create products**
- Verify you're logged in with correct admin key
- Check MongoDB connection is working
- Look at Vercel logs for API errors

## Scaling Considerations

As traffic grows:

1. **MongoDB Atlas**: Upgrade cluster tier (M2, M5, etc.)
2. **Vercel**: Automatic scaling (no configuration needed)
3. **Database Optimization**: Add more indexes if queries slow down
4. **Caching**: Consider Redis for frequently accessed products
5. **CDN**: Vercel includes edge caching automatically

## Security Best Practices

1. Never commit `.env.local` to git
2. Rotate ADMIN_KEY regularly
3. Use strong MongoDB passwords
4. Enable 2FA on all accounts (MongoDB, Razorpay, Vercel)
5. Monitor access logs regularly
6. Keep dependencies updated: `pnpm update`
7. Review API keys regularly and revoke unused ones
8. Use HTTPS everywhere (automatic with Vercel)

## Support

For issues:
1. Check Vercel logs: Project → Deployments → View logs
2. Check MongoDB Atlas logs
3. Test locally first before deploying
4. Review code in error traces
