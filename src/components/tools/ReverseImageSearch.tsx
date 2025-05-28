
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="animate-fade-in w-full max-w-4xl mx-auto">
      {/* SEO Content Section */}
      <div className="glass-panel p-6 mb-6">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Free Reverse Image Search Tool</h2>
          <p className="text-muted-foreground mb-4">
            Find the source, identify objects, or discover similar images using our advanced reverse image search engine. 
            Upload any image and get instant results from across the web, including social media platforms, stock photo sites, 
            and image databases worldwide.
          </p>
          
          <h3 className="text-xl font-medium mb-3">How Reverse Image Search Works:</h3>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
            <li>Upload an image or drag and drop from your device</li>
            <li>Our AI analyzes the visual content and patterns</li>
            <li>Search across billions of indexed images on the web</li>
            <li>Get results showing similar or identical images</li>
            <li>Find original sources and higher resolution versions</li>
            <li>Identify products, people, places, and objects in images</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">Use Cases for Reverse Image Search:</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium mb-2">For Content Creators:</h4>
              <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-1">
                <li>Verify image originality and avoid copyright issues</li>
                <li>Find high-resolution versions of images</li>
                <li>Track unauthorized use of your images</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">For Research & Verification:</h4>
              <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-1">
                <li>Fact-check images and verify authenticity</li>
                <li>Find the original source of viral images</li>
                <li>Identify fake or manipulated images</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Interface */}
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

      {/* Related Tools Section */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-medium mb-4">Related Image & Media Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/tools/qr-code-generator" className="p-4 bg-white/50 dark:bg-black/30 rounded-lg hover:bg-white/70 dark:hover:bg-black/40 transition-colors">
            <h4 className="font-medium mb-2">QR Code Generator</h4>
            <p className="text-sm text-muted-foreground">Create custom QR codes for any content</p>
          </Link>
          <Link to="/tools/video-downloader" className="p-4 bg-white/50 dark:bg-black/30 rounded-lg hover:bg-white/70 dark:hover:bg-black/40 transition-colors">
            <h4 className="font-medium mb-2">Video Downloader</h4>
            <p className="text-sm text-muted-foreground">Download videos from popular platforms</p>
          </Link>
          <Link to="/tools/plagiarism-checker" className="p-4 bg-white/50 dark:bg-black/30 rounded-lg hover:bg-white/70 dark:hover:bg-black/40 transition-colors">
            <h4 className="font-medium mb-2">Plagiarism Checker</h4>
            <p className="text-sm text-muted-foreground">Check content originality and detect copied text</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReverseImageSearch;
