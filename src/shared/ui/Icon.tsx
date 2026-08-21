import {
  Banknote,
  BarChart3,
  Boxes,
  BriefcaseBusiness,
  ChartSpline,
  CheckCircle2,
  Clock3,
  Factory,
  Gauge,
  Headphones,
  Layers3,
  RefreshCcw,
  Route,
  Settings2,
  ShieldCheck,
  Target,
  Truck,
  UsersRound,
  Warehouse,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/src/shared/types/content";

const icons: Record<IconName, LucideIcon> = {
  analytics: ChartSpline,
  bank: Banknote,
  boxes: Boxes,
  briefcase: BriefcaseBusiness,
  chart: BarChart3,
  check: CheckCircle2,
  clock: Clock3,
  factory: Factory,
  gauge: Gauge,
  headphones: Headphones,
  layers: Layers3,
  people: UsersRound,
  refresh: RefreshCcw,
  route: Route,
  settings: Settings2,
  shield: ShieldCheck,
  target: Target,
  truck: Truck,
  warehouse: Warehouse,
  wallet: WalletCards,
};

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 1.8 }: IconProps) {
  const IconComponent = icons[name];
  return <IconComponent aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}
