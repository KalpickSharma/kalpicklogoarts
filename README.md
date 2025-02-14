# Design Prompt Generator

A web application that helps graphic designers generate creative prompts for logo, UI/UX, and branding projects using AI.

## Features

- Generate creative briefs for various design projects
- Support for different design types (Logo, UI/UX, Branding)
- Integration with OpenAI API for intelligent prompt generation
- Clean and modern UI built with Next.js and Tailwind CSS
- Firebase integration for saving prompt history

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your OpenAI API key
   - Add your Firebase configuration

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

OPENAI_API_KEY=your-openai-key
```

## Tech Stack

- Next.js
- Tailwind CSS
- OpenAI API
- Firebase
- React

## License

MIT
