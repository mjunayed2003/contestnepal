"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Users,
  FileText,
  ArrowUp,
  Settings,
  RefreshCcwDot,
  RefreshCcwDotIcon,
  RefreshCcw
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock Data for Chart
const data = [
  { name: 'Jan', value: 14000 },
  { name: 'Feb', value: 10000 },
  { name: 'Mar', value: 16000 },
  { name: 'Apr', value: 15000 },
  { name: 'May', value: 24000 },
  { name: 'Jun', value: 20000 },
  { name: 'Jul', value: 22000 },
  { name: 'Aug', value: 18000 },
  { name: 'Sep', value: 23000 },
  { name: 'Oct', value: 24000 },
];

// Mock Data for Table
const recentContests = [
  { date: "01:50 PM, 21/03/2025", name: "Summer Photography Challenge", category: "VOTING", status: "Active", participants: 5000, submissions: 4300 },
  { date: "09:15:20 27/03/2025", name: "Tech Review Contest", category: "POLL", status: "Ended", participants: 5000, submissions: 5000 },
  { date: "09:15:20 22/03/2025", name: "Gadget Giveaway", category: "GIVEAWAY", status: "Ended", participants: 5000, submissions: "$855" }, // assuming $855 was prize value or typo in design, kept consistent
  { date: "01:50 PM, 21/03/2025", name: "Logo Design Hunt", category: "VOTING", status: "Active", participants: 5000, submissions: 4300 },
];

function StatCard({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Icon size={20} />
          </div>
        </div>
        <p className="text-[13px] font-medium text-gray-600 mb-1">{label}</p>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <span className="text-xs font-medium text-green-500 flex items-center mb-1">
            <ArrowUp size={14} className="mr-0.5" /> +12
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <div className="bg-white border w-[232px] border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg flex items-center gap-2">
          <span>Aug 1, 2026 — Oct 31, 2026</span>
        </div>
        <div className="bg-white border w-[100px] border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg flex items-center gap-2">
          <RefreshCcw size={16} className="text-gray-400" />
          Refresh
        </div>
      </div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organizer Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your contests, track participation, and review submissions.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Date Picker Placeholder */}

          <Link href="/admin/create">
            <Button className="bg-[#A01C1C] hover:bg-[#851616] text-white">
              + Create Contests
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Participants" value="5,420" icon={Users} />
        <StatCard label="Active Contests" value="5,420" icon={ShoppingCart} />
        <StatCard label="Total Submissions" value="5,420" icon={FileText} />
        <StatCard label="Pending Submissions" value="5,420" icon={ShoppingCart} />
      </div>

      {/* Chart Section */}
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Growth Trend</h3>
            <select className="text-sm border-gray-200 rounded-md border px-2 py-1 text-gray-600 outline-none">
              <option>This Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Contests Table */}
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-0">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Contests</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-900 font-bold bg-[#F9FAFB] uppercase">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Contest Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Participants</th>
                  <th className="px-6 py-4 text-right">Submissions</th>
                </tr>
              </thead>
              <tbody>
                {recentContests.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-gray-600">{item.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className={`
                        ${item.category === 'VOTING' ? 'bg-red-50 text-red-600' :
                          item.category === 'POLL' ? 'bg-blue-50 text-blue-600' :
                            'bg-purple-50 text-purple-600'} border-0 font-bold px-3`}>
                        {item.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${item.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.participants}</td>
                    <td className="px-6 py-4 text-gray-600 text-right">{item.submissions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}