# 💕 Valentine's Website Design - Codebase Summary

## Project Overview
A beautiful, interactive Valentine's Day website built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**. The site features a cinematic landing experience, an interactive dice-based gift opening system, and romantic sections with poetry and videos.

### Core Purpose
An immersive love story experience where users:
1. Experience a cinematic landing animation
2. Roll dice to unlock gifts (10 total)
3. View personal letters, videos, and poetry (Shayari)
4. Experience various romantic themed sections

---

## 🏗️ Architecture & Structure

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19 + Radix UI components
- **Styling**: Tailwind CSS + PostCSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Theme Management**: Next Themes
- **Package Manager**: pnpm

### Project Structure

```
valentine-s-website-design/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Main entry point (Noor Valentine)
│   ├── globals.css              # Global styles
│   ├── dashboard/               # Dashboard page route
│   └── notes/                   # Notes page route
├── components/                  # React components
│   ├── ui/                      # Radix UI wrapper components (40+ files)
│   ├── Custom Sections:
│   │   ├── cinematic-landing.tsx         # Entry gate animation
│   │   ├── dice-dashboard.tsx           # Main interactive dashboard
│   │   ├── dice-3d.tsx                  # 3D dice roll component
│   │   ├── gift-boxes.tsx              # Gift display system
│   │   ├── gift-modal.tsx              # Individual gift viewer
│   │   ├── shayari-section.tsx         # Poetry section
│   │   ├── poem-section.tsx            # Alternative poem display
│   │   ├── timeline-section.tsx        # Timeline of memories
│   │   ├── memory-constellation.tsx    # Star constellation UI
│   │   ├── quote-carousel.tsx          # Rotating quotes
│   │   ├── letter-section.tsx          # Letter display
│   │   ├── music-atmosphere.tsx        # Background audio control
│   │   ├── final-horizon-section.tsx   # Closing section
│   │   ├── closing-section.tsx         # End credits
│   │   ├── floating-lanterns.tsx       # Animated lanterns
│   │   ├── golden-particles.tsx        # Particle effects
│   │   ├── golden-rain.tsx             # Rain animation (triggers on all gifts opened)
│   │   ├── stardust-trail.tsx          # Mouse trail effect
│   │   ├── wardrobe-collection.tsx     # Fashion showcase
│   │   ├── gallery-section.tsx         # Image gallery
│   │   ├── hero-section.tsx            # Hero banner
│   │   ├── footer.tsx                  # Footer component
│   │   ├── navbar.tsx                  # Navigation bar
│   │   ├── section-divider.tsx         # Section separators
│   │   ├── intezaar-meter.tsx          # Wait meter UI
│   │   ├── resonating-widget.tsx       # Interactive widget
│   │   ├── sukoon-mode.tsx             # Calm/peaceful mode
│   │   ├── exit-guard.tsx              # Exit confirmation
│   │   ├── nothing-button.tsx          # Mystery button
│   │   ├── noor-button.tsx             # Primary button
│   │   ├── sparkles.tsx                # Sparkle effects
│   │   ├── shayari-player.tsx          # Poetry audio player
│   │   └── theme-provider.tsx          # Theme context setup
├── hooks/                       # Custom React hooks
│   ├── use-persistent-progress.ts   # Gift opening state management
│   ├── use-mobile.tsx              # Mobile detection hook
│   └── use-toast.ts               # Toast notification hook
├── lib/                         # Utilities & data
│   ├── gift-data.ts             # 10 gifts data (letters, videos, poetry)
│   └── utils.ts                 # Helper functions
├── public/                      # Static assets
│   ├── audio/                   # Shayari audio files
│   ├── images/                  # Image assets
│   │   └── notes/               # Note images folder
│   └── videos/                  # Gift videos (edit1.mp4- edit10.mp4 + cinematic)
├── styles/                      # CSS files
│   └── globals.css             # Global styles
├── package.json                # Dependencies & scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── next.config.mjs            # Next.js configuration
├── components.json            # UI components registry
└── README.md                  # Project documentation
```

---

## 🎯 Key Components & Their Purposes

### Entry Point: `app/page.tsx`
**Purpose**: Main landing page with cinematic gate-keeping
```typescript
// Shows CinematicLanding until user clicks enter
// Then reveals DiceDashboard with fade animation
```
**Flow**: CinematicLanding → DiceDashboard

### `components/cinematic-landing.tsx` - The Welcome Gate
**Purpose**: Immersive video-based introduction with text transitions
**Features**:
- Plays landing video (`/videos/Sequence 03.mp4`)
- 3-phase text animation (appears → holds → changes)
- StardustTrail mouse effect
- Exit animation with reverse zoom
- Session storage for re-entry handling

### `components/dice-dashboard.tsx` - Main Interactive Dashboard
**Purpose**: Central hub for gift interaction
**Features**:
- Manages all 10 gifts display
- Tracks opened/unopened gifts (persistent via localStorage)
- Dice roll mechanic (1-6 values)
- Renders all sub-sections:
  - GiftBoxes (display)
  - ShayariSection (poetry)
  - MusicAtmosphere (background audio)
  - FinalHorizonSection
  - ClosingSection
  - GoldenParticles effect
  - GoldenRain (triggered when all 10 gifts opened)

**State Management**:
Uses `usePersistentProgress` hook to track:
- `openedGiftIndices`: Array of gift indices already opened
- `currentRollGifts`: Gifts selected from current dice roll
- Progress is saved to localStorage and restored on page reload

### `components/dice-3d.tsx` - 3D Dice Roll
**Purpose**: Interactive dice component for gift selection
**Features**:
- 3D dice animation
- Roll mechanics (random value 1-6)
- Selects N gifts based on dice value (where N = dice roll)
- Only offers unopened gifts

### `components/gift-boxes.tsx` - Gift Display
**Purpose**: Shows clickable gift boxes for current roll
**Features**:
- Displays 3D-like gift boxes
- Click to open→ triggers modal
- Visual feedback (opened vs unopened)

### `components/gift-modal.tsx` - Individual Gift Content
**Purpose**: Display single gift content with three tabs
**Tabs**:
1. **Letter**: Personal love letter in Urdu/Hindi
2. **Video**: Personal video message
3. **Shayari**: Poetry + audio narration

**Data Structure**:
```typescript
interface GiftContent {
  letter: string           // Love letter text
  videoSrc: string        // /videos/editN.mp4
  shayari: {
    title: string         // Poetry title
    text: string          // Poetry text
    audioSrc: string      // /audio/shayariN.mp3
  }
}
```

### Gift Data: `lib/gift-data.ts`
**Contains**: Array of 10 gift objects with:
- Romantic letters in Urdu/Hindi poetry style
- References to videos (edit1.mp4 through edit10.mp4)
- Shayari (poetry) with titles and audio files

**Example Gift Structure**:
```typescript
{
  letter: "Tumse pehle zindagi mein...",
  videoSrc: "/videos/edit1.mp4",
  shayari: {
    title: "Pehli Nazar",
    text: "Pehli nazar mein kuch aisa jadoo tha...",
    audioSrc: "/audio/shayari1.mp3"
  }
}
```

### Animated Sections
- **`golden-particles.tsx`**: Floating particle effect background
- **`floating-lanterns.tsx`**: Animated lanterns
- **`stardust-trail.tsx`**: Mouse movement trail effect
- **`golden-rain.tsx`**: Celebratory rain effect (plays when all gifts opened)
- **`shayari-section.tsx`**: Poetry display section
- **`quote-carousel.tsx`**: Rotating romantic quotes
- **`timeline-section.tsx`**: Memory timeline layout
- **`memory-constellation.tsx`**: Star constellation visual (tracks opened gifts)

### UI Components (Radix UI Wrappers)
Located in `components/ui/`, these are Radix UI component wrappers:
- Layout: `accordion`, `tabs`, `drawer`, `sheet`, `sidebar`
- Interaction: `button`, `dialog`, `dropdown-menu`, `context-menu`, `popover`
- Input: `input`, `textarea`, `select`, `form`, `checkbox`, `radio-group`
- Display: `card`, `badge`, `avatar`, `progress`, `carousel`, `chart`
- Utilities: `alert`, `toast`, `separator`, `scroll-area`, `tooltip`

### Custom Hooks
**`use-persistent-progress.ts`**:
- Manages gift-opening state
- localStorage integration for persistence
- Returns: `openedGiftIndices`, `currentRollGifts`, `recordGiftOpened()`, etc.

**`use-mobile.tsx`**:
- Detects mobile device for responsive behavior

---

## 🎨 Visual Flow & User Journey

```
┌─────────────────────────┐
│  CinematicLanding       │  ← Entry gate with video
│  (Shows landing video)  │     Text phases: 0→1→2
└────────────┬────────────┘
             │ User clicks Enter
             ↓
┌─────────────────────────┐
│  DiceDashboard          │  ← Main experience starts
│  - Dice Roll Component  │
│  - Gift Boxes Display   │
│  └─ Gift Modal          │  ← Click gift to open
│     ├─ Letter Tab       │
│     ├─ Video Tab        │
│     └─ Shayari Tab      │
│  - Background Effects   │
│  - Music Control        │
└─────────────────────────┘
             │
      [Roll Dice]
             │
    ┌────────┴─────────┬──────────┬──────────┐
    ↓        ↓        ↓           ↓          ↓
  Gift1    Gift2    Gift3       ...       Gift10
    │        │        │           │          │
    └────────┴─────────┴───────────┴──────────┘
             │
   All 10 Gifts Opened?
        YES ↓
   Golden Rain Effect
   ClosingSection
```

---

## 🚀 How to Run

```bash
# Install dependencies
pnpm install

# Development server (with Turbo)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

**Access**: http://localhost:3000

---

## 📁 Asset Locations

### Videos Required
Place in `/public/videos/`:
- `Sequence 03.mp4` (or `sequence-03.mp4`) - Cinematic landing
- `edit1.mp4` through `edit10.mp4` - Gift videos

### Audio Files
Place in `/public/audio/`:
- `shayari1.mp3` through `shayari10.mp3` - Poetry narration

### Images
Place in `/public/images/`:
- Various image assets
- Note images in `/public/images/notes/`

---

## 🔧 State Management

### localStorage Keys
- **`giftProgress`**: Tracks which gifts have been opened (indices array)
- **`currentRollGifts`**: Stores gifts selected from current roll
- **`showExitToast`**: Session indicator for showing re-entry toast

### Persistent Progress Hook
```typescript
const {
  openedGiftIndices,        // number[]
  currentRollGifts,         // number[]
  isHydrated,              // boolean (client ready)
  recordGiftOpened,        // (index: number) => void
  setCurrentRollGifts,     // (gifts: number[]) => void
  resetCurrentRoll,        // () => void
  clearAllProgress,        // () => void
} = usePersistentProgress()
```

---

## 🎯 Key Features

1. **Cinematic Entry**: Video-based introduction with text animations
2. **Persistent Progress**: Tracks opened gifts across sessions
3. **Dice Mechanic**: Roll determines how many gifts can be opened
4. **Gift System**: 10 personalized gifts with letters, videos, poetry
5. **Audio Narration**: Shayari poetry with background music
6. **Animations**: Particles, lanterns, trails, rain effects
7. **Responsive Design**: Works on desktop and mobile
8. **Dark/Light Theme**: Theme switching capability
9. **Accessibility**: Built on Radix UI (WCAG compliant)

---

## 📝 Development Notes

### Performance Considerations
- Framer Motion used for smooth animations
- Video preloading with fallback handling
- Component lazy loading potential

### Browser Compatibility
- Requires modern browser (ES2020+)
- Video playback may require user interaction first
- LocalStorage for state persistence

### Video Handling
- Primary: `/videos/Sequence%203.mp4` (URL encoded space)
- Fallback: `/videos/sequence-03.mp4` (hyphenated)
- Handles loading errors gracefully

### Known Implementation Details
- Exit gate has reverse zoom animation
- Session storage used for temporary state
- All Shayari content is in Urdu/Hindi with English translations
- Gift constellation fills as gifts are opened

---

## 🔗 Dependencies Summary

**Core**:
- `next@16.1.6` - Framework
- `react@19` - UI library
- `typescript` - Type safety

**Styling**:
- `tailwindcss` - Utility CSS
- `class-variance-authority` - CSS class management

**Animations**:
- `framer-motion@11.15.0` - Advanced animations
- Built-in CSS animations

**UI Components**:
- `@radix-ui/*` - 20+ component libraries
- `cmdk` - Command palette
- `embla-carousel-react` - Carousels
- `lucide-react` - Icons

**Forms & Data**:
- `react-hook-form` - Form management
- `zod` - Schema validation
- `date-fns` - Date utilities

**Other**:
- `next-themes` - Theme management
- `input-otp` - OTP input
- `sonner` - Toast notifications

---

## 💡 Extension Points

Potential areas for expansion:
1. Add more gifts (currently 10, easily extendable)
2. Additional video content
3. More Shayari poems
4. Photo gallery sections
5. Message customization
6. Sharing features
7. Sound effects library
8. Additional animated sections

---

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| Videos not playing | Ensure video files exist in `/public/videos/` with correct names |
| Gifts not persisting | Clear localStorage or check browser cache |
| Audio not playing | Verify audio files in `/public/audio/` exist |
| Animations stuttering | Check browser hardware acceleration settings |
| Port 3000 in use | Run `pnpm dev -- -p 3001` to use different port |

---

Generated: April 2, 2026 | Framework: Next.js 16 | Language: TypeScript