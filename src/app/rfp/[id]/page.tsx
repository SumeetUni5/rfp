'use client';

import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, Tab } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell } from '@/components/ui/Table';
import { mockRFPs } from '@/mock/rfps';
import { mockProposals } from '@/mock/proposals';
import { formatDate, formatCurrency } from '@/utils/cn';
import { RFPStatus } from '@/types';
import { ArrowLeft, Calendar, Package, Users, FileText, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RFPDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const rfp = mockRFPs.find(r => r.id === params.id);
  const proposals = mockProposals.filter(p => p.rfpId === params.id);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  if (!rfp) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">RFP Not Found</h2>
          <p className="mt-2 text-gray-500">The RFP you're looking for doesn't exist.</p>
          <Link href="/rfp" className="mt-4 inline-block">
            <Button variant="primary">Back to RFPs</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const getStatusVariant = (status: RFPStatus): 'default' | 'success' | 'warning' | 'danger' | 'info' => {
    switch (status) {
      case 'Published': return 'success';
      case 'Draft': return 'default';
      case 'Closed': return 'info';
      case 'Cancelled': return 'danger';
      default: return 'default';
    }
  };

  const handleApproveProposal = async (proposalId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    rfp.status = 'Closed';
    const proposal = proposals.find(p => p.id === proposalId);
    if (proposal) {
      proposal.status = 'Accepted';
    }
    proposals.forEach(p => {
      if (p.id !== proposalId) {
        p.status = 'Rejected';
      }
    });
    router.refresh();
  };

  const lowestPriceProposal = proposals.length > 0 
    ? proposals.reduce((min, p) => p.totalAmount < min.totalAmount ? p : min)
    : null;

  const tabs: Tab[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>RFP Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Title</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-medium">{rfp.title}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="mt-1 text-sm text-gray-900">{rfp.category}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Department</dt>
                  <dd className="mt-1 text-sm text-gray-900">{rfp.department}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <Badge variant={getStatusVariant(rfp.status)}>{rfp.status}</Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {formatDate(rfp.issueDate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Closing Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {formatDate(rfp.closingDate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Evaluation Method</dt>
                  <dd className="mt-1 text-sm text-gray-900">{rfp.evaluationMethod}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Items</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center">
                    <Package className="h-4 w-4 mr-2 text-gray-400" />
                    {rfp.items.length}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Proposals</p>
                    <p className="text-2xl font-bold text-gray-900">{rfp.proposalCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Participating Vendors</p>
                    <p className="text-2xl font-bold text-gray-900">{new Set(proposals.map(p => p.vendorId)).size}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Lowest Bid</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {lowestPriceProposal ? formatCurrency(lowestPriceProposal.totalAmount) : 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 'items',
      label: 'Items',
      content: (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Item Name</TableHeaderCell>
                  <TableHeaderCell>Specification</TableHeaderCell>
                  <TableHeaderCell>Quantity</TableHeaderCell>
                  <TableHeaderCell>Unit</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rfp.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.specification}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'proposals',
      label: 'Proposals',
      content: (
        <div className="space-y-4">
          {proposals.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p>No proposals submitted yet</p>
              </CardContent>
            </Card>
          ) : (
            proposals.map((proposal) => (
              <Card key={proposal.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{proposal.vendorName}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Submitted on {formatDate(proposal.submittedDate)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-500">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(proposal.totalAmount)}
                        </p>
                      </div>
                      {lowestPriceProposal?.id === proposal.id && (
                        <Badge variant="success">Lowest Price</Badge>
                      )}
                      <Badge variant={
                        proposal.status === 'Accepted' ? 'success' :
                        proposal.status === 'Rejected' ? 'danger' : 'warning'
                      }>
                        {proposal.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Item</TableHeaderCell>
                        <TableHeaderCell>Quantity</TableHeaderCell>
                        <TableHeaderCell>Unit Price</TableHeaderCell>
                        <TableHeaderCell>Tax</TableHeaderCell>
                        <TableHeaderCell className="text-right">Line Total</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {proposal.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.itemName}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                          <TableCell>{formatCurrency(item.tax)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.lineTotal)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 flex justify-end">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Subtotal: {formatCurrency(proposal.subtotal)}</p>
                      <p className="text-sm text-gray-500">Tax: {formatCurrency(proposal.tax)}</p>
                      <p className="text-lg font-bold text-gray-900">Total: {formatCurrency(proposal.totalAmount)}</p>
                    </div>
                  </div>
                  {proposal.notes && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                      <p className="text-sm text-gray-600">{proposal.notes}</p>
                    </div>
                  )}
                  {rfp.status === 'Published' && proposal.status === 'Under Review' && (
                    <div className="mt-6 flex justify-end space-x-3">
                      <Button 
                        variant="danger"
                        onClick={() => {
                          proposal.status = 'Rejected';
                          router.refresh();
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button 
                        variant="success"
                        onClick={() => handleApproveProposal(proposal.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve & Close RFP
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      ),
    },
    {
      id: 'evaluation',
      label: 'Evaluation',
      content: (
        <div className="space-y-6">
          {proposals.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p>No proposals to evaluate yet</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Comparison Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Vendor</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell className="text-right">Subtotal</TableHeaderCell>
                        <TableHeaderCell className="text-right">Tax</TableHeaderCell>
                        <TableHeaderCell className="text-right">Total Amount</TableHeaderCell>
                        <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {proposals
                        .sort((a, b) => a.totalAmount - b.totalAmount)
                        .map((proposal) => (
                          <TableRow key={proposal.id}>
                            <TableCell className="font-medium">
                              {proposal.vendorName}
                              {lowestPriceProposal?.id === proposal.id && (
                                <Badge variant="success" className="ml-2">Best Price</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant={
                                proposal.status === 'Accepted' ? 'success' :
                                proposal.status === 'Rejected' ? 'danger' : 'warning'
                              }>
                                {proposal.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">{formatCurrency(proposal.subtotal)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(proposal.tax)}</TableCell>
                            <TableCell className="text-right font-bold">{formatCurrency(proposal.totalAmount)}</TableCell>
                            <TableCell className="text-right">
                              {rfp.status === 'Published' && proposal.status === 'Under Review' && (
                                <div className="flex items-center justify-end space-x-2">
                                  <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => {
                                      proposal.status = 'Rejected';
                                      router.refresh();
                                    }}
                                  >
                                    Reject
                                  </Button>
                                  <Button 
                                    variant="success" 
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleApproveProposal(proposal.id)}
                                  >
                                    Select
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Evaluation Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="evaluation" 
                        id="price" 
                        defaultChecked={rfp.evaluationMethod === 'Lowest Price'}
                        className="mr-3"
                        disabled={rfp.status !== 'Published'}
                      />
                      <label htmlFor="price" className="text-sm text-gray-700">
                        <strong>Lowest Price:</strong> Select vendor with lowest total amount
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="evaluation" 
                        id="technical" 
                        defaultChecked={rfp.evaluationMethod === 'Technical Score'}
                        className="mr-3"
                        disabled={rfp.status !== 'Published'}
                      />
                      <label htmlFor="technical" className="text-sm text-gray-700">
                        <strong>Technical Score:</strong> Evaluate based on technical capabilities and experience
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="evaluation" 
                        id="combined" 
                        defaultChecked={rfp.evaluationMethod === 'Combined'}
                        className="mr-3"
                        disabled={rfp.status !== 'Published'}
                      />
                      <label htmlFor="combined" className="text-sm text-gray-700">
                        <strong>Combined:</strong> Balance of price and technical evaluation (70/30 split)
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/rfp">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{rfp.title}</h1>
            <p className="mt-1 text-sm text-gray-500">
              <Badge variant={getStatusVariant(rfp.status)} className="mr-2">{rfp.status}</Badge>
              {rfp.category} • {rfp.department}
            </p>
          </div>
        </div>

        <Tabs tabs={tabs} />
      </div>
    </Layout>
  );
}
