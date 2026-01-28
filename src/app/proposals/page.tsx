'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { mockProposals } from '@/mock/proposals';
import { Search, Eye } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/cn';
import { ProposalStatus } from '@/types';
import Link from 'next/link';

export default function ProposalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProposalStatus | 'All'>('All');

  const filteredProposals = mockProposals.filter((proposal) => {
    const matchesSearch = proposal.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.rfpTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || proposal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: ProposalStatus): 'default' | 'success' | 'danger' | 'info' => {
    switch (status) {
      case 'Accepted': return 'success';
      case 'Rejected': return 'danger';
      case 'Under Review': return 'default';
      case 'Submitted': return 'info';
      default: return 'default';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proposals</h1>
          <p className="mt-1 text-sm text-gray-500">Review and manage vendor proposals</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search proposals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ProposalStatus | 'All')}
                className="w-full md:w-48"
              >
                <option value="All">All Status</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Vendor</TableHeaderCell>
                  <TableHeaderCell>RFP Reference</TableHeaderCell>
                  <TableHeaderCell>Submitted Date</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell className="text-right">Total Amount</TableHeaderCell>
                  <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProposals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                      No proposals found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProposals.map((proposal) => (
                    <TableRow key={proposal.id}>
                      <TableCell className="font-medium">{proposal.vendorName}</TableCell>
                      <TableCell>
                        <Link href={`/rfp/${proposal.rfpId}`} className="text-blue-600 hover:text-blue-800">
                          {proposal.rfpTitle}
                        </Link>
                      </TableCell>
                      <TableCell>{formatDate(proposal.submittedDate)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(proposal.status)}>{proposal.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(proposal.totalAmount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/rfp/${proposal.rfpId}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
