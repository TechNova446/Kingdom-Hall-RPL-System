#!/bin/bash

echo "🚀 RPL Platform - Deployment Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "client/package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
cd client
npm install

# Build the project
echo "🏗️ Building for production..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Build files are in: client/build/"
echo ""
echo "🌐 To deploy to Vercel:"
echo "   1. Run: vercel"
echo "   2. Or connect your GitHub repo to Vercel dashboard"
echo ""
echo "📋 Next steps:"
echo "   - Push to GitHub: git add . && git commit -m 'Ready for deployment' && git push"
echo "   - Deploy to Vercel: vercel"
