import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SubmissionForm } from "@/components/submission/SubmissionForm";

const SubmissionChecklist = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to submit information",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      const { error } = await supabase
        .from('submission_checklists')
        .insert({
          user_id: user.id,
          ...formData,
          status: 'submitted'
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your information has been submitted for analysis.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Company Information Submission</h1>
      
      <Alert className="mb-6">
        <AlertDescription>
          Providing more information helps us give better advice, but you can submit with any amount of information you have available. Fill in what you can, and we'll work with what you provide.
        </AlertDescription>
      </Alert>

      <SubmissionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default SubmissionChecklist;