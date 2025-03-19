
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

type CalculationType = 'profitloss' | 'margin' | 'markup';

const ProfitLossCalculator = () => {
  const [type, setType] = useState<CalculationType>('profitloss');
  const [inputs, setInputs] = useState({
    profitloss: { costPrice: 100, sellingPrice: 150 },
    margin: { costPrice: 100, marginPercent: 20 },
    markup: { costPrice: 100, markupPercent: 25 }
  });
  const [results, setResults] = useState<{
    profit?: number;
    loss?: number;
    profitLossPercent?: number;
    sellingPrice?: number;
    marginAmount?: number;
  }>({});
  
  const { toast } = useToast();

  const handleInputChange = (calculationType: CalculationType, field: string, value: string) => {
    const newInputs = { ...inputs };
    newInputs[calculationType][field] = parseFloat(value) || 0;
    setInputs(newInputs);
  };

  const calculate = () => {
    const newResults = { ...results };
    
    switch (type) {
      case 'profitloss':
        // Calculate profit/loss and percentage
        const costPrice = inputs.profitloss.costPrice;
        const sellingPrice = inputs.profitloss.sellingPrice;
        const difference = sellingPrice - costPrice;
        
        const isProfitable = difference >= 0;
        const percentChange = (Math.abs(difference) / costPrice) * 100;
        
        if (isProfitable) {
          newResults.profit = difference;
          newResults.loss = undefined;
        } else {
          newResults.profit = undefined;
          newResults.loss = Math.abs(difference);
        }
        
        newResults.profitLossPercent = percentChange;
        
        toast({
          title: "Calculation complete",
          description: isProfitable 
            ? `Profit: ${difference.toFixed(2)} (${percentChange.toFixed(2)}%)` 
            : `Loss: ${Math.abs(difference).toFixed(2)} (${percentChange.toFixed(2)}%)`,
        });
        break;
        
      case 'margin':
        // Calculate selling price from cost price and margin percentage
        const marginCostPrice = inputs.margin.costPrice;
        const marginPercent = inputs.margin.marginPercent;
        
        // Formula: SP = CP / (1 - margin%)
        const marginSellingPrice = marginCostPrice / (1 - (marginPercent / 100));
        const marginAmount = marginSellingPrice - marginCostPrice;
        
        newResults.sellingPrice = marginSellingPrice;
        newResults.marginAmount = marginAmount;
        
        toast({
          title: "Calculation complete",
          description: `Selling price for ${marginPercent}% margin is ${marginSellingPrice.toFixed(2)}`,
        });
        break;
        
      case 'markup':
        // Calculate selling price from cost price and markup percentage
        const markupCostPrice = inputs.markup.costPrice;
        const markupPercent = inputs.markup.markupPercent;
        
        // Formula: SP = CP × (1 + markup%)
        const markupSellingPrice = markupCostPrice * (1 + (markupPercent / 100));
        
        newResults.sellingPrice = markupSellingPrice;
        
        toast({
          title: "Calculation complete",
          description: `Selling price for ${markupPercent}% markup is ${markupSellingPrice.toFixed(2)}`,
        });
        break;
    }
    
    setResults(newResults);
  };

  return (
    <div className="animate-fade-in w-full max-w-xl mx-auto">
      <div className="glass-panel p-6 mb-6">
        <Tabs value={type} onValueChange={(v) => setType(v as CalculationType)}>
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="profitloss">Profit/Loss</TabsTrigger>
            <TabsTrigger value="margin">Margin</TabsTrigger>
            <TabsTrigger value="markup">Markup</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profitloss" className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Calculate profit or loss based on cost price and selling price
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cost-price-input">Cost Price (₹)</Label>
                <Input
                  id="cost-price-input"
                  type="number"
                  value={inputs.profitloss.costPrice}
                  onChange={(e) => handleInputChange('profitloss', 'costPrice', e.target.value)}
                  className="bg-white/50 dark:bg-black/30"
                />
              </div>
              
              <div>
                <Label htmlFor="selling-price-input">Selling Price (₹)</Label>
                <Input
                  id="selling-price-input"
                  type="number"
                  value={inputs.profitloss.sellingPrice}
                  onChange={(e) => handleInputChange('profitloss', 'sellingPrice', e.target.value)}
                  className="bg-white/50 dark:bg-black/30"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="margin" className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Calculate selling price based on cost price and desired profit margin
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="margin-cost-price-input">Cost Price (₹)</Label>
                <Input
                  id="margin-cost-price-input"
                  type="number"
                  value={inputs.margin.costPrice}
                  onChange={(e) => handleInputChange('margin', 'costPrice', e.target.value)}
                  className="bg-white/50 dark:bg-black/30"
                />
              </div>
              
              <div>
                <Label htmlFor="margin-percent-input">Margin (%)</Label>
                <Input
                  id="margin-percent-input"
                  type="number"
                  value={inputs.margin.marginPercent}
                  onChange={(e) => handleInputChange('margin', 'marginPercent', e.target.value)}
                  className="bg-white/50 dark:bg-black/30"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="markup" className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Calculate selling price based on cost price and markup percentage
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="markup-cost-price-input">Cost Price (₹)</Label>
                <Input
                  id="markup-cost-price-input"
                  type="number"
                  value={inputs.markup.costPrice}
                  onChange={(e) => handleInputChange('markup', 'costPrice', e.target.value)}
                  className="bg-white/50 dark:bg-black/30"
                />
              </div>
              
              <div>
                <Label htmlFor="markup-percent-input">Markup (%)</Label>
                <Input
                  id="markup-percent-input"
                  type="number"
                  value={inputs.markup.markupPercent}
                  onChange={(e) => handleInputChange('markup', 'markupPercent', e.target.value)}
                  className="bg-white/50 dark:bg-black/30"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button 
          onClick={calculate} 
          className="w-full mt-6"
        >
          Calculate
        </Button>
      </div>
      
      {(results.profit !== undefined || 
        results.loss !== undefined || 
        results.sellingPrice !== undefined) && (
        <div className="glass-panel p-6 animate-scale-in">
          <h3 className="text-xl font-medium mb-4">Result</h3>
          
          {type === 'profitloss' && (
            <div className="space-y-4">
              <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
                {results.profit !== undefined ? (
                  <>
                    <p className="text-sm text-muted-foreground">Profit</p>
                    <p className="text-2xl font-bold text-green-600">₹{results.profit.toFixed(2)}</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">Loss</p>
                    <p className="text-2xl font-bold text-red-600">₹{results.loss?.toFixed(2)}</p>
                  </>
                )}
              </div>
              
              <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Percentage</p>
                <p className="text-2xl font-bold">{results.profitLossPercent?.toFixed(2)}%</p>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Summary</p>
                <p className="text-base">
                  {results.profit !== undefined 
                    ? `You made a profit of ₹${results.profit.toFixed(2)} which is ${results.profitLossPercent?.toFixed(2)}% on your cost price.`
                    : `You incurred a loss of ₹${results.loss?.toFixed(2)} which is ${results.profitLossPercent?.toFixed(2)}% on your cost price.`
                  }
                </p>
              </div>
            </div>
          )}
          
          {type === 'margin' && results.sellingPrice !== undefined && (
            <div className="space-y-4">
              <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Selling Price</p>
                <p className="text-2xl font-bold">₹{results.sellingPrice.toFixed(2)}</p>
              </div>
              
              <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Margin Amount</p>
                <p className="text-2xl font-bold">₹{results.marginAmount?.toFixed(2)}</p>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Summary</p>
                <p className="text-base">
                  To achieve a margin of {inputs.margin.marginPercent}%, you should sell the product for ₹{results.sellingPrice.toFixed(2)}.
                  This gives you a margin of ₹{results.marginAmount?.toFixed(2)}.
                </p>
              </div>
            </div>
          )}
          
          {type === 'markup' && results.sellingPrice !== undefined && (
            <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Selling Price</p>
              <p className="text-2xl font-bold">₹{results.sellingPrice.toFixed(2)}</p>
              <p className="text-base mt-4">
                To achieve a markup of {inputs.markup.markupPercent}% on your cost price of ₹{inputs.markup.costPrice},
                you should sell the product for ₹{results.sellingPrice.toFixed(2)}.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfitLossCalculator;
