## Relevant Files

- `package.json` - Update dependencies for Next.js 15 migration
- `next.config.js` - Next.js configuration file
- `app/layout.tsx` - Root layout component for App Router
- `app/page.tsx` - Homepage component
- `app/globals.css` - Global styles with TailwindCSS
- `app/api/health/route.ts` - Health check API endpoint
- `app/api/auth/[...nextauth]/route.ts` - NextAuth.js API route
- `lib/auth.ts` - NextAuth.js configuration
- `lib/prisma.ts` - Prisma client configuration
- `prisma/schema.prisma` - Database schema definition
- `prisma/seed.ts` - Database seeding script
- `middleware.ts` - Next.js middleware for authentication
- `lib/validations.ts` - Zod schema validations
- `lib/utils.ts` - Utility functions
- `components/ui/` - Reusable UI components
- `types/` - TypeScript type definitions
- `.env.local` - Environment variables
- `.env.example` - Environment variables template

### Notes

- Unit tests should be placed alongside the code files they are testing
- Use `npm run test` to run the test suite
- Database migrations should be run with `npx prisma migrate dev`
- Authentication testing should include both success and failure scenarios

## Tasks - Public-Facing Website First

- [x] 1.0 Technology Stack Migration
  - [x] 1.1 Install Next.js 15 and configure App Router
  - [x] 1.2 Migrate existing React components to Next.js structure
  - [x] 1.3 Set up TypeScript configuration for Next.js
  - [x] 1.4 Implement proper routing with App Router
  - [x] 1.5 Configure TailwindCSS for Next.js
  - [x] 1.6 Update package.json with Next.js dependencies
  - [x] 1.7 Test component migration and functionality
  - [x] 1.8 Fix navigation and routing issues
  - [x] 1.9 Create all necessary pages and routes

- [ ] 2.0 Complete Marketing Website
  - [ ] 2.1 Create missing product detail pages
  - [ ] 2.2 Add contact page with forms
  - [ ] 2.3 Create pricing page with subscription plans
  - [ ] 2.4 Build blog/insights section
  - [ ] 2.5 Add FAQ and help pages
  - [ ] 2.6 Implement smooth scrolling and animations
  - [ ] 2.7 Add testimonials and case studies

- [ ] 3.0 SEO & Performance Optimization
  - [ ] 3.1 Implement meta tags and structured data
  - [ ] 3.2 Generate sitemap and robots.txt
  - [ ] 3.3 Add Open Graph and Twitter cards
  - [ ] 3.4 Optimize images and performance
  - [ ] 3.5 Implement Google Analytics
  - [ ] 3.6 Add conversion tracking
  - [ ] 3.7 Set up A/B testing framework

- [ ] 4.0 User Engagement Features
  - [ ] 4.1 Create lead capture forms
  - [ ] 4.2 Add newsletter signup
  - [ ] 4.3 Implement demo request forms
  - [ ] 4.4 Add contact form with validation
  - [ ] 4.5 Enhance carbon calculator with save functionality
  - [ ] 4.6 Add product comparison tools
  - [ ] 4.7 Implement user feedback collection

- [ ] 5.0 Content Management System
  - [ ] 5.1 Create blog/insights management interface
  - [ ] 5.2 Add article publishing system
  - [ ] 5.3 Implement category management
  - [ ] 5.4 Add search functionality
  - [ ] 5.5 Create content scheduling
  - [ ] 5.6 Add SEO optimization for content
  - [ ] 5.7 Implement content analytics
