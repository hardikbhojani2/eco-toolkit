
import { useState } from 'react';
import { ParaphraseResult } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ParaphrasingTool = () => {
  const [text, setText] = useState('');
  const [style, setStyle] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ParaphraseResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: "Text is required",
        description: "Please enter some text to paraphrase.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
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
      
      // Generate paraphrased text based on selected style
      let paraphrasedText = "";
      
      if (style === 'standard') {
        paraphrasedText = `I've transformed the input text while preserving its meaning. The content retains its original essence but uses alternative vocabulary and structure. This balanced approach ensures clarity while providing sufficient variation from the source.`;
      } else if (style === 'academic') {
        paraphrasedText = `The provided textual content has been methodically restructured to maintain semantic equivalence while enhancing lexical diversity. The transformation process has prioritized terminological precision and syntactic complexity appropriate for scholarly discourse.`;
      } else if (style === 'simple') {
        paraphrasedText = `I changed the text to make it easier to understand. I used simpler words and shorter sentences. The meaning stays the same, but it's clearer now.`;
      } else if (style === 'creative') {
        paraphrasedText = `Reimagining the narrative with a fresh perspective, I've woven the same threads of meaning into a vibrant new tapestry of expression. The essence dances in different words, painting the same picture with bold, unexpected strokes of linguistic creativity.`;
      }
      
      const mockResult: ParaphraseResult = {
        originalText: text,
        paraphrasedText
      };
      
      setResult(mockResult);
      setIsProcessing(false);
      
      toast({
        title: "Paraphrasing Complete",
        description: "Your text has been paraphrased.",
      });
    }, 3000);
  };

  const paraphrasingStyles = [
    { id: 'standard', name: 'Standard', description: 'Balanced mix of originality and meaning' },
    { id: 'academic', name: 'Academic', description: 'Formal language with complex structure' },
    { id: 'simple', name: 'Simple', description: 'Easier to understand with simpler words' },
    { id: 'creative', name: 'Creative', description: 'Unique and expressive rewording' },
  ];

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="glass-panel p-6 mb-6">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to paraphrase..."
          className="min-h-[150px] mb-4 bg-white/50 dark:bg-black/30 border-0 focus-visible:ring-1 focus-visible:ring-ring transition-all"
        />
        
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Paraphrasing Style</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {paraphrasingStyles.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`text-left p-3 rounded-lg border transition-all ${
                  style === item.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border bg-white/30 dark:bg-black/20 hover:bg-white/50 dark:hover:bg-black/30'
                }`}
                onClick={() => setStyle(item.id)}
              >
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </button>
            ))}
          </div>
        </div>
        
        {isProcessing ? (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-muted-foreground">
              Paraphrasing... {progress}%
            </p>
          </div>
        ) : (
          <Button 
            type="submit" 
            className="w-full"
            disabled={!text.trim()}
          >
            Paraphrase Text
          </Button>
        )}
      </form>
      
      {result && (
        <div className="glass-panel p-6 animate-scale-in">
          <Tabs defaultValue="paraphrased">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="paraphrased">Paraphrased Text</TabsTrigger>
              <TabsTrigger value="original">Original Text</TabsTrigger>
            </TabsList>
            
            <TabsContent value="paraphrased" className="space-y-4">
              <div className="p-4 bg-white/50 dark:bg-black/30 rounded-lg">
                <p>{result.paraphrasedText}</p>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(result.paraphrasedText);
                    toast({
                      title: "Copied to clipboard",
                      description: "The paraphrased text has been copied to your clipboard.",
                    });
                  }}
                >
                  Copy to Clipboard
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="original" className="space-y-4">
              <div className="p-4 bg-white/50 dark:bg-black/30 rounded-lg">
                <p>{result.originalText}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ParaphrasingTool;
