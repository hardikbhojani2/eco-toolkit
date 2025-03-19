
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface ImageDropzoneProps {
  image: File | null;
  imagePreview: string | null;
  onImageChange: (file: File | null, preview: string | null) => void;
}

const ImageDropzone = ({ image, imagePreview, onImageChange }: ImageDropzoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Preview
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.match('image.*')) {
        return;
      }
      
      // Preview
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div 
      className="border-2 border-dashed rounded-xl p-8 text-center mb-4 cursor-pointer hover:bg-white/10 transition-colors"
      onClick={() => fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {imagePreview ? (
        <div className="space-y-4">
          <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-lg">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {image?.name} ({Math.round(image?.size! / 1024)} KB)
          </p>
          <Button 
            type="button" 
            variant="outline" 
            onClick={(e) => {
              e.stopPropagation();
              onImageChange(null, null);
            }}
          >
            Remove
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
              <circle cx="9" cy="9" r="2"></circle>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Drag an image here or click to select</p>
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG, GIF up to 5MB
            </p>
          </div>
        </div>
      )}
      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageDropzone;
