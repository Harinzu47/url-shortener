# URL Shortener

A modern, full-featured URL shortener application built with React and Supabase.

![URL Shortener Banner](/public/banner.png)

## ✨ Features

- **URL Shortening** - Transform long URLs into short, memorable links
- **Custom URLs** - Create branded short links with custom aliases
- **QR Codes** - Automatic QR code generation for each shortened link
- **Click Analytics** - Track total clicks for your links
- **Device & Location Stats** - Analyze visitor device types and geographic locations
- **User Authentication** - Secure login and signup with profile pictures
- **Dashboard** - Manage all your links in one place with search and pagination
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router 7
- **Styling**: Tailwind CSS 4, Radix UI Components
- **Backend**: Supabase (Database, Auth, Storage)
- **Build Tool**: Vite 7
- **Charts**: Recharts
- **QR Codes**: react-qrcode-logo
- **Notifications**: Sonner

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd url-shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_KEY=your_supabase_anon_key
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_BASE_URL=http://localhost:5173
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   └── ui/          # Shadcn/Radix UI components
├── db/              # Supabase API functions
├── hooks/           # Custom React hooks
├── layouts/         # Page layouts
├── pages/           # Route pages
└── context.jsx      # Global context provider
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📊 Supabase Setup

Create the following tables in your Supabase project:

### URLs Table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to auth.users |
| title | text | Link title |
| original_url | text | Original long URL |
| short_url | text | Generated short code |
| custom_url | text | Optional custom alias |
| qr | text | QR code image URL |
| created_at | timestamp | Creation timestamp |

### Clicks Table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| url_id | uuid | Foreign key to urls |
| city | text | Visitor city |
| country | text | Visitor country |
| device | text | Device type |
| created_at | timestamp | Click timestamp |

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Khalid Jundullah
