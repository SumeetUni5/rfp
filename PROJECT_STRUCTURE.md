# RFP Manager - Project Structure Documentation

## Overview

This is a production-ready RFP (Request for Proposal) SaaS web application frontend. The application manages the complete RFP lifecycle from creation to vendor selection.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **State Management**: React hooks (local state)

## Directory Structure

```
/home/engine/project/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── dashboard/                 # Dashboard with statistics
│   │   │   └── page.tsx
│   │   ├── rfp/                     # RFP management
│   │   │   ├── page.tsx              # RFP list with filtering
│   │   │   ├── create/              # Create new RFP
│   │   │   │   └── page.tsx
│   │   │   └── [id]/               # RFP detail page
│   │   │       └── page.tsx
│   │   ├── vendors/                 # Vendor management
│   │   │   └── page.tsx
│   │   ├── proposals/               # Proposal tracking
│   │   │   └── page.tsx
│   │   ├── settings/               # User settings
│   │   │   └── page.tsx
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx               # Home (redirects to /dashboard)
│   │   └── globals.css            # Global styles
│   │
│   ├── components/                   # React components
│   │   ├── layout/                 # Layout components
│   │   │   ├── Layout.tsx          # Main layout wrapper
│   │   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   │   └── Header.tsx         # Top header
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── index.ts
│   │   └── index.ts               # Component exports
│   │
│   ├── mock/                        # Mock data
│   │   ├── rfps.ts                # RFP data
│   │   ├── vendors.ts             # Vendor data
│   │   ├── proposals.ts           # Proposal data
│   │   ├── user.ts               # User data
│   │   └── index.ts              # Mock data exports
│   │
│   ├── types/                      # TypeScript type definitions
│   │   └── index.ts              # All interfaces and types
│   │
│   └── utils/                      # Utility functions
│       └── cn.ts                 # Helper functions
│
├── public/                          # Static assets
├── package.json                      # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── next.config.ts                  # Next.js configuration
└── README.md                       # Project documentation
```

## Pages and Features

### 1. Dashboard (`/dashboard`)
**Components**: Stats cards, Recent RFPs table, Quick actions, Category distribution

**Features**:
- Display total RFPs, active RFPs, pending evaluations, participating vendors
- Recent RFP list with quick links
- Quick action buttons for common tasks
- Visual breakdown of RFPs by category

### 2. RFP List (`/rfp`)
**Components**: Search, Filters, Table with RFP data

**Features**:
- Search by title or department
- Filter by status (Draft, Published, Closed, Cancelled)
- Filter by category (Goods, Services, Software)
- Actions: View, Edit, Publish

### 3. Create RFP (`/rfp/create`)
**Components**: Form with dynamic item list

**Features**:
- Basic information form (title, category, department, dates)
- Dynamic item list (add/remove items)
- Each item: name, specification, quantity, unit
- Save as draft
- Auto-redirect to detail page

### 4. RFP Detail (`/rfp/[id]`)
**Components**: Tabbed interface with multiple views

**Tabs**:
- **Overview**: RFP details, stats cards, summary
- **Items**: List of all RFP items with specifications
- **Proposals**: All vendor proposals with pricing breakdown
- **Evaluation**: Comparison table, selection mechanism

**Features**:
- Approve/reject proposals
- Lowest price highlighting
- Evaluation method display
- Status updates on approval

### 5. Vendors (`/vendors`)
**Components**: Search, Filters, Vendor table

**Features**:
- Search by name or email
- Filter by status and type
- Contact information display
- Location display

### 6. Proposals (`/proposals`)
**Components**: Search, Status filter, Proposal table

**Features**:
- Search by vendor or RFP title
- Filter by proposal status
- Total amount display
- Quick link to RFP details

### 7. Settings (`/settings`)
**Components**: Tabbed interface

**Tabs**:
- **Profile**: Personal information, avatar
- **Notifications**: Email and browser notification preferences
- **Preferences**: Currency, date format, timezone, language, theme

## Data Models

### RFP (Request for Proposal)
```typescript
interface RFP {
  id: string;
  title: string;
  category: 'Goods' | 'Services' | 'Software';
  department: string;
  issueDate: string;
  closingDate: string;
  status: 'Draft' | 'Published' | 'Closed' | 'Cancelled';
  evaluationMethod: 'Lowest Price' | 'Technical Score' | 'Combined';
  items: RFPItem[];
  proposalCount: number;
  createdAt: string;
  updatedAt: string;
}
```

### RFPItem
```typescript
interface RFPItem {
  id: string;
  name: string;
  specification: string;
  quantity: number;
  unit: string;
}
```

### Vendor
```typescript
interface Vendor {
  id: string;
  name: string;
  type: 'Goods' | 'Services' | 'Software' | 'Mixed';
  status: 'Active' | 'Inactive' | 'Pending';
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}
```

### Proposal
```typescript
interface Proposal {
  id: string;
  rfpId: string;
  rfpTitle: string;
  vendorId: string;
  vendorName: string;
  items: ProposalItem[];
  subtotal: number;
  tax: number;
  totalAmount: number;
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
  submittedDate: string;
  notes: string;
}
```

### ProposalItem
```typescript
interface ProposalItem {
  id: string;
  itemId: string;
  itemName: string;
  unitPrice: number;
  quantity: number;
  tax: number;
  lineTotal: number;
}
```

## UI Components

### Button
Variants: primary, secondary, outline, ghost, danger, success
Sizes: sm, md, lg

### Card
Components: Card, CardHeader, CardContent, CardTitle

### Badge
Variants: default, success, warning, danger, info

### Table
Components: Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell
Features: colSpan support, responsive overflow

### Tabs
Client component with dynamic tab content
Supports onChange callback

### Form Components
- Input: Text, date, number, email types
- Select: Dropdown with options

## Utility Functions

### `cn(...inputs)`
Merge class names using clsx and tailwind-merge

### `formatDate(dateString)`
Format dates as "Jan 1, 2024"

### `formatCurrency(amount)`
Format numbers as USD currency

### `generateId()`
Generate unique IDs using timestamp + random string

### `debounce(func, wait)`
Debounce function calls

## Mock Data

All mock data is stored in `/src/mock/`:
- 6 sample RFPs in various statuses
- 6 sample vendors with different types
- 8 sample proposals linked to RFPs
- 1 mock user profile

## RFP Lifecycle Flow

1. **Draft Phase**
   - User creates RFP via `/rfp/create`
   - Status: "Draft"
   - No proposals yet

2. **Publish Phase**
   - User publishes RFP
   - Status: "Published"
   - Vendors can submit proposals

3. **Proposal Phase**
   - Vendors submit proposals
   - Status: "Published"
   - Proposals tracked in system

4. **Evaluation Phase**
   - Review proposals via `/rfp/[id]` → Evaluation tab
   - Compare pricing and details
   - Select winning vendor

5. **Selection Phase**
   - Approve one proposal
   - RFP status changes to "Closed"
   - Selected proposal status: "Accepted"
   - Other proposals: "Rejected"

## Development Notes

### Type Safety
- No `any` types used
- All components have proper TypeScript interfaces
- Props are strictly typed

### State Management
- React hooks for local component state
- No global state management
- Mock data mutations are in-memory

### Responsive Design
- Mobile-first approach
- Responsive sidebar (hidden on small screens)
- Responsive tables with overflow

### Accessibility
- Proper semantic HTML
- Focus states on interactive elements
- Descriptive labels

## Running the Application

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Future Backend Integration

The application is designed to easily connect to a backend API:

1. Replace mock data imports with API calls
2. Add authentication/authorization middleware
3. Replace in-memory mutations with API requests
4. Add real-time updates via WebSockets
5. Add file uploads for documents
6. Add email notifications
7. Add reporting and analytics

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript support required
- CSS Grid and Flexbox support required
