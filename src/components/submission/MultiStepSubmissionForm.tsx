
import { Card } from "@/components/ui/card";
import { CompanyInfoStep } from "./steps/CompanyInfoStep";
import { DocumentsStep } from "./steps/DocumentsStep";
import { BusinessInfoStep } from "./steps/BusinessInfoStep";
import { SubmissionGuidelines } from "./SubmissionGuidelines";
import { StepIndicator } from "./StepIndicator";
import { useSubmissionForm } from "./useSubmissionForm";

export const MultiStepSubmissionForm = () => {
  const {
    currentStep,
    formData,
    files,
    setFiles,
    handleCompanyInfoNext,
    handleDocumentsNext,
    handleSubmit,
    setCurrentStep
  } = useSubmissionForm();

  const steps = [
    { number: 1, label: "Company", active: currentStep === 1 },
    { number: 2, label: "Documents", active: currentStep === 2 },
    { number: 3, label: "Business", active: currentStep === 3 }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <StepIndicator steps={steps} currentStep={currentStep} />

      <Card className="p-4 sm:p-6 mb-8">
        {currentStep === 1 && (
          <CompanyInfoStep 
            defaultValues={formData}
            onNext={handleCompanyInfoNext}
          />
        )}
        {currentStep === 2 && (
          <DocumentsStep
            files={files}
            onChange={setFiles}
            onNext={handleDocumentsNext}
            onBack={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 3 && (
          <BusinessInfoStep
            defaultValues={formData}
            onBack={() => setCurrentStep(2)}
            onSubmit={handleSubmit}
          />
        )}
      </Card>

      <SubmissionGuidelines />
    </div>
  );
};
