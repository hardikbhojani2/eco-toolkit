
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL is required",
        description: "Please enter a valid video URL.",
        variant: "destructive",
      });
      return;
    }

    // Simple URL validation
    if (!url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com).+/)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube, Vimeo, or Dailymotion URL.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setVideoInfo(null);
    
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
      
      // Mock video info
      const mockVideoInfo = {
        title: "Sample Video Title",
        duration: "10:25",
        thumbnail: "https://picsum.photos/seed/sample/640/360",
        formats: [
          { quality: "1080p", format: "mp4", size: "85.2 MB" },
          { quality: "720p", format: "mp4", size: "45.7 MB" },
          { quality: "480p", format: "mp4", size: "25.3 MB" },
          { quality: "360p", format: "mp4", size: "15.1 MB" },
        ]
      };
      
      setVideoInfo(mockVideoInfo);
      setIsProcessing(false);
      
      toast({
        title: "Video Found",
        description: "Select a format to download.",
      });
    }, 3000);
  };

  const handleDownload = (format: any) => {
    setIsDownloading(true);
    
    // Simulate download progress
    let downloadProgress = 0;
    const interval = setInterval(() => {
      downloadProgress += 5;
      setProgress(downloadProgress);
      
      if (downloadProgress >= 100) {
        clearInterval(interval);
        setIsDownloading(false);
        
        toast({
          title: "Download Complete",
          description: `${videoInfo.title} has been downloaded.`,
        });
      }
    }, 300);
    
    // In a real app, this would initiate the actual download
    toast({
      title: "Download Started",
      description: `Downloading ${videoInfo.title} in ${format.quality}...`,
    });
  };

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="glass-panel p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube, Vimeo or Dailymotion URL here..."
            className="flex-1 bg-white/50 dark:bg-black/30 border-0 focus-visible:ring-1 focus-visible:ring-ring transition-all"
          />
          
          <Button 
            type="submit" 
            disabled={isProcessing || !url.trim()}
          >
            {isProcessing ? "Processing..." : "Analyze"}
          </Button>
        </div>
        
        {isProcessing && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-muted-foreground">
              Analyzing video... {progress}%
            </p>
          </div>
        )}
      </form>
      
      {videoInfo && (
        <div className="glass-panel p-6 animate-scale-in">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/3">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={videoInfo.thumbnail} 
                  alt={videoInfo.title} 
                  className="w-full h-auto object-cover aspect-video"
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-xl font-medium mb-1">{videoInfo.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">Duration: {videoInfo.duration}</p>
              
              <h4 className="text-lg font-medium mb-2">Available Formats</h4>
              
              {isDownloading ? (
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-center text-muted-foreground">
                    Downloading... {progress}%
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {videoInfo.formats.map((format: any, index: number) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-between py-6 px-4 bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/40 border-0 transition-colors"
                      onClick={() => handleDownload(format)}
                    >
                      <span className="flex flex-col items-start">
                        <span className="font-medium">{format.quality}</span>
                        <span className="text-xs text-muted-foreground">{format.format} • {format.size}</span>
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </Button>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-muted-foreground mt-4">
                Note: This tool is for educational purposes only. Please respect copyright laws and terms of service of the source websites.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDownloader;
