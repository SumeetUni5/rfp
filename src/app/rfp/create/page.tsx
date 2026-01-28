'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Category, EvaluationMethod } from '@/types';
import { generateId } from '@/utils/cn';
import { Trash2, Plus, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { mockRFPs } from '@/mock/rfps';

export default function CreateRFPPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Goods' as Category,
    department: '',
    issueDate: '',
    closingDate: '',
    evaluationMethod: 'Lowest Price' as EvaluationMethod,
  });

  const [items, setItems] = useState([
    { id: generateId(), name: '', specification: '', quantity: 1, unit: '' }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    setItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const addItem = () => {
    setItems(prev => [...prev, { 
      id: generateId(), 
      name: '', 
      specification: '', 
      quantity: 1, 
      unit: '' 
    }]);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const newRFP = {
      id: generateId(),
      ...formData,
      status: 'Draft' as const,
      items: items.filter(item => item.name.trim() !== ''),
      proposalCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockRFPs.unshift(newRFP);

    router.push(`/rfp/${newRFP.id}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/rfp">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New RFP</h1>
              <p className="mt-1 text-sm text-gray-500">Fill in the details to create a new Request for Proposal</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RFP Title *
                    </label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter RFP title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="Goods">Goods</option>
                      <option value="Services">Services</option>
                      <option value="Software">Software</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <Input
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Enter department name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issue Date *
                    </label>
                    <Input
                      type="date"
                      name="issueDate"
                      value={formData.issueDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Closing Date *
                    </label>
                    <Input
                      type="date"
                      name="closingDate"
                      value={formData.closingDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Evaluation Method *
                    </label>
                    <Select
                      name="evaluationMethod"
                      value={formData.evaluationMethod}
                      onChange={handleChange}
                      required
                    >
                      <option value="Lowest Price">Lowest Price</option>
                      <option value="Technical Score">Technical Score</option>
                      <option value="Combined">Combined (Price + Technical)</option>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>RFP Items</CardTitle>
                  <Button type="button" variant="secondary" size="sm" onClick={addItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Item Name *
                          </label>
                          <Input
                            value={item.name}
                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                            placeholder="Item name"
                          />
                        </div>

                        <div className="md:col-span-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Specification *
                          </label>
                          <Input
                            value={item.specification}
                            onChange={(e) => handleItemChange(index, 'specification', e.target.value)}
                            placeholder="Detailed specification"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity *
                          </label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Unit *
                          </label>
                          <Input
                            value={item.unit}
                            onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                            placeholder="e.g., pcs, kg"
                          />
                        </div>

                        <div className="md:col-span-1 flex items-end">
                          <Button
                            type="button"
                            variant="danger"
                            size="sm"
                            className="w-full"
                            onClick={() => removeItem(index)}
                            disabled={items.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Link href="/rfp">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button variant="primary" type="submit" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Creating...' : 'Create RFP'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
