import { z } from "zod";

export const companyInfoSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().url("Please enter a valid URL").optional(),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  stage: z.enum(["idea", "mvp", "early", "growth", "scale"], {
    required_error: "Please select a business stage",
  }),
});

export const businessInfoSchema = z.object({
  problemStatement: z.string().min(50, "Please provide a detailed problem statement (min 50 characters)"),
  solution: z.string().min(50, "Please provide a detailed solution (min 50 characters)"),
  tractionMetrics: z.string().optional(),
});

export const pitchSubmissionSchema = companyInfoSchema.merge(businessInfoSchema);

export type CompanyInfoInputs = z.infer<typeof companyInfoSchema>;
export type BusinessInfoInputs = z.infer<typeof businessInfoSchema>;
export type PitchSubmissionInputs = z.infer<typeof pitchSubmissionSchema>;