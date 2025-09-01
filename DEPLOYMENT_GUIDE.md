# 🚀 RPL Platform - Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Project Structure
Your project should have this structure:
```
RPL/
├── client/                 # React application
│   ├── public/            # Static files
│   ├── src/               # Source code
│   ├── package.json       # Dependencies
│   └── tsconfig.json      # TypeScript config
├── vercel.json           # Vercel deployment config
├── .gitignore           # Git ignore file
├── README.md            # Project documentation
└── deploy.sh            # Deployment script
```

### ✅ Required Files
- [x] `vercel.json` - Vercel configuration
- [x] `client/package.json` - React dependencies
- [x] `client/src/` - Source code
- [x] `.gitignore` - Git ignore rules

## 🌐 Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project root**
   ```bash
   # From the RPL/ directory
   vercel
   ```

4. **Follow the prompts**
   - Project name: `rpl-platform`
   - Framework: `Create React App`
   - Build command: `cd client && npm run build`
   - Output directory: `client/build`

### Method 2: GitHub Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect React app

3. **Configure build settings**
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/build`
   - Install Command: `cd client && npm install`

## 🔧 Environment Variables

### Development
Create `client/.env` file:
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_USE_MOCK_API=true
```

### Production (Vercel Dashboard)
Add these in Vercel project settings:
```env
REACT_APP_API_URL=https://your-backend-api.com/api
REACT_APP_USE_MOCK_API=false
```

## 🏗️ Build Configuration

### Vercel Configuration (`vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/client/build/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/client/build/index.html"
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 📱 Features After Deployment

### ✅ Working Features
- **Landing Page** - Marketing page with features
- **Registration** - Multi-step registration process
- **Login** - User authentication
- **Dashboard** - User dashboard with:
  - Profile information
  - Certification progress
  - Referral system
  - Payment status
  - Recent activity
- **Payment** - Payment processing
- **Sidebar** - Navigation with mobile responsiveness
- **Notifications** - User notifications
- **Settings** - User settings modal
- **Footer** - Site footer

### 🎨 UI Components
- **Responsive Design** - Works on all devices
- **Modern UI** - Tailwind CSS styling
- **Icons** - Lucide React icons
- **Animations** - Smooth transitions
- **Loading States** - Professional loading indicators

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Check dependencies
   cd client
   npm install
   npm run build
   ```

2. **404 Errors**
   - Ensure `vercel.json` has proper rewrites
   - Check that React Router is configured correctly

3. **Environment Variables Not Working**
   - Add them in Vercel dashboard
   - Restart deployment after adding

4. **API Calls Failing**
   - Update `REACT_APP_API_URL` in Vercel
   - Check CORS settings on backend

### Debug Commands
```bash
# Test build locally
cd client
npm run build

# Check for TypeScript errors
npm run type-check

# Test development server
npm start
```

## 📊 Post-Deployment

### ✅ Verification Checklist
- [ ] Landing page loads correctly
- [ ] Registration process works
- [ ] Login functionality works
- [ ] Dashboard displays properly
- [ ] Mobile responsiveness works
- [ ] All links and navigation work
- [ ] Forms submit correctly
- [ ] Notifications appear
- [ ] Settings modal opens

### 🔗 Important URLs
- **Production**: `https://your-project.vercel.app`
- **Preview**: `https://your-project-git-branch.vercel.app`
- **Dashboard**: `https://your-project.vercel.app/dashboard`

## 🎯 Next Steps

1. **Connect Backend API**
   - Update `REACT_APP_API_URL` in Vercel
   - Test API integration

2. **Add Custom Domain**
   - Configure in Vercel dashboard
   - Update DNS settings

3. **Monitor Performance**
   - Use Vercel analytics
   - Monitor Core Web Vitals

4. **Set Up CI/CD**
   - Enable automatic deployments
   - Configure branch protection

---

## 📞 Support

If you encounter issues:
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **React Docs**: [reactjs.org](https://reactjs.org)
- **Project Support**: support@rplplatform.co.ke

**RPL Platform** - Official KNQA Certified Platform
