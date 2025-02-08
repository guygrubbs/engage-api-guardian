
import { MultiStepSubmissionForm } from "@/components/submission/MultiStepSubmissionForm";

const SubmissionFormPage = () => {
  return (
    <div className="min-h-screen w-full py-8 px-4 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
        <div className="absolute bottom-0 -right-4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: "-2s" }} />
      </div>

      <div className="container mx-auto">
        <div className="glass animate-fade-in p-6 md:p-8">
          <MultiStepSubmissionForm />
        </div>
      </div>
    </div>
  );
};

export default SubmissionFormPage;
