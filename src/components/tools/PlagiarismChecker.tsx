
import { useState } from 'react';
import { PlagiarismResult } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const PlagiarismChecker = () => {
  const [text, setText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: "Text is required",
        description: "Please enter some text to check for plagiarism.",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    setProgress(0);
    setResult(null);
    
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
      const mockResult: PlagiarismResult = {
        originalText: text,
        similarityScore: 15,
        matchedSources: [
          {
            url: "https://example.com/source1",
            similarity: 12,
            matchedText: text.substring(0, 50) + "..."
          },
          {
            url: "https://example.org/source2",
            similarity: 3,
            matchedText: text.substring(text.length - 50) + "..."
          }
        ]
      };
      
      setResult(mockResult);
      setIsChecking(false);
      
      toast({
        title: "Check Complete",
        description: `Found ${mockResult.similarityScore}% similar content.`,
      });
    }, 3000);
  };

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="glass-panel p-6 mb-6">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to check for plagiarism..."
          className="min-h-[200px] mb-4 bg-white/50 dark:bg-black/30 border-0 focus-visible:ring-1 focus-visible:ring-ring transition-all"
        />
        
        {isChecking ? (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-muted-foreground">
              Checking content... {progress}%
            </p>
          </div>
        ) : (
          <Button 
            type="submit" 
            className="w-full"
            disabled={!text.trim()}
          >
            Check for Plagiarism
          </Button>
        )}
      </form>
      
      {result && (
        <div className="glass-panel p-6 animate-scale-in">
          <h3 className="text-xl font-medium mb-2">Results</h3>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Similarity Score</span>
              <span className="text-sm font-medium">{result.similarityScore}%</span>
            </div>
            <Progress value={result.similarityScore} className="h-2" />
          </div>
          
          {result.matchedSources.length > 0 ? (
            <>
              <h4 className="text-lg font-medium mb-2">Matched Sources</h4>
              <div className="space-y-4">
                {result.matchedSources.map((source, index) => (
                  <div key={index} className="p-4 bg-white/50 dark:bg-black/30 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {source.url}
                      </a>
                      <span className="text-sm">{source.similarity}% similar</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{source.matchedText}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-muted-foreground">No plagiarism detected</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PlagiarismChecker;
