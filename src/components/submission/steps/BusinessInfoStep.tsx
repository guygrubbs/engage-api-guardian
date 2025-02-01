import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface BusinessInfoStepProps {
  formData: any;
  onChange: (data: any) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export const BusinessInfoStep = ({ formData, onChange, onBack, onSubmit }: BusinessInfoStepProps) => {
  const handleChange = (field: string, value: string) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Business Information</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="problemStatement">Problem Statement *</Label>
          <Textarea
            id="problemStatement"
            placeholder="What problem are you solving?"
            value={formData.problemStatement}
            onChange={(e) => handleChange('problemStatement', e.target.value)}
            className="min-h-[100px]"
            required
          />
        </div>

        <div>
          <Label htmlFor="solution">Solution *</Label>
          <Textarea
            id="solution"
            placeholder="How does your product/service solve this problem?"
            value={formData.solution}
            onChange={(e) => handleChange('solution', e.target.value)}
            className="min-h-[100px]"
            required
          />
        </div>

        <div>
          <Label htmlFor="tractionMetrics">Traction & Metrics</Label>
          <Textarea
            id="tractionMetrics"
            placeholder="Current users, revenue, growth rate, etc."
            value={formData.tractionMetrics}
            onChange={(e) => handleChange('tractionMetrics', e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onSubmit}>Submit Pitch</Button>
      </div>
    </div>
  );
};