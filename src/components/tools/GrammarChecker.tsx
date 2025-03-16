
import { useState } from 'react';
import { GrammarResult } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const GrammarChecker = () => {
  const [text, setText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<GrammarResult | null>(null);
  const [correctedText, setCorrectedText] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: "Text is required",
        description: "Please enter some text to check.",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    setProgress(0);
    setResult(null);
    setCorrectedText('');
    
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
      
      // Mock grammar errors
      const mockErrors = [
        {
          type: 'grammar' as const,
          message: "Subject-verb agreement error",
          offset: Math.floor(Math.random() * Math.min(50, text.length)),
          length: 5,
          suggestions: ["are", "were", "have been"]
        },
        {
          type: 'spelling' as const,
          message: "Possible spelling mistake",
          offset: Math.floor(Math.random() * Math.min(100, text.length)) + 60,
          length: 8,
          suggestions: ["correctly", "correction", "correctly spelled"]
        },
        {
          type: 'punctuation' as const,
          message: "Missing comma in compound sentence",
          offset: Math.floor(Math.random() * Math.min(150, text.length)) + 120,
          length: 2,
          suggestions: [", and", "; and", ", but"]
        }
      ].filter(error => error.offset + error.length < text.length);
      
      const mockResult: GrammarResult = {
        text,
        errors: mockErrors
      };
      
      setResult(mockResult);
      setCorrectedText(text);
      setIsChecking(false);
      
      toast({
        title: "Check Complete",
        description: `Found ${mockErrors.length} potential issues.`,
      });
    }, 3000);
  };
  
  const handleApplySuggestion = (errorIndex: number, suggestion: string) => {
    if (!result) return;
    
    const error = result.errors[errorIndex];
    const before = correctedText.substring(0, error.offset);
    const after = correctedText.substring(error.offset + error.length);
    const newText = before + suggestion + after;
    
    setCorrectedText(newText);
    
    // Clone and update the result to mark this error as fixed
    const updatedErrors = [...result.errors];
    updatedErrors.splice(errorIndex, 1);
    
    setResult({
      ...result,
      errors: updatedErrors
    });
    
    toast({
      title: "Correction Applied",
      description: `Changed "${correctedText.substring(error.offset, error.offset + error.length)}" to "${suggestion}"`,
    });
  };

  // Helper function to get color for error type
  const getErrorColor = (type: string) => {
    switch (type) {
      case 'grammar':
        return 'text-blue-500 border-blue-300 bg-blue-50 dark:bg-blue-900/20';
      case 'spelling':
        return 'text-red-500 border-red-300 bg-red-50 dark:bg-red-900/20';
      case 'punctuation':
        return 'text-amber-500 border-amber-300 bg-amber-50 dark:bg-amber-900/20';
      default:
        return 'text-gray-500 border-gray-300 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="glass-panel p-6 mb-6">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to check for grammar, spelling, and punctuation errors..."
          className="min-h-[200px] mb-4 bg-white/50 dark:bg-black/30 border-0 focus-visible:ring-1 focus-visible:ring-ring transition-all"
        />
        
        {isChecking ? (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-muted-foreground">
              Checking grammar and spelling... {progress}%
            </p>
          </div>
        ) : (
          <Button 
            type="submit" 
            className="w-full"
            disabled={!text.trim()}
          >
            Check Grammar
          </Button>
        )}
      </form>
      
      {result && result.errors.length > 0 && (
        <div className="glass-panel p-6 animate-scale-in">
          <h3 className="text-xl font-medium mb-4">Grammar Check Results</h3>
          
          <div className="mb-6">
            <div className="p-4 bg-white/50 dark:bg-black/30 rounded-lg">
              {correctedText.split('').map((char, index) => {
                const error = result.errors.find(e => 
                  index >= e.offset && index < e.offset + e.length
                );
                
                if (error) {
                  return (
                    <Popover key={index}>
                      <PopoverTrigger asChild>
                        <span 
                          className={`border-b-2 cursor-pointer ${getErrorColor(error.type)}`}
                        >
                          {char}
                        </span>
                      </PopoverTrigger>
                      <PopoverContent className="w-72">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">{error.message}</p>
                          <div className="grid gap-1">
                            {error.suggestions.map((suggestion, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                className="justify-start"
                                onClick={() => handleApplySuggestion(
                                  result.errors.indexOf(error),
                                  suggestion
                                )}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  );
                }
                
                return <span key={index}>{char}</span>;
              })}
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-lg font-medium">Summary of Issues</h4>
            
            <div className="space-y-2">
              {result.errors.map((error, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border ${getErrorColor(error.type)}`}
                >
                  <div className="flex justify-between">
                    <span className="font-medium capitalize">{error.type} Issue</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/50 dark:bg-black/30">
                      {error.suggestions.length} suggestion{error.suggestions.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{error.message}</p>
                  <div className="mt-2 text-sm bg-white/50 dark:bg-black/30 p-2 rounded">
                    <span className="font-mono">
                      ...{correctedText.substring(
                        Math.max(0, error.offset - 10),
                        error.offset
                      )}
                      <span className="underline">
                        {correctedText.substring(
                          error.offset,
                          error.offset + error.length
                        )}
                      </span>
                      {correctedText.substring(
                        error.offset + error.length,
                        error.offset + error.length + 10
                      )}...
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(correctedText);
                toast({
                  title: "Copied to clipboard",
                  description: "The corrected text has been copied to your clipboard.",
                });
              }}
            >
              Copy Corrected Text
            </Button>
          </div>
        </div>
      )}
      
      {result && result.errors.length === 0 && (
        <div className="glass-panel p-6 animate-scale-in text-center">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-xl font-medium mb-2">Perfect Grammar!</h3>
          <p className="text-muted-foreground">No grammar or spelling issues were found in your text.</p>
        </div>
      )}
    </div>
  );
};

export default GrammarChecker;
