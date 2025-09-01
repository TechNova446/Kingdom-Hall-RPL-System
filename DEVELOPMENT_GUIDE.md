# RPL Platform - Frontend Development Guide

## 🚀 Quick Start

The frontend is now ready to run independently with mock API support!

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🎯 Features Available

### ✅ Working Features (with Mock API)
- **Landing Page**: Beautiful homepage with project introduction
- **Multi-Step Registration**: Complete 4-step registration flow
- **Login System**: User authentication with mock data
- **Dashboard**: User dashboard with stats and referral system
- **Responsive Design**: Works on all devices
- **Form Validation**: Client-side validation for all forms

### 🔄 Mock API Integration
The frontend automatically uses mock API when no backend is configured:
- Simulates real API responses
- Includes realistic delays
- Provides sample data for testing
- No backend required for development

## 🎨 UI Components

### Pages
- **LandingPage**: Public homepage with features overview
- **Register**: Multi-step registration (4 steps)
- **Login**: User authentication
- **Dashboard**: User dashboard with stats

### Key Features
- **Step 1**: Personal details (name, gender, age, phone, location, email)
- **Step 2**: Account credentials (username, password)
- **Step 3**: Referral code (optional)
- **Step 4**: Payment integration (M-Pesa simulation)

## 🔧 Development Mode

### Mock API Behavior
- **Login**: Accepts any username/password
- **Registration**: Simulates successful registration
- **Dashboard**: Shows sample user data and stats
- **Referrals**: Mock referral system with sample codes

### Testing the Flow
1. **Visit Landing Page**: See project introduction
2. **Click "Get Started"**: Go to registration
3. **Complete Registration**: Fill all 4 steps
4. **Login**: Use any credentials to test
5. **Dashboard**: View user stats and referral system

## 🎨 Styling & Design

- **Tailwind CSS**: Modern utility-first CSS framework
- **Responsive**: Mobile-first design approach
- **Icons**: Lucide React icons
- **Colors**: Professional blue/green color scheme
- **Typography**: Clean, readable fonts

## 🔌 Backend Integration Ready

When you're ready to connect to Django:

1. **Update API Configuration**:
   ```typescript
   // client/src/config/api.ts
   BASE_URL: 'http://your-django-backend.com/api'
   ```

2. **Set Environment Variable**:
   ```bash
   # client/.env
   REACT_APP_API_URL=http://your-django-backend.com/api
   ```

3. **Expected Django Endpoints**:
   - `POST /auth/login/`
   - `POST /auth/register/step1/`
   - `POST /auth/register/step2/`
   - `GET /auth/me/`
   - `GET /users/dashboard/`
   - `GET /referrals/code/`
   - `POST /payments/initiate/`

## 📱 Mobile Responsive

The application is fully responsive:
- **Desktop**: Full layout with sidebar
- **Tablet**: Optimized for medium screens
- **Mobile**: Stacked layout with touch-friendly buttons

## 🎯 User Experience

### Registration Flow
1. **Personal Info**: Name, gender, age, contact details
2. **Account Setup**: Username and password
3. **Referral Code**: Optional bonus feature
4. **Payment**: Ksh. 200 unlock fee (simulated)

### Dashboard Features
- **User Stats**: Registration progress, payment status
- **Referral System**: Share code, track referrals
- **Profile Management**: Update personal information
- **Payment Status**: Track unlock fee payment

## 🚀 Production Build

```bash
npm run build
```

This creates an optimized production build in `client/build/`

## 🐛 Troubleshooting

### Common Issues
1. **Port 3000 in use**: Change port in `client/package.json`
2. **TypeScript errors**: Run `npm run build` to check
3. **Styling issues**: Ensure Tailwind CSS is properly configured

### Development Tips
- Use browser dev tools to inspect components
- Check console for any API errors
- Mock API responses are logged for debugging

## 📁 Project Structure

```
client/
├── public/           # Static files
├── src/
│   ├── components/   # Reusable UI components
│   ├── contexts/     # React contexts (Auth)
│   ├── pages/        # Page components
│   ├── services/     # API services (mock & real)
│   ├── config/       # Configuration files
│   └── index.tsx     # App entry point
└── package.json      # Dependencies
```

## 🎉 Ready to Use!

The frontend is now fully functional with:
- ✅ No TypeScript errors
- ✅ Mock API integration
- ✅ Responsive design
- ✅ Complete user flow
- ✅ Ready for Django backend

Start developing and testing the user experience right away!
