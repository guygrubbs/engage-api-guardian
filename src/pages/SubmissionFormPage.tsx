import { MultiStepSubmissionForm } from "@/components/submission/MultiStepSubmissionForm";
import Navigation from "@/components/shared/Navigation";

const SubmissionFormPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto py-8">
        <MultiStepSubmissionForm />
      </div>
    </div>
  );
};

export default SubmissionFormPage;