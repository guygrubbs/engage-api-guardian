
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CompanyInfoStep } from "./steps/CompanyInfoStep";
import { DocumentsStep } from "./steps/DocumentsStep";
import { BusinessInfoStep } from "./steps/BusinessInfoStep";
import { SubmissionGuidelines } from "./SubmissionGuidelines";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { CompanyInfoInputs, BusinessInfoInputs } from "@/schemas/pitch-submission";

// Configure backend API URL - this should match your Flask server
const BACKEND_API_URL = 'http://localhost:5000';

export const MultiStepSubmissionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CompanyInfoInputs & Partial<BusinessInfoInputs>>({
    companyName: "",
    website: "",
    industry: "",
    stage: "idea",
    problemStatement: "",
    solution: "",
    tractionMetrics: "",
  });
  const [files, setFiles] = useState<{ pitchDeck: File | null, additionalDocs: File[] }>({
    pitchDeck: null,
    additionalDocs: []
  });
  
  const navigate = useNavigate();

  const handleCompanyInfoNext = (data: CompanyInfoInputs) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleDocumentsNext = () => {
    if (!files.pitchDeck) {
      toast({
        title: "Required Document Missing",
        description: "Please upload a pitch deck before proceeding.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(3);
  };

  const handleSubmit = async (businessInfo: BusinessInfoInputs) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      localStorage.setItem('pendingSubmission', JSON.stringify({ 
        formData: { ...formData, ...businessInfo }, 
        files 
      }));
      navigate('/auth');
      return;
    }

    try {
      const { data: pitch, error: pitchError } = await supabase
        .from('pitches')
        .insert({
          company_name: formData.companyName,
          website_url: formData.website,
          industry: formData.industry,
          stage: formData.stage,
          company_description: businessInfo.problemStatement,
          user_id: user.id,
          status: 'submitted'
        })
        .select()
        .single();

      if (pitchError) throw pitchError;

      // Upload documents to Flask backend
      const formDataToSend = new FormData();
      if (files.pitchDeck) {
        formDataToSend.append('pitchDeck', files.pitchDeck);
      }
      files.additionalDocs.forEach((file, index) => {
        formDataToSend.append(`additionalDoc${index}`, file);
      });
      formDataToSend.append('pitchId', pitch.id);
      formDataToSend.append('companyName', formData.companyName);
      formDataToSend.append('industry', formData.industry);

      const response = await fetch(`${BACKEND_API_URL}/api/generate_report`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to process documents');
      }

      const { task_id } = await response.json();

      // Start polling for report generation status
      const pollStatus = async () => {
        const statusResponse = await fetch(`${BACKEND_API_URL}/api/report_status/${task_id}`);
        const statusData = await statusResponse.json();
        
        if (statusData.status === 'completed') {
          toast({
            title: "Success",
            description: "Your pitch has been submitted and report generation is complete.",
          });
          navigate('/dashboard');
        } else if (statusData.status === 'failed') {
          toast({
            title: "Error",
            description: "Failed to generate report. Our team will review manually.",
            variant: "destructive",
          });
        } else {
          // Continue polling if still processing
          setTimeout(pollStatus, 5000);
        }
      };

      // Start polling
      pollStatus();

      toast({
        title: "Success",
        description: "Your pitch has been submitted. Report generation in progress...",
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit pitch. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4 items-center">
          <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
            currentStep === 1 ? 'bg-emerald-500 text-white' : 'bg-gray-200'
          }`}>
            1
          </div>
          <span className="text-sm">Company</span>
          <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
            currentStep === 2 ? 'bg-emerald-500 text-white' : 'bg-gray-200'
          }`}>
            2
          </div>
          <span className="text-sm">Documents</span>
          <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
            currentStep === 3 ? 'bg-emerald-500 text-white' : 'bg-gray-200'
          }`}>
            3
          </div>
          <span className="text-sm">Business</span>
        </div>
      </div>

      <Card className="p-6 mb-8">
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
