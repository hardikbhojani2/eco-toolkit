
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

// Area conversion rates to square meter (base unit)
const conversionRates = {
  // Imperial/US
  'square-foot': 0.092903,
  'square-inch': 0.00064516,
  'square-yard': 0.836127,
  'square-mile': 2589988.11,
  'acre': 4046.86,
  
  // Metric
  'square-meter': 1,
  'square-kilometer': 1000000,
  'square-centimeter': 0.0001,
  'square-millimeter': 0.000001,
  'hectare': 10000,
  
  // Indian
  'bigha': 1618.7, // This varies by region, using a common value
  'katha': 66.89,  // Also varies by region
  'marla': 25.2929,
  'kanal': 505.857,
  'gunta': 101.17,
};

type AreaUnit = keyof typeof conversionRates;

const AreaUnitCalculator = () => {
  const [inputValue, setInputValue] = useState<number>(1);
  const [inputUnit, setInputUnit] = useState<AreaUnit>('square-meter');
  const [results, setResults] = useState<Record<AreaUnit, number>>({} as Record<AreaUnit, number>);
  
  const { toast } = useToast();

  // Calculate conversions whenever input value or unit changes
  useEffect(() => {
    convertArea();
  }, [inputValue, inputUnit]);

  const convertArea = () => {
    if (isNaN(inputValue) || inputValue < 0) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }
    
    // Convert input to base unit (square meters)
    const baseValue = inputValue * conversionRates[inputUnit];
    
    // Convert base value to all other units
    const newResults = {} as Record<AreaUnit, number>;
    Object.keys(conversionRates).forEach((unit) => {
      newResults[unit as AreaUnit] = baseValue / conversionRates[unit as AreaUnit];
    });
    
    setResults(newResults);
  };

  // Group units by category for better organization
  const unitGroups = {
    "Metric": ["square-meter", "square-kilometer", "square-centimeter", "square-millimeter", "hectare"],
    "Imperial/US": ["square-foot", "square-inch", "square-yard", "square-mile", "acre"],
    "Indian": ["bigha", "katha", "marla", "kanal", "gunta"]
  };

  // Format unit name for display
  const formatUnitName = (unit: string) => {
    return unit
      .replace('-', ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto">
      <div className="glass-panel p-6 mb-6">
        <h3 className="text-xl font-medium mb-4">Convert Area Units</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="input-value">Value</Label>
            <Input
              id="input-value"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
              min="0"
              step="any"
              className="bg-white/50 dark:bg-black/30"
            />
          </div>
          
          <div>
            <Label htmlFor="input-unit">Unit</Label>
            <Select value={inputUnit} onValueChange={(value) => setInputUnit(value as AreaUnit)}>
              <SelectTrigger id="input-unit" className="bg-white/50 dark:bg-black/30">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitGroups).map(([groupName, units]) => (
                  <div key={groupName}>
                    <p className="px-2 py-1.5 text-sm font-medium text-muted-foreground">{groupName}</p>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {formatUnitName(unit)}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={convertArea} 
          className="w-full"
        >
          Convert
        </Button>
      </div>
      
      {Object.keys(results).length > 0 && (
        <div className="glass-panel p-6 animate-scale-in">
          <h3 className="text-xl font-medium mb-6">Conversion Results</h3>
          
          {Object.entries(unitGroups).map(([groupName, units]) => (
            <div key={groupName} className="mb-6">
              <h4 className="text-lg font-medium mb-3">{groupName} Units</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {units.map((unit) => (
                  <div 
                    key={unit} 
                    className={`bg-white/50 dark:bg-black/30 p-3 rounded-lg ${unit === inputUnit ? 'border-2 border-primary' : ''}`}
                  >
                    <p className="text-sm text-muted-foreground">{formatUnitName(unit)}</p>
                    <p className="text-lg font-semibold">
                      {results[unit as AreaUnit] < 0.0001 || results[unit as AreaUnit] > 999999
                        ? results[unit as AreaUnit].toExponential(4)
                        : results[unit as AreaUnit].toLocaleString('en', { 
                            maximumFractionDigits: 6,
                            minimumFractionDigits: 0
                          })
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <p className="text-xs text-muted-foreground mt-4">
            Note: Some Indian units like Bigha and Katha vary by region. These calculations use common standardized values.
          </p>
        </div>
      )}
    </div>
  );
};

export default AreaUnitCalculator;
