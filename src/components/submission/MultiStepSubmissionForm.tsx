import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CompanyInfoStep } from "./steps/CompanyInfoStep";
import { DocumentsStep } from "./steps/DocumentsStep";
import { BusinessInfoStep } from "./steps/BusinessInfoStep";
import { SubmissionGuidelines } from "./SubmissionGuidelines";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const MultiStepSubmissionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    industry: "",
    stage: "",
    problemStatement: "",
    solution: "",
    tractionMetrics: "",
  });
  const [files, setFiles] = useState<{ pitchDeck: File | null, additionalDocs: File[] }>({
    pitchDeck: null,
    additionalDocs: []
  });
  
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // Save form data to localStorage before redirecting
      localStorage.setItem('pendingSubmission', JSON.stringify({ formData, files }));
      navigate('/auth');
      return;
    }

    try {
      // Submit the pitch
      const { data: pitch, error: pitchError } = await supabase
        .from('pitches')
        .insert({
          company_name: formData.companyName,
          website_url: formData.website,
          industry: formData.industry,
          stage: formData.stage,
          company_description: formData.problemStatement,
          user_id: user.id,
          status: 'draft'
        })
        .select()
        .single();

      if (pitchError) throw pitchError;

      // Upload files if they exist
      if (files.pitchDeck) {
        const fileName = `${crypto.randomUUID()}-${files.pitchDeck.name}`;
        const { error: uploadError } = await supabase.storage
          .from('pitch-files')
          .upload(fileName, files.pitchDeck);

        if (uploadError) throw uploadError;

        // Link the file to the pitch
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
            formData={formData}
            onChange={setFormData}
            onNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <DocumentsStep
            files={files}
            onChange={setFiles}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <BusinessInfoStep
            formData={formData}
            onChange={setFormData}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )}
      </Card>

      <SubmissionGuidelines />
    </div>
  );
};