
import { Check } from "lucide-react";

interface ChecklistItemProps {
  title: string;
  items: string[];
}

export const ChecklistItem = ({ title, items }: ChecklistItemProps) => (
  <div className="space-y-2">
    <h3 className="font-semibold text-lg">{title}</h3>
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 mt-1 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);
