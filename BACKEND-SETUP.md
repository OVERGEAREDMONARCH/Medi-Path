# 🔧 Backend Setup Guide for Beginners

This guide will help you set up a backend for the MediConnect healthcare platform. Don't worry if you're new to this - we'll walk through everything step by step!

## 🤔 What is a Backend?

A **backend** is the server-side part of your application that handles:
- **Database**: Storing user data, appointments, medical records
- **Authentication**: User login/signup and security
- **APIs**: Endpoints that your frontend calls to get/send data
- **Business Logic**: Processing data and enforcing rules

## 🎯 Recommended Backend: Supabase

We recommend **Supabase** because it's:
- ✅ **Beginner-friendly** - No complex server setup
- ✅ **Free tier available** - Perfect for learning and testing
- ✅ **Built-in authentication** - Handles login/signup automatically
- ✅ **Real-time database** - Perfect for healthcare apps
- ✅ **HIPAA compliance options** - Important for medical data

## 🚀 Step-by-Step Supabase Setup

### Step 1: Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with your email or GitHub account
4. Verify your email address

### Step 2: Create Your First Project

1. Click **"New Project"**
2. Choose your organization (or create one)
3. Fill in project details:
   - **Name**: `mediconnect-backend`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click **"Create new project"**
5. Wait 2-3 minutes for setup to complete

### Step 3: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy these values (you'll need them later):
   ```
   Project URL: https://your-project-id.supabase.co
   Project ID: your-project-id
   Anon Public Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 4: Update Your Frontend

1. In your MediConnect project, create a `.env` file:
   ```bash
   # In your project root folder
   touch .env
   ```

2. Add your Supabase credentials to `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   VITE_SUPABASE_PROJECT_ID=your-project-id
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

### Step 5: Set Up Your Database

1. In Supabase dashboard, go to **Database** > **Tables**
2. Create the following tables by running these SQL commands in the **SQL Editor**:

```sql
-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" = 'your-jwt-secret';

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  user_type TEXT CHECK (user_type IN ('patient', 'provider')) NOT NULL DEFAULT 'patient',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.profiles(id) NOT NULL,
  provider_id UUID REFERENCES public.profiles(id) NOT NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER DEFAULT 30, -- minutes
  status TEXT CHECK (status IN ('scheduled', 'completed', 'cancelled')) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create medical_records table
CREATE TABLE public.medical_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.profiles(id) NOT NULL,
  provider_id UUID REFERENCES public.profiles(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  record_date DATE NOT NULL,
  record_type TEXT CHECK (record_type IN ('diagnosis', 'prescription', 'test_result', 'note')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create medications table
CREATE TABLE public.medications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.profiles(id) NOT NULL,
  provider_id UUID REFERENCES public.profiles(id) NOT NULL,
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  instructions TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Patients can view their appointments" ON public.appointments
  FOR SELECT USING (auth.uid() = patient_id);

CREATE POLICY "Providers can view their appointments" ON public.appointments
  FOR SELECT USING (auth.uid() = provider_id);

-- Add more policies as needed...
```

### Step 6: Enable Authentication

1. Go to **Authentication** > **Settings**
2. Configure your auth settings:
   - **Enable email confirmation**: Toggle ON for production
   - **Email templates**: Customize if desired
3. Go to **Authentication** > **Providers**
4. Enable the providers you want:
   - ✅ Email (always enabled)
   - Optional: Google, GitHub, etc.

### Step 7: Test Your Setup

1. Start your frontend: `npm run dev`
2. Try creating an account in your app
3. Check Supabase dashboard > **Authentication** > **Users** to see if users are created
4. Test login/logout functionality

## 🔒 Security Best Practices

### Row Level Security (RLS)
Always enable RLS on your tables to ensure users can only access their own data:

```sql
-- Example: Only patients can see their own medical records
CREATE POLICY "Patients can view own records" ON medical_records
  FOR SELECT USING (auth.uid() = patient_id);
```

### Environment Variables
- Never commit `.env` files to version control
- Use different projects for development/production
- Rotate API keys regularly in production

## 🚨 Common Issues & Solutions

### Issue: "supabase is not defined"
**Solution**: Make sure you've restarted your dev server after adding environment variables.

### Issue: "Invalid API key"
**Solution**: Double-check your `.env` file has the correct keys from Supabase dashboard.

### Issue: "RLS prevents access"
**Solution**: Make sure you've created the right policies for your tables.

### Issue: "CORS errors"
**Solution**: Add your domain to allowed origins in Supabase dashboard > Settings > API.

## 📚 Learning Resources

### Supabase Documentation
- [Getting Started](https://supabase.com/docs/guides/getting-started)
- [Authentication](https://supabase.com/docs/guides/auth)
- [Database](https://supabase.com/docs/guides/database)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

### Video Tutorials
- [Supabase Crash Course](https://www.youtube.com/watch?v=7uKQBl9uZ00)
- [React + Supabase Tutorial](https://www.youtube.com/watch?v=I6ypD7qv3Z8)

### Practice Projects
- Start with a simple todo app
- Build a basic blog
- Create a user profile system

## 🆘 Getting Help

If you're stuck:

1. **Check the console**: Open browser dev tools and look for error messages
2. **Supabase logs**: Check your Supabase dashboard > Logs
3. **Community support**: 
   - [Supabase Discord](https://discord.supabase.com)
   - [Stack Overflow](https://stackoverflow.com/questions/tagged/supabase)
4. **Documentation**: Always check official docs first

## 🎉 Next Steps

Once your backend is working:

1. **Implement real authentication** in your React components
2. **Create API calls** to fetch/update data
3. **Add real-time features** using Supabase subscriptions
4. **Deploy your backend** (Supabase handles this automatically!)
5. **Add file storage** for medical documents/images

## 💡 Alternative Backend Options

If Supabase doesn't fit your needs:

### Firebase (Google)
- **Pros**: Great real-time features, good free tier
- **Cons**: More complex pricing, Google ecosystem lock-in
- **Best for**: Real-time apps, mobile apps

### AWS Amplify
- **Pros**: Full AWS integration, very scalable
- **Cons**: Steeper learning curve, complex pricing
- **Best for**: Enterprise applications

### Custom Backend (Node.js/Express)
- **Pros**: Full control, any database
- **Cons**: More setup, server management required
- **Best for**: Experienced developers, custom requirements

---

Remember: **Start simple, build incrementally!** 

You don't need to implement everything at once. Start with basic authentication and user profiles, then gradually add more features as you learn.

Good luck building your healthcare platform! 🏥✨