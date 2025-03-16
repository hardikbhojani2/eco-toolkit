
import { useState, useRef } from 'react';
import { ReverseImageResult } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const ReverseImageSearch = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ReverseImageResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Reset results
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.match('image.*')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive",
        });
        return;
      }
      
      setImage(file);
      
      // Preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Reset results
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      toast({
        title: "Image is required",
        description: "Please upload an image to search.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);
    
    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // Mock result
      const mockResult: ReverseImageResult = {
        imageUrl: imagePreview!,
        matches: [
          {
            url: "https://example.com/image1",
            similarity: 92,
            source: "Example Site"
          },
          {
            url: "https://example.org/image2",
            similarity: 85,
            source: "Example Org"
          },
          {
            url: "https://example.net/image3",
            similarity: 78,
            source: "Example Net"
          }
        ]
      };
      
      setResult(mockResult);
      setIsSearching(false);
      
      toast({
        title: "Search Complete",
        description: `Found ${mockResult.matches.length} similar images.`,
      });
    }, 3000);
  };

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="glass-panel p-6 mb-6">
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
                  setImage(null);
                  setImagePreview(null);
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
        
        {isSearching ? (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-muted-foreground">
              Searching... {progress}%
            </p>
          </div>
        ) : (
          <Button 
            type="submit" 
            className="w-full"
            disabled={!image}
          >
            Search Image
          </Button>
        )}
      </form>
      
      {result && (
        <div className="glass-panel p-6 animate-scale-in">
          <h3 className="text-xl font-medium mb-4">Found Similar Images</h3>
          
          <div className="space-y-4">
            {result.matches.map((match, index) => (
              <a 
                key={index}
                href={match.url}
                target="_blank"
                rel="noopener noreferrer" 
                className="block p-4 bg-white/50 dark:bg-black/30 rounded-lg hover:bg-white/70 dark:hover:bg-black/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{match.source}</span>
                  <span className="text-sm">{match.similarity}% match</span>
                </div>
                <p className="text-sm text-muted-foreground">{match.url}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReverseImageSearch;
