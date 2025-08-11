# gaelcraves
## 🚀 Project Setup & Installation Guide

### Prerequisites

- **Node.js** (v18 or newer recommended)
- **npm** (comes with Node.js)
- **Supabase account** (for backend and authentication)
- **Stripe account** (for payments)
- (Optional) **SendGrid account** (for email notifications)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/gaelcraves.git
   cd gaelcraves
   ```
2. **Install dependencies**
  ```bash
  cd frontend/gaelcraves
  npm install
  ```
3. **Set up env vars**
  - Copy .env.example to .env (or create a new .env file)
  - Fill in your Supabase and Stripe keys:
  ```bash
  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_KEY=your_supabase_anon_key
  VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
  ```
4. **Start the development server**
  ```bash
  npm run dev
  ```
  - The app will be available at http://localhost:5173 (or the port shown in your terminal).

lmk if something doesn't work or you need access to anything!
