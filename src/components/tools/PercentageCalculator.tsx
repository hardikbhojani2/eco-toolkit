
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

type CalculationType = 'percentage' | 'increase' | 'decrease' | 'difference';

const PercentageCalculator = () => {
  const [type, setType] = useState<CalculationType>('percentage');
  const [inputs, setInputs] = useState({
    percentage: { value: 100, percent: 25 },
    increase: { value: 100, percent: 25 },
    decrease: { value: 100, percent: 25 },
    difference: { original: 100, final: 125 }
  });
  const [results, setResults] = useState<{
    percentage?: number;
    increase?: number;
    decrease?: number;
    difference?: number;
    percentageChange?: number;
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
      case 'percentage':
        // Calculate X% of Y
        const percentageResult = (inputs.percentage.value * inputs.percentage.percent) / 100;
        newResults.percentage = percentageResult;
        toast({
          title: "Calculation complete",
          description: `${inputs.percentage.percent}% of ${inputs.percentage.value} is ${percentageResult}`,
        });
        break;
        
      case 'increase':
        // Calculate X increased by Y%
        const increaseResult = inputs.increase.value * (1 + inputs.increase.percent / 100);
        newResults.increase = increaseResult;
        toast({
          title: "Calculation complete",
          description: `${inputs.increase.value} increased by ${inputs.increase.percent}% is ${increaseResult}`,
        });
        break;
        
      case 'decrease':
        // Calculate X decreased by Y%
        const decreaseResult = inputs.decrease.value * (1 - inputs.decrease.percent / 100);
        newResults.decrease = decreaseResult;
        toast({
          title: "Calculation complete",
          description: `${inputs.decrease.value} decreased by ${inputs.decrease.percent}% is ${decreaseResult}`,
        });
        break;
        
      case 'difference':
        // Calculate percentage change from X to Y
        const original = inputs.difference.original;
        const final = inputs.difference.final;
        const difference = final - original;
        const percentageChange = (difference / Math.abs(original)) * 100;
        
        newResults.difference = difference;
        newResults.percentageChange = percentageChange;
        
        const changeType = percentageChange >= 0 ? 'increase' : 'decrease';
        toast({
          title: "Calculation complete",
          description: `The percentage ${changeType} from ${original} to ${final} is ${Math.abs(percentageChange).toFixed(2)}%`,
        });
        break;
    }
    
    setResults(newResults);
  };

  return (
    <div className="animate-fade-in w-full max-w-xl mx-auto">
      <div className="glass-panel p-6 mb-6">
        <Tabs value={type} onValueChange={(v) => setType(v as CalculationType)}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
            <TabsTrigger value="percentage">Find Percentage</TabsTrigger>
            <TabsTrigger value="increase">Increase by %</TabsTrigger>
            <TabsTrigger value="decrease">Decrease by %</TabsTrigger>
            <TabsTrigger value="difference">% Difference</TabsTrigger>
          </TabsList>
          
          <TabsContent value="percentage" className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Calculate what percentage of a number is equal to another value
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="percent-input">Percentage (%)</Label>
                <Input
                  id="percent-input"
                  type="number"
                  value={inputs.percentage.percent}
                  onChange={(e) => handleInputChange('percentage', 'percent', e.target.value)}
                  className="bg-white/50 dark:bg-black/30"
                />
              </div>
              
              <div>
                <Label htmlFor="value-input">Value</Label>
                <Input
                  id="value-input"
                  type="number"
                  value={inputs.percentage.value}
                  onChange={(e) => handleInputChange('percentage', 'value', e.target.value)}
                  className="bg-white/50 dark:bg-black/30"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="increase" className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Calculate a value after a percentage increase
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="increase-value-input">Original Value</Label>
                <Input
                  id="increase-value-input"
                  type="number"
                  value={inputs.increase.value}
                  onChange={(e) => handleInputChange('increase', 'value', e.target.value)}
                  className="bg-white/50 dark:bg-black/30"
                />
              </div>
              
              <div>
                <Label htmlFor="increase-percent-input">Increase by (%)</Label>
                <Input
                  id="increase-percent-input"
                  type="number"
                  value={inputs.increase.percent}
                  onChange={(e) => handleInputChange('increase', 'percent', e.target.value)}
                  className="bg-white/50 dark:bg-black/30"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="decrease" className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Calculate a value after a percentage decrease
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="decrease-value-input">Original Value</Label>
                <Input
                  id="decrease-value-input"
                  type="number"
                  value={inputs.decrease.value}
                  onChange={(e) => handleInputChange('decrease', 'value', e.target.value)}
                  className="bg-white/50 dark:bg-black/30"
                />
              </div>
              
              <div>
                <Label htmlFor="decrease-percent-input">Decrease by (%)</Label>
                <Input
                  id="decrease-percent-input"
                  type="number"
                  value={inputs.decrease.percent}
                  onChange={(e) => handleInputChange('decrease', 'percent', e.target.value)}
                  className="bg-white/50 dark:bg-black/30"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="difference" className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Calculate the percentage difference between two values
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="original-input">Original Value</Label>
                <Input
                  id="original-input"
                  type="number"
                  value={inputs.difference.original}
                  onChange={(e) => handleInputChange('difference', 'original', e.target.value)}
                  className="bg-white/50 dark:bg-black/30"
                />
              </div>
              
              <div>
                <Label htmlFor="final-input">Final Value</Label>
                <Input
                  id="final-input"
                  type="number"
                  value={inputs.difference.final}
                  onChange={(e) => handleInputChange('difference', 'final', e.target.value)}
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
      
      {(results.percentage !== undefined || 
        results.increase !== undefined || 
        results.decrease !== undefined || 
        results.percentageChange !== undefined) && (
        <div className="glass-panel p-6 animate-scale-in">
          <h3 className="text-xl font-medium mb-4">Result</h3>
          
          {type === 'percentage' && results.percentage !== undefined && (
            <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Result</p>
              <p className="text-2xl font-bold">{results.percentage.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {inputs.percentage.percent}% of {inputs.percentage.value} is {results.percentage.toFixed(2)}
              </p>
            </div>
          )}
          
          {type === 'increase' && results.increase !== undefined && (
            <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Result after increase</p>
              <p className="text-2xl font-bold">{results.increase.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {inputs.increase.value} increased by {inputs.increase.percent}% is {results.increase.toFixed(2)}
              </p>
            </div>
          )}
          
          {type === 'decrease' && results.decrease !== undefined && (
            <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Result after decrease</p>
              <p className="text-2xl font-bold">{results.decrease.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {inputs.decrease.value} decreased by {inputs.decrease.percent}% is {results.decrease.toFixed(2)}
              </p>
            </div>
          )}
          
          {type === 'difference' && results.percentageChange !== undefined && (
            <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Percentage Change</p>
              <p className="text-2xl font-bold">{Math.abs(results.percentageChange).toFixed(2)}%</p>
              <p className="text-sm text-muted-foreground mt-2">
                Change from {inputs.difference.original} to {inputs.difference.final} is{' '}
                {results.percentageChange >= 0 ? 'an increase' : 'a decrease'} of {Math.abs(results.percentageChange).toFixed(2)}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Absolute difference: {Math.abs(results.difference || 0).toFixed(2)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PercentageCalculator;
