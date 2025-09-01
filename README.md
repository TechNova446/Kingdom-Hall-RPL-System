# Kingdom-Hall-RPL-System

A modern React TypeScript application for RPL (Recognition of Prior Learning) certification under Kenya's KNQA framework.

## 🚀 Features

- **Multi-step Registration**: Simple 4-step registration process
- **M-Pesa Integration**: Seamless payment processing
- **Referral System**: Earn bonuses by referring friends
- **Professional Dashboard**: Comprehensive user dashboard
- **Mobile Responsive**: Works perfectly on all devices
- **Modern UI**: Built with Tailwind CSS and Lucide icons

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM
- **HTTP Client**: Axios

## 📁 Project Structure

```
├── client/                 # React application
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── config/       # Configuration files
│   ├── package.json       # Dependencies
│   └── tsconfig.json     # TypeScript config
├── vercel.json           # Vercel deployment config
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RPL
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🏗 Build for Production

```bash
cd client
npm run build
```

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### Option 2: Deploy via GitHub

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the React app and deploy

### Environment Variables

If you need to add environment variables for production:

1. **Create `.env` file in client directory**
   ```
   REACT_APP_API_URL=your-api-url
   ```

2. **Add to Vercel dashboard**
   - Go to your project settings in Vercel
   - Add environment variables

## 📱 Pages & Features

### Public Pages
- **Landing Page** (`/`) - Marketing page with features and benefits
- **Registration** (`/register`) - Multi-step registration process
- **Login** (`/login`) - User authentication

### Protected Pages
- **Dashboard** (`/dashboard`) - Main user dashboard with:
  - Profile information
  - Certification progress
  - Referral system
  - Payment status
  - Recent activity
- **Payment** (`/payment`) - Payment processing page

### Components
- **Sidebar** - Navigation with mobile responsiveness
- **NotificationPanel** - User notifications dropdown
- **SettingsModal** - User settings modal
- **Footer** - Site footer

## 🎨 Styling

The app uses Tailwind CSS with custom primary and secondary color schemes:

```css
:root {
  --primary-50: #eff6ff;
  --primary-600: #2563eb;
  --secondary-50: #f0fdf4;
  --secondary-600: #16a34a;
}
```

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Structure

- **Components**: Reusable UI components
- **Pages**: Full page components
- **Contexts**: React context for state management
- **Services**: API calls and external services
- **Config**: Configuration files and constants

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- **Email**: support@rplplatform.co.ke
- **Phone**: +254 700 000 000
- **Hours**: 24/7 Support

---

**RPL Platform** - Official KNQA Certified Platform