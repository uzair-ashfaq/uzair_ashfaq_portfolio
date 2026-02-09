# Uzair Ashfaq - Portfolio

A premium, dark-mode only 3D animated portfolio website built with React, Three.js, GSAP, and Tailwind CSS.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add your portrait**
   Place your PNG portrait (with transparent background) at:
   ```
   public/portrait.png
   ```
   Recommended size: ~800×1000px or larger for best quality.

3. **Add your logo**
   Place your circular logo at:
   ```
   public/logo.png
   ```
   Used in the navbar. Falls back to "UA" text if missing.

4. **Add your CV**
   Place your CV PDF at:
   ```
   public/cv.pdf
   ```
   Update the Download CV button href in `src/components/Hero.jsx` if needed.

   **Contact info** (email, LinkedIn) is in `src/data.js`.

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Customization

- **Content**: Edit `src/data.js` for projects, experience, testimonials, and copy.
- **Colors**: Update `tailwind.config.js` for charcoal, gold, and off-white values.
- **Contact form**: Replace the form handler in `src/components/Contact.jsx` with your backend (e.g., Formspree, Netlify Forms).

## Tech Stack

- React 18
- Vite
- Three.js + React Three Fiber
- GSAP + ScrollTrigger
- Tailwind CSS
