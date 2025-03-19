
import { useState } from 'react';
import { ReverseImageResult } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ImageDropzone from './ReverseImage/ImageDropzone';
import SearchProgress from './ReverseImage/SearchProgress';
import SearchResults from './ReverseImage/SearchResults';

const ReverseImageSearch = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ReverseImageResult | null>(null);
  const { toast } = useToast();

  const handleImageChange = (file: File | null, preview: string | null) => {
    setImage(file);
    setImagePreview(preview);
    
    // Reset results
    setResult(null);
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
        <ImageDropzone 
          image={image}
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
        />
        
        {isSearching ? (
          <SearchProgress progress={progress} />
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
      
      {result && <SearchResults result={result} />}
    </div>
  );
};

export default ReverseImageSearch;
