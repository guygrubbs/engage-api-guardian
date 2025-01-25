export interface PitchSubmissionFormData {
  companyName: string;
  companyDescription: string;
  fundingGoal: string;
  industry: string;
  stage: string;
  teamSize: string;
  websiteUrl: string;
}

export interface UploadedFile {
  name: string;
  url: string;
  type: string;
  size: number;
}