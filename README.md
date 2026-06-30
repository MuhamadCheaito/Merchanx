<div align="center">
  <br />
  <h1>Merchanx</h1>
  <p>
    <strong>AI-Powered E-Commerce Platform</strong>
  </p>
  <p>
    Describe your business and launch a professional online store in minutes.
  </p>
  <br />
</div>

## Overview

Merchanx is a web application that leverages AI to simplify e-commerce store creation. Users describe their business, and the platform generates a fully branded online store — including design, product listings, and marketing content — without any coding required.

A full-featured dashboard provides tools for managing products, orders, customers, analytics, and marketing campaigns.

## Features

- **AI Store Builder** — Describe your business and get a complete, branded storefront generated in minutes.
- **Design Customization** — Choose from multiple brand styles and personalities, with real-time preview.
- **Template Marketplace** — Browse and apply pre-built store templates.
- **Dashboard** — Manage products, track orders, view analytics, and handle customer data.
- **Marketing Tools** — SEO assistant, social media content generator, and campaign management.
- **Intelligent Recommendations** — AI-driven suggestions for SEO, design, content, and marketing improvements.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| UI Components | [Radix UI](https://www.radix-ui.com/) primitives |
| Icons | [Lucide](https://lucide.dev/) |
| Utilities | [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge), [class-variance-authority](https://cva.style/) |

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/                    # Next.js App Router pages
├── (public)/           # Public landing pages (home, features, templates, etc.)
├── dashboard/          # Dashboard pages (analytics, orders, products, etc.)
└── onboarding/         # Store onboarding wizard

components/             # React components
├── builder/            # AI store builder components
├── dashboard/          # Dashboard-specific components
├── layout/             # Layout and navigation components
├── marketing/          # SEO and social media tools
├── onboarding/         # Onboarding wizard components
├── ui/                 # Reusable UI primitives
└── brand/              # Brand-related components

lib/                    # Utility functions and helpers
types/                  # TypeScript type definitions
public/                 # Static assets
```
