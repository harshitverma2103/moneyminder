# MoneyMinder Deployment Guide

## Prerequisites
- A GitHub account
- A Vercel account
- A Neon PostgreSQL database
- A Clerk account for authentication

## Environment Variables
Create a `.env.local` file with the following variables:
```
NEXT_PUBLIC_DATABASE_URL=your_neon_postgres_url
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## Deployment Steps

### 1. Database Setup
1. Create a Neon PostgreSQL database
2. Get your database connection URL
3. Run database migrations:
```bash
npm run db:push
```

### 2. Vercel Deployment
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Create a new project
4. Import your GitHub repository
5. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_DATABASE_URL`
   - `CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
6. Deploy!

### 3. Post-Deployment
1. Verify your database connection
2. Test user authentication
3. Test budget and expense creation
4. Check analytics functionality

## Troubleshooting

### Common Issues
1. Database Connection Issues
   - Verify your `NEXT_PUBLIC_DATABASE_URL` is correct
   - Check if your Neon database is active
   - Ensure database migrations are up to date

2. Authentication Issues
   - Verify Clerk environment variables
   - Check Clerk dashboard for proper configuration
   - Ensure proper redirect URLs are set in Clerk

3. Build Issues
   - Run `npm run build` locally to check for errors
   - Check for any missing dependencies
   - Verify Next.js configuration

## Maintenance

### Regular Tasks
1. Keep dependencies updated:
```bash
npm update
```

2. Monitor database performance through Neon dashboard

3. Check Vercel analytics for application performance

### Backup
1. Regular database backups through Neon
2. Keep a local copy of your environment variables
3. Document any custom configurations

## Support
For issues:
1. Check the application logs in Vercel
2. Review Neon database logs
3. Check Clerk authentication logs 