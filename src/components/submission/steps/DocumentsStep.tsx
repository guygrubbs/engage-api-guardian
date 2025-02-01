import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
      
      <div className="space-y-6">
        <div>
          <Label className="mb-2 block">Pitch Deck (Required)</Label>
          <p className="text-sm text-muted-foreground mb-4">PDF or PPT up to 10MB</p>
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
          <Label className="mb-2 block">Financial Documents (Optional)</Label>
          <p className="text-sm text-muted-foreground mb-4">PDF, Excel, or CSV up to 10MB</p>
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