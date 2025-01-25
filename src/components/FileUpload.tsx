import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Loader } from "lucide-react";

interface FileUploadProps {
  onUploadComplete: (files: Array<{ name: string; url: string; type: string; size: number }>) => void;
}

export const FileUpload = ({ onUploadComplete }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedFiles = [];

    try {
      for (const file of Array.from(files)) {
        if (!file.type.includes('pdf')) {
          toast({
            title: "Invalid file type",
            description: "Only PDF files are allowed",
            variant: "destructive",
          });
          continue;
        }

        const fileName = `${crypto.randomUUID()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from('pitch-files')
          .upload(`${fileName}`, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('pitch-files')
          .getPublicUrl(data.path);

        uploadedFiles.push({
          name: file.name,
          url: publicUrl,
          type: file.type,
          size: file.size,
        });
      }

      onUploadComplete(uploadedFiles);
      toast({
        title: "Success",
        description: "Files uploaded successfully",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset the input
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <Loader className="w-8 h-8 mb-4 animate-spin text-primary" />
            ) : (
              <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
            )}
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              {isUploading ? 'Uploading...' : 'Click to upload PDF files'}
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            accept=".pdf"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  );
};