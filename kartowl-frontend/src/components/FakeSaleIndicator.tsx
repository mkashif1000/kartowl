import { FakeSaleStatus } from '@shared/schema';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FakeSaleIndicatorProps {
  status: FakeSaleStatus;
  compact?: boolean;
}

const statusConfig: Record<FakeSaleStatus, { 
  icon: typeof CheckCircle; 
  label: string; 
  color: string;
  description: string;
}> = {
  genuine: {
    icon: CheckCircle,
    label: 'Genuine Deal',
    color: 'text-green-600',
    description: 'Price is below historical average - This is a real deal!'
  },
  fair: {
    icon: AlertCircle,
    label: 'Fair Price',
    color: 'text-yellow-600',
    description: 'Price is near the average - Not a bad deal'
  },
  suspicious: {
    icon: AlertTriangle,
    label: 'Possible Fake Sale',
    color: 'text-red-600',
    description: 'Original price seems inflated - Discount may be misleading'
  }
};

export default function FakeSaleIndicator({ status, compact = false }: FakeSaleIndicatorProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  if (compact) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`${config.color}`} data-testid={`indicator-sale-${status}`}>
            <Icon className="w-5 h-5" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-semibold">{config.label}</p>
          <p className="text-xs text-muted-foreground max-w-xs">{config.description}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return (
    <Badge variant="outline" className="gap-1" data-testid={`badge-sale-${status}`}>
      <Icon className={`w-4 h-4 ${config.color}`} />
      <span>{config.label}</span>
    </Badge>
  );
}
