# Habit Tracker Pro

A modern habit tracking application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- Create and manage daily habits
- Visual calendar view of habit tracking
- Track habit completion over time
- Responsive design for all devices
- Clean and intuitive user interface

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (Icons)
- Date-fns (Date utilities)

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

## Project Structure

- `app/` - Next.js app router pages and API routes
- `components/` - Reusable React components
- `lib/` - Utility functions and type definitions
- `public/` - Static assets

## API Endpoints

- `GET /api/ping` - Health check endpoint
- `GET /api/habits` - Get all habits
- `POST /api/habits` - Create a new habit
- `PUT /api/habits/[id]` - Update a habit
- `DELETE /api/habits/[id]` - Delete a habit

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT License - see LICENSE file for details.