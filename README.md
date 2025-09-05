# 🏥 Medi-Path - Healthcare Management Platform

## About Medi-Path

Medi-Path is a comprehensive healthcare management platform that bridges the gap between patients and healthcare providers through secure, efficient, and user-friendly digital solutions.

> **⚠️ Status**: This is currently a **frontend-only** application. No backend is currently connected. For backend setup instructions, see [BACKEND-SETUP.md](./BACKEND-SETUP.md).

## 🚀 Key Features

### For Patients
- **Patient Dashboard**: Comprehensive overview of health information and appointments
- **Smart Scheduling**: Book appointments with conflict detection and automated reminders  
- **Medical Records**: Secure access to complete medical history and test results
- **Medication Tracking**: Track prescriptions, set reminders, and monitor adherence
- **Telemedicine**: High-quality video consultations with healthcare providers
- **Secure Messaging**: HIPAA-compliant communication with medical staff
- **24/7 Access**: Access health information and services anytime, anywhere

### For Healthcare Providers
- **Provider Dashboard**: Manage patient appointments and medical records
- **Patient Management**: Comprehensive patient information and history
- **Appointment Scheduling**: Advanced scheduling with conflict detection
- **Digital Prescriptions**: Electronic prescription management
- **Secure Communication**: HIPAA-compliant messaging with patients

### Security & Compliance
- **HIPAA Compliant**: Full compliance with healthcare data protection regulations
- **Bank-level Encryption**: Advanced security for all medical data
- **Secure Data Storage**: Protected storage with backup and recovery
- **Access Controls**: Role-based permissions for patients and providers

## 🛠️ Technology Stack

This project is built with modern web technologies:

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Backend**: Ready for integration (see [BACKEND-SETUP.md](./BACKEND-SETUP.md))
- **State Management**: TanStack Query for server state management
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React icon library

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Navigation.tsx   # Main navigation component
│   ├── HeroSection.tsx  # Landing page hero
│   ├── FeaturesSection.tsx
│   └── ...
├── pages/               # Main page components
│   ├── Index.tsx        # Landing page
│   ├── Login.tsx        # Authentication
│   ├── PatientDashboard.tsx
│   └── ProviderDashboard.tsx
├── integrations/        # External service integrations
│   └── supabase/        # Supabase configuration
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── assets/              # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medi-path
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables (Optional)**
   ```bash
   # No environment setup required for frontend-only mode
   # For backend integration, see BACKEND-SETUP.md
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🔐 Authentication

> **Note**: Authentication is currently simulated for frontend demonstration. For real authentication setup, see [BACKEND-SETUP.md](./BACKEND-SETUP.md).

The platform will support different user roles:

- **Patients**: Access personal health information and book appointments
- **Healthcare Providers**: Manage patients and appointments
- **Admin**: Platform administration (future feature)

### Demo Mode

Currently running in demo mode with simulated authentication for UI testing purposes.

## 🗄️ Database Schema

> **Note**: No database is currently connected. For backend and database setup, see [BACKEND-SETUP.md](./BACKEND-SETUP.md).

The application is designed to work with the following data structure:
- `profiles` - User profile information
- `appointments` - Appointment scheduling
- `medical_records` - Patient medical history
- `medications` - Prescription tracking
- `messages` - Secure communication

## 🔧 Configuration

### Tailwind CSS

The project uses a custom design system with semantic color tokens defined in `src/index.css` and `tailwind.config.ts`.

## 🚀 Deployment

### Using Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Using Netlify

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to Netlify
3. Configure environment variables in Netlify dashboard

## 📱 Mobile Responsiveness

Medi-Path is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: support@medipath.com
- Phone: 1-800-medi-path
- Documentation: [Project Documentation](https://docs.medi-path.com)

---

**Medi-Path** - Connecting Healthcare, Empowering Patients 🏥💙