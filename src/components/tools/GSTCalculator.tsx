
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const GSTCalculator = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [calculationType, setCalculationType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [result, setResult] = useState<{
    originalAmount: number;
    gstAmount: number;
    totalAmount: number;
  } | null>(null);
  
  const { toast } = useToast();
  
  const commonGstRates = [5, 12, 18, 28];

  const calculateGST = () => {
    if (amount <= 0 || gstRate < 0) {
      toast({
        title: "Invalid input",
        description: "Please enter valid values for amount and GST rate",
        variant: "destructive",
      });
      return;
    }
    
    let originalAmount: number;
    let gstAmount: number;
    let totalAmount: number;
    
    if (calculationType === 'exclusive') {
      // GST Exclusive: Add GST to amount
      originalAmount = amount;
      gstAmount = originalAmount * (gstRate / 100);
      totalAmount = originalAmount + gstAmount;
    } else {
      // GST Inclusive: Extract GST from amount
      totalAmount = amount;
      originalAmount = totalAmount * (100 / (100 + gstRate));
      gstAmount = totalAmount - originalAmount;
    }
    
    setResult({
      originalAmount: Math.round(originalAmount * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100
    });
    
    toast({
      title: "GST calculated successfully",
      description: calculationType === 'exclusive' 
        ? `Total amount with GST is ₹${totalAmount.toFixed(2)}` 
        : `Original amount without GST is ₹${originalAmount.toFixed(2)}`
    });
  };

  return (
    <div className="animate-fade-in w-full max-w-xl mx-auto">
      <div className="glass-panel p-6 mb-6">
        <Tabs value={calculationType} onValueChange={(v) => setCalculationType(v as 'exclusive' | 'inclusive')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="exclusive">Add GST (Exclusive)</TabsTrigger>
            <TabsTrigger value="inclusive">Extract GST (Inclusive)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="exclusive">
            <p className="text-sm text-muted-foreground mb-4">
              Calculate the final amount after adding GST to your original amount
            </p>
          </TabsContent>
          
          <TabsContent value="inclusive">
            <p className="text-sm text-muted-foreground mb-4">
              Extract the original amount and GST amount from a GST-inclusive total
            </p>
          </TabsContent>
        </Tabs>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount" className="mb-1 block">
              {calculationType === 'exclusive' ? 'Original Amount (₹)' : 'Total Amount with GST (₹)'}
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              min="0"
              step="0.01"
              className="bg-white/50 dark:bg-black/30"
            />
          </div>
          
          <div>
            <Label htmlFor="gst-rate" className="mb-1 block">GST Rate (%)</Label>
            <Input
              id="gst-rate"
              type="number"
              value={gstRate}
              onChange={(e) => setGstRate(parseFloat(e.target.value))}
              min="0"
              step="0.1"
              className="bg-white/50 dark:bg-black/30 mb-2"
            />
            
            <div className="flex flex-wrap gap-2 mt-2">
              {commonGstRates.map((rate) => (
                <Button
                  key={rate}
                  variant={gstRate === rate ? "default" : "outline"}
                  size="sm"
                  onClick={() => setGstRate(rate)}
                >
                  {rate}%
                </Button>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={calculateGST} 
            className="w-full mt-2"
          >
            Calculate GST
          </Button>
        </div>
      </div>
      
      {result && (
        <div className="glass-panel p-6 animate-scale-in">
          <h3 className="text-xl font-medium mb-4">GST Calculation Results</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">{calculationType === 'exclusive' ? 'Original Amount' : 'Amount (excluding GST)'}</p>
              <p className="text-2xl font-bold">₹{result.originalAmount.toFixed(2)}</p>
            </div>
            
            <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">GST Amount ({gstRate}%)</p>
              <p className="text-2xl font-bold">₹{result.gstAmount.toFixed(2)}</p>
            </div>
            
            <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Amount (including GST)</p>
              <p className="text-2xl font-bold">₹{result.totalAmount.toFixed(2)}</p>
            </div>
            
            <div className="mt-2">
              <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${(result.originalAmount / result.totalAmount) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Base: ₹{result.originalAmount.toFixed(2)} ({Math.round((result.originalAmount / result.totalAmount) * 100)}%)</span>
                <span>GST: ₹{result.gstAmount.toFixed(2)} ({Math.round((result.gstAmount / result.totalAmount) * 100)}%)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GSTCalculator;
