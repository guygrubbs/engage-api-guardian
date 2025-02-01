import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface CompanyInfoStepProps {
  formData: any;
  onChange: (data: any) => void;
  onNext: () => void;
}

export const CompanyInfoStep = ({ formData, onChange, onNext }: CompanyInfoStepProps) => {
  const handleChange = (field: string, value: string) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Company Information</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => handleChange('website', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="industry">Industry *</Label>
          <Input
            id="industry"
            value={formData.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="stage">Business Stage *</Label>
          <Select 
            value={formData.stage} 
            onValueChange={(value) => handleChange('stage', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="idea">Idea Stage</SelectItem>
              <SelectItem value="mvp">MVP</SelectItem>
              <SelectItem value="early">Early Traction</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
              <SelectItem value="scale">Scale</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};