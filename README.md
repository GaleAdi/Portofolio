# Portfolio

A personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Email**: [Resend](https://resend.com/) (contact form)
- **Icons**: [Lucide React](https://lucide.dev/)

## Local Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Create environment variables
cp .env.local.example .env.local
# Then fill in your values:
#   RESEND_API_KEY=your_resend_api_key_here
#   CONTACT_EMAIL=your@email.com

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from [Resend](https://resend.com/). Get one at resend.com — free tier is sufficient. |
| `CONTACT_EMAIL` | Your email address. Incoming contact form submissions will be sent here. |

## Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/import?repository-url=<your-repo-url>)

> After deploying, set the `RESEND_API_KEY` and `CONTACT_EMAIL` environment variables in the Vercel dashboard under Settings → Environment Variables.

## Project Structure

```
portfolio/
├── app/
│   ├── api/contact/route.ts   # Contact form API endpoint
│   ├── globals.css            # Global styles + Tailwind
│   ├── layout.tsx             # Root layout + metadata
│   └── page.tsx              # Main page
├── components/
│   ├── About.tsx              # About section
│   ├── BackToTop.tsx          # Floating back-to-top button
│   ├── Contact.tsx            # Contact form section
│   ├── Experience.tsx         # Work experience timeline
│   ├── Footer.tsx             # Site footer
│   ├── Hero.tsx               # Hero section
│   ├── MotionProvider.tsx     # Framer Motion LazyMotion wrapper
│   ├── Navbar.tsx             # Sticky navigation
│   └── Projects.tsx           # Projects grid with filtering
├── data/
│   ├── experience.ts          # Experience data
│   ├── profile.ts             # Personal profile data
│   └── projects.ts            # Projects data
├── public/
│   └── images/
│       └── profile.jpg        # Profile photo (add your own)
├── .env.local                 # Environment variables (gitignored)
├── .gitignore
├── next.config.ts
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Adding Your Content

Edit the files in `data/` to customize:

- **data/profile.ts** — Name, bio, social links, skills
- **data/projects.ts** — Project entries (title, description, tags, URLs)
- **data/experience.ts** — Work experience entries

Add your profile photo as `public/images/profile.jpg`.