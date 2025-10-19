import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export const StatsCard = ({ title, value, icon: Icon, trend, className }: StatsCardProps) => {
  return (
    <Card className={`p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-foreground">{value}</h3>
          {trend && (
            <p className="text-sm text-success mt-2">{trend}</p>
          )}
        </div>
        <div className="p-3 bg-accent rounded-xl">
          <Icon className="w-6 h-6 text-accent-foreground" />
        </div>
      </div>
    </Card>
  );
};
