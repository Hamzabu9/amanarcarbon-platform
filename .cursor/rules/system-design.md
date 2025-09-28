# AmanarCarbon System Design Document

## 1. System Overview

**AmanarCarbon** is a comprehensive carbon tracking and management platform built with Next.js 15, TypeScript, and PostgreSQL. The system serves multiple user types (individuals, businesses, NGOs ,government) with role-based access control and advanced carbon credit marketplace functionality.

### 1.1 Core Mission
- Enable individuals, businesses, NGOs, and governments to track and reduce their carbon footprint
- Provide a transparent marketplace for verified carbon credits
- Integrate satellite data and AI for accurate carbon project verification
- Offer educational content and certification programs for climate literacy

### 1.2 Key Value Propositions
- **For Individuals**: Easy-to-use carbon calculator with educational content and offset marketplace
- **For Businesses**: Comprehensive emissions tracking, reporting, and carbon credit portfolio management
- **For Government**: Policy development tools, compliance tracking, and public sector emissions management
- **For Developers**: Satellite data integration and AI-powered carbon credit estimation

## 2. System Architecture

### 2.1 Technology Stack
- **Frontend**: Next.js 15 with TypeScript, TailwindCSS, Radix UI
- **Backend**: Next.js API routes with Prisma ORM
- **Database**: PostgreSQL with comprehensive schema
- **Authentication**: NextAuth.js with Google OAuth
- **Payments**: Stripe integration for subscriptions and transactions
- **Satellite Data**: Google Earth Engine API
- **AI/ML**: TensorFlow.js, ML-Matrix, ML-KMeans
- **Testing**: Jest, Playwright for E2E testing
- **Deployment**: Docker, Kubernetes, CI/CD with GitHub Actions

### 2.2 High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   Services      │
│                 │    │                 │    │                 │
│ • Homepage      │    │ • Auth          │    │ • Google Earth  │
│ • Calculator    │    │ • Emissions     │    │   Engine        │
│ • Marketplace   │    │ • Credits        │    │ • Stripe        │
│ • Dashboard     │    │ • Transactions   │    │ • AI/ML Models  │
│ • Education     │    │ • Analytics     │    │ • External APIs │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Database      │    │   Monitoring    │
│   (PostgreSQL)  │    │   (Prometheus/  │
│                 │    │    Grafana)     │
│ • Users         │    │                 │
│ • Emissions     │    │ • Metrics       │
│ • Credits       │    │ • Logs          │
│ • Transactions  │    │ • Alerts        │
└─────────────────┘    └─────────────────┘
```

## 3. Core Features & Workflows

### 3.1 Primary User Workflows

#### Individual Users
1. **Carbon Footprint Calculation**
   - Input personal data (transport, energy, lifestyle)
   - AI-powered recommendations for reduction
   - Educational content and explanations
   - One-click offset purchasing

2. **Learning Journey**
   - Interactive tutorials and courses
   - Progress tracking and certifications
   - Gamification with achievements
   - Community features

#### Business Users
1. **Emissions Management**
   - Multi-site emissions tracking
   - Supply chain carbon accounting
   - Compliance reporting
   - Goal setting and monitoring

2. **Carbon Credit Portfolio**
   - Credit purchasing and management
   - Portfolio analytics and reporting
   - Automated offset recommendations
   - Bulk purchasing capabilities

#### Government Users
1. **Policy Development**
   - Public sector emissions tracking
   - Policy impact analysis
   - Compliance monitoring
   - Public reporting tools

2. **Regulatory Compliance**
   - Audit trail maintenance
   - Regulatory reporting
   - Stakeholder communication
   - Data transparency

#### Project Developers
1. **Project Creation**
   - Satellite data integration
   - NDVI analysis and verification
   - Credit minting and validation
   - Project monitoring

2. **Verification Process**
   - Multi-source data validation
   - Third-party verification
   - Certification management
   - Quality assurance

### 3.2 Key Business Models

#### Subscription Tiers
- **Individual**: Basic calculator, limited credits, educational content
- **Business**: Advanced analytics, portfolio management, team features
- **Government**: Compliance tools, public reporting, policy development
- **Enterprise**: Custom features, dedicated support, white-label options

#### Revenue Streams
- **Subscriptions**: Monthly/annual recurring revenue
- **Transaction Fees**: Percentage of credit sales
- **Consulting Services**: Custom implementation and training
- **Data Licensing**: Satellite data and analytics access
- **Certification Programs**: Educational content and certifications

## 4. Frontend Architecture

### 4.1 Page Structure
```
app/
├── page.tsx                    # Homepage (BeZero-inspired design)
├── calculator/page.tsx         # Carbon calculator
├── marketplace/page.tsx        # Credit marketplace
├── education/page.tsx          # Educational platform
├── dashboard/page.tsx          # Role-based dashboard router
├── auth/
│   ├── signin/page.tsx         # Authentication
│   └── signup/page.tsx
├── products/page.tsx           # Unified product section
├── pricing/page.tsx            # Subscription plans
├── predictive-model/page.tsx    # AI predictions
├── carbon-risk-toolkit/page.tsx # Risk assessment
├── about/page.tsx              # About page
├── contact/page.tsx            # Contact page
└── [feature-pages]/           # Additional feature pages
```

### 4.2 Component Architecture
```
components/
├── home/                       # Homepage sections
│   ├── HeroSection.tsx         # Hero with CTA
│   ├── FeaturesSection.tsx     # Feature showcase
│   ├── PartnersSection.tsx     # Partner logos
│   ├── AboutSection.tsx        # Mission/vision
│   └── CtaSection.tsx          # Call-to-action
├── dashboard/                  # Role-based dashboards
│   ├── DashboardRouter.tsx     # Route to appropriate dashboard
│   ├── DeveloperDashboard.tsx  # Project management
│   ├── BuyerDashboard.tsx      # Portfolio management
│   ├── VerifierDashboard.tsx   # Verification tools
│   ├── AdminDashboard.tsx      # Platform administration
│   ├── sidebar.tsx             # Navigation sidebar
│   └── welcome.tsx             # Welcome component
├── calculator/                 # Carbon calculation tools
│   ├── CarbonCalculator.tsx    # Individual calculator
│   ├── CompanyCarbonCalculator.tsx # Business calculator
│   └── OffsetRecommendations.tsx # AI recommendations
├── marketplace/                # Credit marketplace
│   ├── MarketplaceHeader.tsx   # Search and filters
│   ├── ProjectCard.tsx         # Credit project display
│   └── PortfolioManager.tsx   # Portfolio management
├── education/                  # Learning platform
│   ├── EducationHeader.tsx     # Learning navigation
│   ├── ContentCard.tsx         # Content display
│   └── ProgressTracker.tsx     # Progress tracking
├── pricing/                    # Subscription management
│   ├── PricingPlans.tsx        # Plan comparison
│   └── RevenueAnalytics.tsx    # Revenue analytics
├── auth/                      # Authentication
│   ├── sign-in-form.tsx        # Sign in form
│   └── sign-up-form.tsx        # Sign up form
├── ui/                        # Design system components
│   ├── design-system/          # Custom design system
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   ├── Chart.tsx
│   │   └── index.ts
│   └── [radix-ui-components]  # Base UI components
└── [utility-components]        # Utility components
```

### 4.3 Design System
- **Unified Color Palette**: 
  - Primary: Green (environmental theme)
  - Secondary: Blue (technology theme)
  - Accent: Orange (energy theme)
- **Component Library**: Radix UI + custom design system
- **Responsive Design**: Mobile-first with PWA capabilities
- **Accessibility**: WCAG 2.1 AA compliance
- **Typography**: Inter + Plus Jakarta Sans fonts
- **Theme Support**: Light/dark mode with system preference

## 5. Backend Architecture

### 5.1 API Structure
```
app/api/
├── auth/
│   ├── [...nextauth]/          # NextAuth.js authentication
│   └── register/               # User registration
├── emissions/                  # Emission data management
├── credits/
│   └── mint/                   # Credit minting
├── transactions/               # Payment processing
├── stripe/                     # Stripe integration
│   ├── payment-intent/         # Payment intent creation
│   └── webhook/                # Webhook handling
├── users/                      # User management
│   ├── route.ts                # User CRUD operations
│   └── classification/         # User categorization
├── subscriptions/              # Subscription management
├── portfolio/
│   └── [userId]/
│       ├── route.ts            # Portfolio management
│       └── retire/             # Credit retirement
├── [role]/[userId]/dashboard/  # Role-specific dashboards
│   ├── developers/
│   ├── buyers/
│   ├── verifiers/
│   └── admin/
├── education/
│   └── [userId]/progress/      # Learning progress
├── admin/                      # Admin functions
│   ├── roles/                  # Role management
│   ├── revenue/                # Revenue analytics
│   └── dashboard/              # Admin dashboard
└── health/                     # Health check endpoint
```

### 5.2 Service Layer
```
lib/services/
├── gee-service.ts              # Google Earth Engine integration
├── stripe-service.ts           # Payment processing
├── subscription-service.ts     # Subscription management
├── user-classification-service.ts # User categorization
├── carbon-calculator-service.ts # Calculator engine
├── educational-service.ts      # Learning platform
├── ai-recommendations-service.ts # AI-powered recommendations
├── marketplace-integration-service.ts # Marketplace features
├── historical-tracking-service.ts # Data tracking
├── pwa-service.ts              # Progressive Web App
├── accessibility-service.ts    # Accessibility compliance
├── user-preference-service.ts  # User customization
├── role-assignment-service.ts  # Role management
├── permission-service.ts       # Permission checking
├── usage-tracking-service.ts  # Usage monitoring
├── enterprise-service.ts       # Enterprise contracts
├── government-service.ts      # Government contracts
├── revenue-tracking-service.ts # Revenue analytics
├── onboarding-service.ts       # User onboarding
├── pytorch-service.ts         # ML model integration
├── model-training-service.ts   # Model training
├── model-inference-service.ts  # Real-time predictions
├── model-versioning-service.ts # Model management
├── transaction-logging-service.ts # Transaction logging
└── payment-retry-service.ts    # Payment retry logic
```

### 5.3 Middleware & Security
```
lib/middleware/
├── auth.ts                     # Authentication middleware
├── rbac.ts                     # Role-based access control
├── dashboard-protection.ts     # Dashboard access control
├── data-filtering.ts           # Role-based data filtering
└── rbac.test.ts               # RBAC testing
```

### 5.4 Configuration & Utilities
```
lib/
├── config/
│   └── env.ts                  # Environment configuration
├── auth/
│   └── nextauth-config.ts      # NextAuth configuration
├── design-system/
│   ├── colors.ts               # Color palette
│   └── theme.ts                # Theme configuration
├── types/
│   └── user.ts                 # User type definitions
├── utils/
│   ├── logger.ts               # Logging utility
│   └── model-storage.ts         # Model storage utilities
├── testing/
│   ├── test-utils.ts           # Testing utilities
│   ├── integration-tests.ts    # Integration tests
│   ├── e2e-tests.ts            # E2E tests
│   ├── global-setup.ts         # Test setup
│   └── global-teardown.ts      # Test teardown
└── prisma.ts                   # Prisma client
```

## 6. Database Schema

### 6.1 Core Models
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  role          String    @default("buyer")
  category      String    @default("individual")
  subcategory   String    @default("consumer")
  organization  String?
  country       String    @default("US")
  phone         String?
  isActive      Boolean   @default(true)
  isVerified    Boolean   @default(false)
  // Relations
  accounts      Account[]
  sessions      Session[]
  profile       Profile?
  emissions     Emission[]
  credits       Credit[]
  // Business relations
  subscriptions UserSubscription[]
  usageTracking UsageTracking[]
  enterpriseUsers EnterpriseUser[]
  onboardingProgress UserOnboardingProgress[]
  preferences UserPreferences?
  tutorialProgress TutorialProgress[]
  certifications UserCertification[]
  recommendations AIRecommendation[]
  goals UserGoal[]
  actions UserAction[]
  achievements Achievement[]
}

model Emission {
  id          String   @id @default(cuid())
  userId      String
  latitude    Float
  longitude   Float
  startDate   DateTime
  endDate     DateTime
  metadata    Json?
  // Relations
  user        User     @relation(fields: [userId], references: [id])
  ndviData    NDVIRecord[]
  credits     Credit[]
}

model Credit {
  id          String   @id @default(cuid())
  emissionId  String
  userId      String
  amountCO2e  Float
  verified    Boolean  @default(false)
  certBody    String
  price       Float?
  available   Boolean  @default(true)
  // Relations
  emission    Emission @relation(fields: [emissionId], references: [id])
  user        User     @relation(fields: [userId], references: [id])
  transactions Transaction[]
}

model Transaction {
  id              String   @id @default(cuid())
  creditId        String
  buyerId         String
  sellerId        String
  amount          Float
  status          String
  stripePaymentId String?
  // Relations
  credit          Credit   @relation(fields: [creditId], references: [id])
  buyer           User     @relation("buyer", fields: [buyerId], references: [id])
  seller          User     @relation("seller", fields: [sellerId], references: [id])
}
```

### 6.2 Business Models
```prisma
model UserSubscription {
  id                    String   @id @default(cuid())
  userId                String
  planId                String
  status                String
  currentPeriodStart    DateTime
  currentPeriodEnd      DateTime
  cancelAtPeriodEnd     Boolean  @default(false)
  stripeSubscriptionId  String?
  stripeCustomerId      String?
  // Relations
  user                  User     @relation(fields: [userId], references: [id])
}

model SubscriptionPlan {
  id            String   @id @default(cuid())
  name          String
  description   String
  category      String
  subcategory   String
  features      Json
  limits        Json
  pricing       Json
  stripePriceId String?
  isActive      Boolean  @default(true)
  isPopular     Boolean  @default(false)
}

model UsageTracking {
  id                String   @id @default(cuid())
  userId            String
  month             Int
  year              Int
  emissionsCount    Int      @default(0)
  creditsCount      Int      @default(0)
  apiCallsCount     Int      @default(0)
  storageUsedGB     Float    @default(0)
  teamMembersCount  Int?     @default(0)
  // Relations
  user              User     @relation(fields: [userId], references: [id])
}

model EnterpriseContract {
  id            String   @id @default(cuid())
  companyName   String
  contactEmail  String
  contactName   String
  companySize   String
  industry      String
  country       String
  contractType  String
  status        String
  startDate     DateTime
  endDate       DateTime
  pricing       Json
  features      Json
  limits        Json
  customTerms   Json
  // Relations
  proposals     ContractProposal[]
  users         EnterpriseUser[]
}

model GovernmentContract {
  id            String   @id @default(cuid())
  agencyName    String
  department    String
  level         String
  jurisdiction  String
  contractNumber String
  status        String
  startDate     DateTime
  endDate       DateTime
  pricing       Json
  compliance    Json
  features      Json
  limits        Json
  customTerms   Json
  // Relations
  reports       ComplianceReport[]
}
```

### 6.3 Educational Models
```prisma
model EducationalContent {
  id                String   @id @default(cuid())
  title             String
  description       String
  type              String
  category          String
  difficulty        String
  duration          Int
  content           Json
  prerequisites     Json
  learningObjectives Json
  tags              Json
  isPublished       Boolean  @default(false)
  // Relations
  tutorialProgress  TutorialProgress[]
}

model TutorialProgress {
  id             String   @id @default(cuid())
  userId         String
  contentId      String
  progress       Int      @default(0)
  completedAt    DateTime?
  timeSpent      Int      @default(0)
  quizScore      Int?
  lastAccessed   DateTime @default(now())
  // Relations
  user           User     @relation(fields: [userId], references: [id])
  content        EducationalContent @relation(fields: [contentId], references: [id])
}

model Certification {
  id              String   @id @default(cuid())
  name            String
  description     String
  requirements    Json
  duration        Int
  examQuestions   Int
  passingScore    Int
  validityPeriod  Int
  isActive        Boolean  @default(true)
  // Relations
  userCertifications UserCertification[]
}
```

### 6.4 Analytics Models
```prisma
model AIRecommendation {
  id              String   @id @default(cuid())
  userId          String
  title           String
  description     String
  category        String
  priority        String
  impact          Json
  difficulty      String
  timeframe       String
  confidence      Int
  requirements    Json
  benefits        Json
  risks           Json
  resources       Json
  personalized    Boolean  @default(false)
  status          String   @default("pending")
  // Relations
  user            User     @relation(fields: [userId], references: [id])
}

model UserGoal {
  id              String   @id @default(cuid())
  userId          String
  title           String
  description     String
  target          Float
  current         Float    @default(0)
  unit            String
  deadline        DateTime
  category        String
  status          String   @default("active")
  progress        Float    @default(0)
  // Relations
  user            User     @relation(fields: [userId], references: [id])
  milestones      UserGoalMilestone[]
}

model UserAction {
  id              String   @id @default(cuid())
  userId          String
  type            String
  description     String
  impact          Float?
  metadata        Json?
  // Relations
  user            User     @relation(fields: [userId], references: [id])
}
```

## 7. External Dependencies

### 7.1 Core Technologies
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety and development experience
- **Prisma**: Database ORM with PostgreSQL
- **NextAuth.js**: Authentication with Google OAuth
- **TailwindCSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### 7.2 External Services
- **Google Earth Engine**: Satellite data for NDVI calculations
- **Stripe**: Payment processing and subscription management
- **TensorFlow.js**: Machine learning for carbon credit estimation
- **ML-Matrix/ML-KMeans**: Additional ML capabilities
- **Axios**: HTTP client for API calls

### 7.3 Development Tools
- **Jest**: Unit testing framework
- **Playwright**: End-to-end testing
- **Docker**: Containerization
- **Prometheus/Grafana**: Monitoring and analytics
- **GitHub Actions**: CI/CD pipeline
- **Nginx**: Reverse proxy and load balancing

## 8. Security & Compliance

### 8.1 Authentication & Authorization
- **NextAuth.js**: OAuth integration with Google
- **JWT Tokens**: Secure session management
- **Role-Based Access Control**: Granular permissions system
- **Multi-Factor Authentication**: Enhanced security for sensitive operations

### 8.2 Data Protection
- **Environment Variables**: Secure configuration management
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Prisma ORM protection
- **XSS Protection**: React's built-in protection
- **CSRF Protection**: NextAuth.js CSRF tokens

### 8.3 Compliance
- **GDPR Compliance**: Data privacy and user rights
- **WCAG 2.1 AA**: Accessibility compliance
- **SOC 2**: Security and availability standards
- **ISO 27001**: Information security management

## 9. Performance & Scalability

### 9.1 Performance Optimization
- **Next.js Optimization**: Automatic code splitting and optimization
- **Image Optimization**: Next.js Image component
- **Caching**: Redis for session and data caching
- **CDN**: Static asset delivery
- **Database Indexing**: Optimized queries

### 9.2 Scalability
- **Microservices Ready**: Service-oriented architecture
- **Horizontal Scaling**: Load balancer configuration
- **Database Scaling**: Read replicas and connection pooling
- **Container Orchestration**: Kubernetes deployment

### 9.3 Monitoring
- **Application Metrics**: Prometheus monitoring
- **Logging**: Structured logging with Winston
- **Error Tracking**: Sentry integration
- **Performance Monitoring**: Real-time performance metrics

## 10. Deployment & DevOps

### 10.1 Containerization
```dockerfile
# Dockerfile for Next.js application
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 10.2 Infrastructure
- **Docker Compose**: Local development environment
- **Kubernetes**: Production orchestration
- **Nginx**: Reverse proxy and load balancing
- **PostgreSQL**: Primary database
- **Redis**: Caching and session storage

### 10.3 CI/CD Pipeline
```yaml
# GitHub Actions workflow
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test
      - run: npm run build
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: echo "Deploy to production"
```

## 11. Testing Strategy

### 11.1 Testing Pyramid
- **Unit Tests**: Jest for individual components and functions
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Playwright for user workflows
- **Performance Tests**: Load testing with Artillery
- **Security Tests**: OWASP ZAP security scanning

### 11.2 Test Coverage
- **Frontend Components**: React Testing Library
- **API Endpoints**: Supertest for API testing
- **Database Operations**: Prisma test database
- **Authentication**: NextAuth.js testing
- **Payment Processing**: Stripe test mode

## 12. Broken/Redundant Code to Remove

### 12.1 Layout Components (Removed)
- `components/layout/PublicLayout.tsx`
- `components/layout/UnifiedLayout.tsx`
- `components/layout/UnifiedNavigation.tsx`
- `components/layout/UnifiedFooter.tsx`
- `components/layout/SimpleNavigation.tsx`
- `components/layout/Footer.tsx`

### 12.2 Animation Components (Removed)
- `components/AnimatedSection.tsx`
- `components/LayoutWrapper.tsx`
- `components/PartnerCarousel.tsx`

### 12.3 Legacy Components (Removed)
- `components/Navbar.tsx`
- `components/Footer.tsx`

### 12.4 Test Pages (Removed)
- `app/test/`
- `app/page-simple.tsx`
- `app/page-minimal.tsx`
- `app/about/page-test.tsx`

## 13. Clean System Design for Rebuild

### 13.1 Architecture Principles
1. **Modular Design**: Clear separation of concerns with service layer
2. **Role-Based Access**: Granular permissions system
3. **Multi-Tenant**: Support for different user types and pricing models
4. **Scalable**: Microservices-ready with clear API boundaries
5. **Accessible**: WCAG 2.1 AA compliance throughout
6. **Testable**: Comprehensive testing strategy
7. **Maintainable**: Clean code and documentation

### 13.2 Key Design Patterns
- **Service Layer Pattern**: Business logic in dedicated services
- **Repository Pattern**: Data access abstraction
- **Middleware Pattern**: Cross-cutting concerns (auth, RBAC)
- **Component Composition**: Reusable UI components
- **Strategy Pattern**: Different pricing and subscription models
- **Observer Pattern**: Event-driven architecture
- **Factory Pattern**: Service instantiation

### 13.3 Data Flow
1. **User Authentication**: NextAuth.js → Role Assignment → Dashboard Routing
2. **Carbon Calculation**: Input → Calculator Service → AI Recommendations → Marketplace Integration
3. **Credit Trading**: Project Creation → GEE Verification → Credit Minting → Marketplace → Transaction Processing
4. **Analytics**: User Actions → Tracking Service → Analytics Dashboard → Reporting

### 13.4 Integration Points
- **Google Earth Engine**: Satellite data for project verification
- **Stripe**: Payment processing and subscription management
- **AI/ML Services**: Carbon credit estimation and recommendations
- **External APIs**: Energy, transport, and environmental data sources

## 14. Implementation Roadmap

### 14.1 Phase 1: Foundation (Completed)
- ✅ Database schema and Prisma setup
- ✅ Google Earth Engine integration
- ✅ Stripe payment integration
- ✅ Authentication and RBAC
- ✅ Basic API endpoints

### 14.2 Phase 2: User Experience (Completed)
- ✅ Multi-dimensional user classification
- ✅ Subscription system implementation
- ✅ UI/UX consolidation with BeZero design
- ✅ Role-based dashboards
- ✅ Enhanced marketplace
- ✅ Educational platform
- ✅ Business model implementation

### 14.3 Phase 3: Advanced Features (Pending)
- 🔄 Advanced analytics and reporting
- 🔄 Comprehensive testing suite
- 🔄 Production deployment
- 🔄 Third-party integrations
- 🔄 AI/ML enhancements
- 🔄 Enterprise features

## 15. Success Metrics

### 15.1 Technical Metrics
- **Performance**: Page load time < 2s, API response time < 500ms
- **Availability**: 99.9% uptime
- **Security**: Zero security incidents
- **Code Quality**: 90% test coverage

### 15.2 Business Metrics
- **User Acquisition**: Monthly active users
- **Revenue**: Monthly recurring revenue
- **Engagement**: User retention and activity
- **Customer Satisfaction**: Net Promoter Score

### 15.3 Environmental Impact
- **Carbon Credits**: Credits minted and traded
- **Emissions Reduced**: Total CO2 reduction achieved
- **Projects Verified**: Number of verified projects
- **Educational Impact**: Users completing courses

This system design document provides a comprehensive blueprint for rebuilding AmanarCarbon with clean, maintainable code while preserving all intended functionality and business logic. The architecture supports scalability, security, and user experience requirements for a world-class carbon management platform.
