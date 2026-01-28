'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Tabs, Tab } from '@/components/ui/Tabs';
import { User, Bell, Lock, Database, Globe, Palette, Save } from 'lucide-react';
import { mockUser } from '@/mock/user';

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: '+1 (555) 000-0000',
    department: 'Procurement',
  });

  const [notifications, setNotifications] = useState({
    emailProposals: true,
    emailRFPUpdates: true,
    emailWeeklyDigest: false,
    browserNotifications: true,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    mockUser.name = profileForm.name;
    mockUser.email = profileForm.email;
    setIsSaving(false);
  };

  const tabs: Tab[] = [
    {
      id: 'profile',
      label: 'Profile',
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {profileForm.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <Button type="button" variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="mt-2 text-xs text-gray-500">JPG, GIF or PNG. Max size 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <Select
                    name="department"
                    value={profileForm.department}
                    onChange={handleProfileChange}
                  >
                    <option value="Procurement">Procurement</option>
                    <option value="IT">IT</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="primary" onClick={handleSave} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { key: 'emailProposals', label: 'New proposals submitted', desc: 'Receive email when a vendor submits a new proposal' },
                { key: 'emailRFPUpdates', label: 'RFP status updates', desc: 'Get notified when an RFP status changes' },
                { key: 'emailWeeklyDigest', label: 'Weekly digest', desc: 'Receive a summary of weekly activities' },
                { key: 'browserNotifications', label: 'Browser notifications', desc: 'Show desktop notifications for important updates' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(item.key, !notifications[item.key as keyof typeof notifications])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'preferences',
      label: 'Preferences',
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Currency
                </label>
                <Select defaultValue="USD">
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Format
                </label>
                <Select defaultValue="MM/DD/YYYY">
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <Select defaultValue="America/New_York">
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <Select defaultValue="en">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <Select defaultValue="light">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Items per page
                </label>
                <Select defaultValue="25">
                  <option value="10">10 items</option>
                  <option value="25">25 items</option>
                  <option value="50">50 items</option>
                  <option value="100">100 items</option>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your account settings and preferences</p>
        </div>

        <Tabs tabs={tabs} />
      </div>
    </Layout>
  );
}
