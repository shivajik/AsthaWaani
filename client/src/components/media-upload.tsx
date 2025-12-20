import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface MediaUploadProps {
  onUploadSuccess?: (mediaUrl: string, mediaId: string) => void;
  onUploadError?: (error: string) => void;
}

export function MediaUpload({ onUploadSuccess, onUploadError }: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useState<HTMLInputElement | null>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      const error = "Please select an image file";
      onUploadError?.(error);
      toast({ variant: "destructive", title: "Error", description: error });
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/cms/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const media = await response.json();
      toast({ title: "Success", description: "Image uploaded successfully" });
      onUploadSuccess?.(media.secureUrl, media.id);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Upload failed";
      onUploadError?.(errorMsg);
      toast({ variant: "destructive", title: "Error", description: errorMsg });
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex items-center justify-center w-full"
    >
      <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-border rounded-lg p-8 cursor-pointer hover:bg-muted/50 transition-colors"
        data-testid="upload-area"
      >
        <div className="flex flex-col items-center justify-center">
          <Upload className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium text-center">
            Drag and drop your image here, or click to select
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleInputChange}
          disabled={isUploading}
          data-testid="file-input"
        />
      </label>
    </div>
  );
}
