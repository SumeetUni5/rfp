'use client';

import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockRFPs } from '@/mock/rfps';
import { mockProposals as proposalsData } from '@/mock/proposals';
import { FileText, Activity, Clock, Users, TrendingUp } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/cn';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const totalRFPs = mockRFPs.length;
  const activeRFPs = mockRFPs.filter(rfp => rfp.status === 'Published').length;
  const pendingEvaluations = proposalsData.filter(p => p.status === 'Under Review').length;
  const vendorsParticipated = new Set(proposalsData.map(p => p.vendorId)).size;

  const recentRFPs = mockRFPs.slice(0, 5);

  const stats = [
    { name: 'Total RFPs', value: totalRFPs, icon: FileText, color: 'bg-blue-500' },
    { name: 'Active RFPs', value: activeRFPs, icon: Activity, color: 'bg-green-500' },
    { name: 'Pending Evaluations', value: pendingEvaluations, icon: Clock, color: 'bg-yellow-500' },
    { name: 'Vendors Participated', value: vendorsParticipated, icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Overview of your RFP activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent RFPs</CardTitle>
              <Link href="/rfp">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issue Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Closing Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Proposals
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentRFPs.map((rfp) => (
                    <tr key={rfp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/rfp/${rfp.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                          {rfp.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rfp.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(rfp.issueDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(rfp.closingDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          rfp.status === 'Published' ? 'bg-green-100 text-green-800' :
                          rfp.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                          rfp.status === 'Closed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {rfp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rfp.proposalCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                RFP by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Software', 'Goods', 'Services'].map((category) => {
                  const count = mockRFPs.filter(rfp => rfp.category === category).length;
                  const percentage = (count / totalRFPs) * 100;
                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700">{category}</span>
                        <span className="text-gray-500">{count} RFPs</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/rfp/create" className="block">
                  <Button variant="primary" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Create New RFP
                  </Button>
                </Link>
                <Link href="/rfp" className="block">
                  <Button variant="secondary" className="w-full justify-start">
                    <Activity className="h-4 w-4 mr-2" />
                    View All RFPs
                  </Button>
                </Link>
                <Link href="/proposals" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Review Proposals
                  </Button>
                </Link>
                <Link href="/vendors" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Vendors
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
