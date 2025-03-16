
import { useState } from 'react';
import { AIDetectionResult } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const AIDetector = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AIDetectionResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: "Text is required",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
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
      
      // Calculate mock score based on text length and patterns
      const randomBase = Math.random() * 0.3;
      
      // More complex text tends to seem more AI-generated
      const complexityFactor = text.length > 200 ? 0.3 : 0.1;
      
      // Random factor to add variability
      const randomFactor = Math.random() * 0.2;
      
      // Combined score
      const calculatedScore = Math.min(0.95, randomBase + complexityFactor + randomFactor);
      
      const mockResult: AIDetectionResult = {
        text,
        score: parseFloat(calculatedScore.toFixed(2)),
        confidence: parseFloat((0.7 + Math.random() * 0.25).toFixed(2)),
        explanation: calculatedScore > 0.7 
          ? "The text shows characteristics typically associated with AI-generated content, including consistent tone, predictable sentence structure, and lack of personal voice."
          : "The text has some AI-like patterns but also contains elements of human writing, including varied sentence length, occasional informal language, and personal perspectives."
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: mockResult.score > 0.7 
          ? "High likelihood of AI-generated content" 
          : "Content appears to be human-written",
      });
    }, 3000);
  };

  // Helper function to determine the gauge color based on score
  const getGaugeColor = (score: number) => {
    if (score < 0.3) return "bg-green-500";
    if (score < 0.7) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  // Helper function to get text label for score
  const getScoreLabel = (score: number) => {
    if (score < 0.3) return "Likely human-written";
    if (score < 0.7) return "Possibly AI-assisted";
    return "Likely AI-generated";
  };

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="glass-panel p-6 mb-6">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text here to detect if it was written by AI..."
          className="min-h-[200px] mb-4 bg-white/50 dark:bg-black/30 border-0 focus-visible:ring-1 focus-visible:ring-ring transition-all"
        />
        
        {isAnalyzing ? (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-muted-foreground">
              Analyzing text... {progress}%
            </p>
          </div>
        ) : (
          <Button 
            type="submit" 
            className="w-full"
            disabled={!text.trim()}
          >
            Detect AI Content
          </Button>
        )}
      </form>
      
      {result && (
        <div className="glass-panel p-6 animate-scale-in">
          <h3 className="text-xl font-medium mb-6">Detection Results</h3>
          
          <div className="mb-8">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Human-written</span>
              <span className="text-sm font-medium">AI-generated</span>
            </div>
            <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full ${getGaugeColor(result.score)} transition-all duration-500`}
                style={{ width: `${result.score * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-center">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-white/50 dark:bg-black/30 rounded-full">
                {getScoreLabel(result.score)} ({(result.score * 100).toFixed(0)}% AI probability)
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium mb-2">Analysis</h4>
              <div className="p-4 bg-white/50 dark:bg-black/30 rounded-lg">
                <p className="text-sm">{result.explanation}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-2">Confidence</h4>
              <div className="p-4 bg-white/50 dark:bg-black/30 rounded-lg">
                <p className="text-sm">
                  Our system is {(result.confidence * 100).toFixed(0)}% confident in this assessment. 
                  The confidence level indicates how reliable the detection score is based on the text length and characteristics.
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-6">
            Note: AI detection is not 100% accurate. This tool provides an estimation based on text patterns and should be used as a guide only.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIDetector;
