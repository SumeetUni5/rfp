# RFP Manager - Deployment Guide

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Development Server
```bash
pnpm dev
```
Open http://localhost:3000 in your browser

### 3. Build for Production
```bash
pnpm build
```

### 4. Start Production Server
```bash
pnpm start
```

## Available Pages

- `/` - Redirects to dashboard
- `/dashboard` - Main dashboard with statistics
- `/rfp` - List all RFPs
- `/rfp/create` - Create new RFP
- `/rfp/[id]` - View RFP details (e.g., /rfp/rfp1)
- `/vendors` - Manage vendors
- `/proposals` - Track proposals
- `/settings` - User preferences

## Sample Data IDs

### RFPs
- `rfp1` - Enterprise CRM Software Procurement (Published)
- `rfp2` - Office Furniture and Equipment (Published)
- `rfp3` - Marketing Services Contract (Published)
- `rfp4` - Cloud Infrastructure Migration (Draft)
- `rfp5` - IT Hardware Procurement (Closed)
- `rfp6` - Legal Services Retainer (Published)

### Vendors
- `v1` - TechSolutions Inc. (Software)
- `v2` - Global Supplies Ltd. (Goods)
- `v3` - Professional Services Group (Services)
- `v4` - Digital Innovations Corp (Software)
- `v5` - Office Essentials (Goods)
- `v6` - Consulting Partners LLC (Mixed)

## Features Demonstrated

1. **Dashboard**
   - Statistics cards showing key metrics
   - Recent RFP list
   - Quick action buttons
   - RFP category breakdown

2. **RFP Management**
   - List view with search and filters
   - Create RFP with dynamic item lists
   - Detailed RFP view with tabs
   - Status management (Draft → Published → Closed)

3. **Proposal Evaluation**
   - View all proposals for an RFP
   - Compare pricing side-by-side
   - Highlight lowest price
   - Approve/reject proposals
   - Automatic status updates

4. **Vendor Management**
   - Vendor list with filters
   - Contact information display
   - Vendor categorization

5. **Settings**
   - Profile management
   - Notification preferences
   - Display settings

## Technology Stack Verification

✅ Next.js 14 (App Router)
✅ TypeScript
✅ Tailwind CSS 4
✅ Lucide React Icons
✅ pnpm Package Manager
✅ React Hooks (no Redux)
✅ Mock Data Only (no backend)

## Code Quality Checks

✅ No `any` types used
✅ All components properly typed
✅ No hardcoded magic values
✅ Reusable component architecture
✅ Proper error handling
✅ Responsive design
✅ Type-safe props
✅ Clean folder structure
✅ Export barrel files for imports

## Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Future Backend Integration

When connecting to a real backend:

1. Replace mock data imports in `/src/mock/` with API calls
2. Add authentication middleware to `/src/app/layout.tsx`
3. Replace in-memory mutations with fetch/axios requests
4. Add environment variables for API endpoints
5. Add loading states for async operations
6. Add error handling for API failures
7. Add real-time updates via WebSockets

## Troubleshooting

### Build Fails
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`

### Styling Issues
- Check Tailwind CSS is properly configured
- Verify globals.css imports Tailwind
- Check class name collisions

### Type Errors
- Run `pnpm build` to see full TypeScript errors
- Check that all imports are correct
- Verify interface definitions in `/src/types/`

## Production Considerations

1. **Environment Variables**
   ```env
   NEXT_PUBLIC_API_URL=https://api.example.com
   NEXT_PUBLIC_APP_NAME=RFP Manager
   ```

2. **Deployment Platforms**
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS Amplify
   - Docker containers

3. **Performance**
   - Enable Next.js Image Optimization
   - Implement code splitting
   - Use Next.js caching
   - Optimize bundle size

4. **Security**
   - Add rate limiting
   - Implement CSRF protection
   - Add input validation
   - Use HTTPS only

## Support

For issues or questions:
1. Check PROJECT_STRUCTURE.md for architecture details
2. Review memory for coding conventions
3. Refer to inline code comments
4. Check Next.js documentation

## License

Proprietary - All rights reserved
