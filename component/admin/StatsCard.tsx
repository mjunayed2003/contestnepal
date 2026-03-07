import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, PieChart, LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  type: "participants" | "submissions" | "engagement";
}

export function StatCard({ label, value, type }: StatCardProps) {
  const styles = {
    participants: {
      icon: Users,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    submissions: {
      icon: FileText,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    engagement: {
      icon: PieChart,
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
  };

  const { icon: Icon, bg, text } = styles[type];

  return (
    <Card className="shadow-sm border-gray-100">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg ${bg}`}>
            <Icon className={`w-5 h-5 ${text}`} />
          </div>
          <span className="text-sm font-medium text-gray-500">{label}</span>
        </div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
      </CardContent>
    </Card>
  );
}