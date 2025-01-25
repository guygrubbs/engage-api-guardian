import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { FileUpload } from "./FileUpload";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader, Upload } from "lucide-react";
import { PitchFormFields } from "./pitch/PitchFormFields";
import { UploadedFilesList } from "./pitch/UploadedFilesList";
import { PitchSubmissionFormData, UploadedFile } from "@/types/pitch";

export const PitchSubmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<PitchSubmissionFormData>();

  const onSubmit = async (data: PitchSubmissionFormData) => {
    try {
      setIsSubmitting(true);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to submit a pitch",
          variant: "destructive",
        });
        return;
      }
      
      const { data: pitch, error: pitchError } = await supabase
        .from('pitches')
        .insert({
          company_name: data.companyName,
          company_description: data.companyDescription,
          funding_goal: parseFloat(data.fundingGoal),
          industry: data.industry,
          stage: data.stage,
          team_size: parseInt(data.teamSize),
          website_url: data.websiteUrl,
          status: 'draft',
          user_id: user.id
        })
        .select()
        .single();

      if (pitchError) throw pitchError;

      if (uploadedFiles.length > 0) {
        const { error: filesError } = await supabase
          .from('pitch_files')
          .insert(
            uploadedFiles.map(file => ({
              pitch_id: pitch.id,
              file_name: file.name,
              file_url: file.url,
              file_type: file.type,
              file_size: file.size
            }))
          );

        if (filesError) throw filesError;
      }

      // Generate reports after pitch submission
      const { error: generateError } = await supabase.functions.invoke('generate-report', {
        body: { pitchId: pitch.id }
      });

      if (generateError) {
        console.error('Error generating reports:', generateError);
        toast({
          title: "Warning",
          description: "Pitch submitted but there was an error generating reports. Our team will review and generate them manually.",
          variant: "default",
        });
      } else {
        toast({
          title: "Success!",
          description: "Your pitch has been submitted and reports have been generated.",
        });
      }
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit pitch. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <PitchFormFields register={register} errors={errors} />
      
      <div>
        <FileUpload
          onUploadComplete={(files) => setUploadedFiles(prev => [...prev, ...files])}
        />
        <UploadedFilesList files={uploadedFiles} />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Submit Pitch
          </>
        )}
      </Button>
    </form>
  );
};