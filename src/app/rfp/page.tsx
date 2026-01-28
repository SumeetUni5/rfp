'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { mockRFPs } from '@/mock/rfps';
import { Eye, Edit, Send, Search, Plus } from 'lucide-react';
import { formatDate } from '@/utils/cn';
import { RFPStatus, Category } from '@/types';
import Link from 'next/link';

export default function RFPListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<RFPStatus | 'All'>('All');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');

  const filteredRFPs = mockRFPs.filter((rfp) => {
    const matchesSearch = rfp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfp.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || rfp.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || rfp.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusVariant = (status: RFPStatus): 'default' | 'success' | 'warning' | 'danger' | 'info' => {
    switch (status) {
      case 'Published': return 'success';
      case 'Draft': return 'default';
      case 'Closed': return 'info';
      case 'Cancelled': return 'danger';
      default: return 'default';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Requests for Proposal</h1>
            <p className="mt-1 text-sm text-gray-500">Manage and track all your RFPs</p>
          </div>
          <Link href="/rfp/create">
            <Button variant="primary">
              <Plus className="h-4 w-4 mr-2" />
              Create RFP
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search RFPs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as RFPStatus | 'All')}
                className="w-full md:w-48"
              >
                <option value="All">All Status</option>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Closed">Closed</option>
                <option value="Cancelled">Cancelled</option>
              </Select>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as Category | 'All')}
                className="w-full md:w-48"
              >
                <option value="All">All Categories</option>
                <option value="Goods">Goods</option>
                <option value="Services">Services</option>
                <option value="Software">Software</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Title</TableHeaderCell>
                  <TableHeaderCell>Category</TableHeaderCell>
                  <TableHeaderCell>Department</TableHeaderCell>
                  <TableHeaderCell>Issue Date</TableHeaderCell>
                  <TableHeaderCell>Closing Date</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Proposals</TableHeaderCell>
                  <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRFPs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                      No RFPs found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRFPs.map((rfp) => (
                    <TableRow key={rfp.id}>
                      <TableCell className="font-medium">
                        <Link href={`/rfp/${rfp.id}`} className="text-blue-600 hover:text-blue-800">
                          {rfp.title}
                        </Link>
                      </TableCell>
                      <TableCell>{rfp.category}</TableCell>
                      <TableCell>{rfp.department}</TableCell>
                      <TableCell>{formatDate(rfp.issueDate)}</TableCell>
                      <TableCell>{formatDate(rfp.closingDate)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(rfp.status)}>{rfp.status}</Badge>
                      </TableCell>
                      <TableCell>{rfp.proposalCount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link href={`/rfp/${rfp.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/rfp/${rfp.id}/edit`}>
                            <Button variant="ghost" size="sm" disabled={rfp.status !== 'Draft'}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          {rfp.status === 'Draft' && (
                            <Button variant="ghost" size="sm">
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
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
