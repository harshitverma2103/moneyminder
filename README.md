# MoneyMinder

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features
- User authentication (Clerk)
- Create and manage budgets
- Add and list expenses for each budget
- Responsive UI with Tailwind CSS
- PostgreSQL database via Drizzle ORM and Neon

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Expense Management
- Click "Create New Budget" to add a budget.
- Each budget card has a "Show Expenses" button to view and add expenses.
- Add expenses with a name and amount. Expenses are listed below the form.

## Environment Variables
Create a `.env.local` file with:
```
NEXT_PUBLIC_DATABASE_URL=your_neon_postgres_url
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## Database
- Uses Drizzle ORM and Neon for PostgreSQL.
- To push schema changes: `npm run db:push`
- To open Drizzle Studio: `npm run db:studio`

## Deployment
- Deploy on Vercel or any platform supporting Next.js and environment variables.
- Ensure all environment variables are set in your deployment platform.

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Clerk Authentication](https://clerk.com/docs)

---
# moneyminder

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.