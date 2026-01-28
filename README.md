# RFP Manager - Enterprise Procurement Platform

A production-ready RFP (Request for Proposal) SaaS web application frontend built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- **Dashboard**: Overview of RFP activities with key metrics and recent activities
- **RFP Management**: Create, view, and manage Requests for Proposal
- **Vendor Management**: Maintain vendor partnerships and information
- **Proposal Tracking**: Review and evaluate vendor proposals
- **Evaluation System**: Compare proposals and select winning vendors

### Key Pages
- `/dashboard` - Main dashboard with statistics and quick actions
- `/rfp` - List all RFPs with filtering and search
- `/rfp/create` - Create new RFPs with dynamic item lists
- `/rfp/[id]` - View RFP details with tabs for Overview, Items, Proposals, and Evaluation
- `/vendors` - Manage vendor database
- `/proposals` - Track all submitted proposals
- `/settings` - User preferences and notification settings

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **UI Components**: Custom component library (Button, Card, Table, Tabs, Badge, Input, Select, etc.)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- pnpm package manager installed

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser

## Project Structure

```
src/
 ├─ app/                 # Next.js App Router pages
 │   ├─ dashboard/       # Dashboard page
 │   ├─ rfp/             # RFP management pages
 │   │   ├─ create/      # Create new RFP
 │   │   └─ [id]/        # RFP detail page
 │   ├─ vendors/         # Vendor management
 │   ├─ proposals/       # Proposal tracking
 │   ├─ settings/        # User settings
 │   └─ layout.tsx       # Root layout
 ├─ components/          # React components
 │   ├─ layout/          # Layout components (Sidebar, Header)
 │   └─ ui/              # UI components (Button, Card, Table, etc.)
 ├─ mock/                # Mock data
 │   ├─ rfps.ts          # RFP data
 │   ├─ vendors.ts       # Vendor data
 │   ├─ proposals.ts     # Proposal data
 │   └─ user.ts          # User data
 ├─ types/               # TypeScript type definitions
 │   └─ index.ts         # All type definitions
 └─ utils/               # Utility functions
     └─ cn.ts            # Class name merger and helpers
```

## Data Models

### RFP
- Title, Category (Goods/Services/Software)
- Department, Issue/Closing Dates
- Status (Draft/Published/Closed/Cancelled)
- Evaluation Method
- Dynamic Items List

### Vendor
- Name, Type, Status
- Contact Information
- Address

### Proposal
- Vendor Reference
- RFP Reference
- Line Items with Pricing
- Tax Calculations
- Status (Submitted/Under Review/Accepted/Rejected)

## Key Features Implementation

### RFP Lifecycle
1. **Create**: Draft RFP with items
2. **Publish**: Make RFP available to vendors
3. **Proposals**: Vendors submit proposals
4. **Evaluation**: Compare proposals using different criteria
5. **Selection**: Approve vendor and close RFP

### Evaluation Methods
- **Lowest Price**: Automatic lowest bid selection
- **Technical Score**: Manual evaluation based on capabilities
- **Combined**: Balanced price and technical evaluation

## State Management

- React hooks for local state
- No external state management library
- Mock data stored in-memory
- Async operations simulated with setTimeout

## Design Principles

- Clean, enterprise-grade UI
- Responsive layout for all screen sizes
- Consistent component styling
- Accessibility considerations
- Type-safe code with TypeScript

## Future Enhancements

The application is designed to be easily connected to a backend API:
- Replace mock data with API calls
- Add authentication/authorization
- Implement real database storage
- Add real-time notifications
- Integrate with payment systems
- Add advanced reporting

## Development Notes

- All components are reusable and composable
- No hardcoded magic values
- Comprehensive TypeScript types
- Proper error handling patterns
- Comments only where necessary for complex logic

## License

Proprietary - All rights reserved
