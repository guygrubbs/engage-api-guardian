import { UploadedFile } from "@/types/pitch";

interface UploadedFilesListProps {
  files: UploadedFile[];
}

export const UploadedFilesList = ({ files }: UploadedFilesListProps) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">Uploaded Files:</h4>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li key={index} className="text-sm text-muted-foreground">
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};