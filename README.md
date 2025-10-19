# Habit Tracker Pro

A simple and effective habit tracking application built with Next.js 14, TypeScript, and Tailwind CSS. Track your daily habits, monitor your progress, and build consistency.

## Features

- ✅ Create and manage daily habits
- 📊 Track completion statistics and streaks
- 📈 Visual progress monitoring
- 💾 Local storage persistence
- 📱 Responsive design
- 🎯 Daily check-off functionality

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **date-fns** - Date manipulation utilities

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Create Habits**: Click "Add New Habit" to create a new habit with a name and optional description
2. **Track Daily**: Check off habits as you complete them each day
3. **View Stats**: Navigate to the Statistics page to see your progress, streaks, and completion rates
4. **Manage Habits**: Delete habits you no longer want to track

## Project Structure

```
habit-tracker-pro/
├── app/
│   ├── api/ping/          # Health check endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── stats/page.tsx     # Statistics page
├── components/
│   ├── ui/
│   │   └── button.tsx     # Reusable button component
│   ├── habit-form.tsx     # Habit creation form
│   ├── habit-list.tsx     # List of habits
│   └── stats-card.tsx     # Individual habit statistics
├── lib/
│   ├── hooks/
│   │   └── use-habits.ts  # Habit management hook
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT License