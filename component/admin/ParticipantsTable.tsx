"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download } from "lucide-react";

// Types
type Status = "Submitted" | "APPROVED" | "PENDING";

interface Participant {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  submissions: number;
  status: Status;
}

const participantsData: Participant[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah.j@email.com", joinDate: "2/5/2026", submissions: 2, status: "Submitted" },
  { id: "2", name: "Mike Chen", email: "mike.c@email.com", joinDate: "2/5/2026", submissions: 1, status: "APPROVED" },
  { id: "3", name: "Jessica Doe", email: "jess.d@email.com", joinDate: "2/5/2026", submissions: 3, status: "PENDING" },
];

export function ParticipantsTable() {
  
  const getStatusBadge = (status: Status) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0">APPROVED</Badge>;
      case "PENDING":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0">PENDING</Badge>;
      default:
        return <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-0">Submitted</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search participants..." className="pl-9 bg-gray-50 border-gray-200" />
        </div>
        <Button variant="outline" className="bg-[#A01C1C] text-white hover:bg-[#851717] hover:text-white border-0 gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border border-gray-200 bg-white">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold">Participant</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Join Date</TableHead>
              <TableHead className="font-semibold">Submissions</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participantsData.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell className="font-medium">{participant.name}</TableCell>
                <TableCell className="text-gray-500">{participant.email}</TableCell>
                <TableCell className="text-gray-500">{participant.joinDate}</TableCell>
                <TableCell className="text-gray-500">{participant.submissions}</TableCell>
                <TableCell>{getStatusBadge(participant.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" className="text-[#A01C1C] hover:text-[#A01C1C] hover:bg-red-50 font-semibold h-8 text-xs">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}