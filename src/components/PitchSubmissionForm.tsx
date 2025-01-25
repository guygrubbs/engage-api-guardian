import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { FileUpload } from "./FileUpload";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader, Upload } from "lucide-react";

interface PitchSubmissionFormData {
  companyName: string;
  companyDescription: string;
  fundingGoal: string;
  industry: string;
  stage: string;
  teamSize: string;
  websiteUrl: string;
}

export const PitchSubmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string; type: string; size: number }>>([]);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<PitchSubmissionFormData>();

  const onSubmit = async (data: PitchSubmissionFormData) => {
    try {
      setIsSubmitting(true);

      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to submit a pitch",
          variant: "destructive",
        });
        return;
      }
      
      // Insert pitch data
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
          user_id: user.id // Add the user_id here
        })
        .select()
        .single();

      if (pitchError) throw pitchError;

      // Insert file records
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

      toast({
        title: "Success!",
        description: "Your pitch has been submitted successfully.",
      });
      
      // Redirect or clear form
      navigate('/');
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

        <div>
          <Label>Upload Files</Label>
          <FileUpload
            onUploadComplete={(files) => setUploadedFiles(prev => [...prev, ...files])}
          />
          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Uploaded Files:</h4>
              <ul className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
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