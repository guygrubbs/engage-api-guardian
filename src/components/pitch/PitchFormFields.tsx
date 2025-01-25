import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { PitchSubmissionFormData } from "@/types/pitch";

interface PitchFormFieldsProps {
  register: UseFormRegister<PitchSubmissionFormData>;
  errors: FieldErrors<PitchSubmissionFormData>;
}

export const PitchFormFields = ({ register, errors }: PitchFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="companyName">Company Name *</Label>
        <Input
          id="companyName"
          {...register("companyName", { required: "Company name is required" })}
        />
        {errors.companyName && (
          <p className="text-sm text-destructive mt-1">{errors.companyName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="companyDescription">Company Description</Label>
        <Textarea
          id="companyDescription"
          {...register("companyDescription")}
          className="min-h-[100px]"
        />
      </div>

      <div>
        <Label htmlFor="fundingGoal">Funding Goal ($)</Label>
        <Input
          id="fundingGoal"
          type="number"
          {...register("fundingGoal")}
        />
      </div>

      <div>
        <Label htmlFor="industry">Industry</Label>
        <Input
          id="industry"
          {...register("industry")}
        />
      </div>

      <div>
        <Label htmlFor="stage">Stage</Label>
        <Input
          id="stage"
          {...register("stage")}
        />
      </div>

      <div>
        <Label htmlFor="teamSize">Team Size</Label>
        <Input
          id="teamSize"
          type="number"
          {...register("teamSize")}
        />
      </div>

      <div>
        <Label htmlFor="websiteUrl">Website URL</Label>
        <Input
          id="websiteUrl"
          type="url"
          {...register("websiteUrl")}
        />
      </div>
    </div>
  );
};