# 💕 Valentine's Website Design

A beautiful, interactive Valentine's Day website built with Next.js, React, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** (version 18+) installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

We recommend using **pnpm** as the package manager:
```bash
npm install -g pnpm
```

### Installation

1. **Extract the project** to your desired location

2. **Navigate to the project directory**:
   ```bash
   cd valentine-s-website-design
   ```

3. **Install dependencies**:
   ```bash
   pnpm install
   ```

   (or use `npm install` if you prefer npm)

### Running the Project

**Development Mode** (with hot reload):
```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

**Production Build**:
```bash
pnpm build
pnpm start
```

## 📁 Project Structure

- `app/` - Next.js pages and layouts
- `components/` - React components (UI components + custom sections)
- `lib/` - Utility functions and data
- `public/` - Static assets (images, videos, audio)
- `styles/` - Global CSS styles
- `hooks/` - Custom React hooks

## 🛠️ Technology Stack

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component library
- **Framer Motion** - Animations
- **Zod** - Schema validation

## 📝 Available Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linter

## 🎨 Features

Beautiful interactive sections including:
- Cinematic landing experience
- Interactive 3D elements
- Animations and visual effects
- Responsive design

## 💡 Troubleshooting

**Issue**: `pnpm not found`
- Solution: Install pnpm with `npm install -g pnpm`

**Issue**: Port 3000 already in use
- Solution: Run `pnpm dev -- -p 3001` to use a different port

**Issue**: Module not found errors
- Solution: Delete `node_modules` folder and `pnpm-lock.yaml`, then run `pnpm install` again

## 📧 Questions?

If you have any issues running the project, make sure:
1. Node.js is properly installed
2. All dependencies are installed (`pnpm install`)
3. You're running the development server (`pnpm dev`)
4. Your browser cache is cleared if seeing old content

Enjoy! 💌
