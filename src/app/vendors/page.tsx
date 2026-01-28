'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { mockVendors } from '@/mock/vendors';
import { Search, Plus, Mail, Phone, MapPin, Building } from 'lucide-react';

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  const filteredVendors = mockVendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || vendor.status === statusFilter;
    const matchesType = typeFilter === 'All' || vendor.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusVariant = (status: string): 'default' | 'success' | 'danger' => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'default';
      case 'Pending': return 'danger';
      default: return 'default';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your vendor partnerships</p>
          </div>
          <Button variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Vendor
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full md:w-48"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </Select>
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full md:w-48"
              >
                <option value="All">All Types</option>
                <option value="Goods">Goods</option>
                <option value="Services">Services</option>
                <option value="Software">Software</option>
                <option value="Mixed">Mixed</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Vendor Name</TableHeaderCell>
                  <TableHeaderCell>Type</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Contact</TableHeaderCell>
                  <TableHeaderCell>Location</TableHeaderCell>
                  <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVendors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                      No vendors found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell className="font-medium flex items-center">
                        <Building className="h-4 w-4 mr-2 text-gray-400" />
                        {vendor.name}
                      </TableCell>
                      <TableCell>{vendor.type}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(vendor.status)}>{vendor.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-3 w-3 mr-1 text-gray-400" />
                            {vendor.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3 w-3 mr-1 text-gray-400" />
                            {vendor.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                          {vendor.address}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
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
