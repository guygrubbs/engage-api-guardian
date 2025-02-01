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
          status: 'draft'
        })
        .select()
        .single();

      if (pitchError) throw pitchError;

      if (files.pitchDeck) {
        const fileName = `${crypto.randomUUID()}-${files.pitchDeck.name}`;
        const { error: uploadError } = await supabase.storage
          .from('pitch-files')
          .upload(fileName, files.pitchDeck);

        if (uploadError) throw uploadError;

        const { error: fileError } = await supabase
          .from('pitch_files')
          .insert({
            pitch_id: pitch.id,
            file_name: files.pitchDeck.name,
            file_url: fileName,
            file_type: files.pitchDeck.type,
            file_size: files.pitchDeck.size
          });

        if (fileError) throw fileError;
      }

      toast({
        title: "Success",
        description: "Your pitch has been submitted successfully",
      });
      
      navigate('/dashboard');
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