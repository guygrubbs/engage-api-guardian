
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface DocumentsStepProps {
  files: {
    pitchDeck: File | null;
    additionalDocs: File[];
  };
  onChange: (files: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DocumentsStep = ({ files, onChange, onNext, onBack }: DocumentsStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Upload Documents</h2>
      
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Documents will be processed using our AI pipeline to generate comprehensive reports.
          Supported formats: PDF, DOCX (max 10MB per file)
        </AlertDescription>
      </Alert>
      
      <div className="space-y-6">
        <div>
          <Label className="mb-2 block">Pitch Deck (Required)</Label>
          <p className="text-sm text-muted-foreground mb-4">Upload your pitch deck presentation</p>
          <FileUpload
            onUploadComplete={(uploadedFiles) => {
              if (uploadedFiles.length > 0) {
                onChange({
                  ...files,
                  pitchDeck: uploadedFiles[0]
                });
              }
            }}
          />
        </div>

        <div>
          <Label className="mb-2 block">Additional Documents (Optional)</Label>
          <p className="text-sm text-muted-foreground mb-4">
            Financial statements, market research, or other supporting documents
          </p>
          <FileUpload
            onUploadComplete={(uploadedFiles) => {
              onChange({
                ...files,
                additionalDocs: [...files.additionalDocs, ...uploadedFiles]
              });
            }}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};
