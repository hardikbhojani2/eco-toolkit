
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { differenceInYears, differenceInMonths, differenceInDays, parse, isValid } from 'date-fns';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);
  
  const { toast } = useToast();

  const calculateAge = () => {
    const birthDateObj = new Date(birthDate);
    const toDateObj = new Date(toDate);
    
    if (!isValid(birthDateObj) || !isValid(toDateObj)) {
      toast({
        title: "Invalid date",
        description: "Please enter valid dates",
        variant: "destructive",
      });
      return;
    }
    
    if (birthDateObj > toDateObj) {
      toast({
        title: "Invalid date range",
        description: "Birth date cannot be later than the comparison date",
        variant: "destructive",
      });
      return;
    }
    
    const years = differenceInYears(toDateObj, birthDateObj);
    
    // Calculate months (after removing years)
    const dateAfterYears = new Date(birthDateObj);
    dateAfterYears.setFullYear(dateAfterYears.getFullYear() + years);
    const months = differenceInMonths(toDateObj, dateAfterYears);
    
    // Calculate remaining days (after removing years and months)
    const dateAfterMonths = new Date(dateAfterYears);
    dateAfterMonths.setMonth(dateAfterMonths.getMonth() + months);
    const days = differenceInDays(toDateObj, dateAfterMonths);
    
    // Calculate total days
    const totalDays = differenceInDays(toDateObj, birthDateObj);
    
    setAge({
      years,
      months,
      days,
      totalDays
    });
    
    toast({
      title: "Age calculated successfully",
      description: `You are ${years} years, ${months} months, and ${days} days old.`,
    });
  };

  return (
    <div className="animate-fade-in w-full max-w-xl mx-auto">
      <div className="glass-panel p-6 mb-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="birth-date">Birth Date</Label>
            <Input
              id="birth-date"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="bg-white/50 dark:bg-black/30"
            />
          </div>
          
          <div>
            <Label htmlFor="to-date">To Date (Default: Today)</Label>
            <Input
              id="to-date"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="bg-white/50 dark:bg-black/30"
            />
          </div>
          
          <Button 
            onClick={calculateAge} 
            className="w-full"
            disabled={!birthDate}
          >
            Calculate Age
          </Button>
        </div>
      </div>
      
      {age && (
        <div className="glass-panel p-6 animate-scale-in">
          <h3 className="text-xl font-medium mb-4">Age Result</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold">{age.years}</p>
              <p className="text-sm text-muted-foreground">Years</p>
            </div>
            
            <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold">{age.months}</p>
              <p className="text-sm text-muted-foreground">Months</p>
            </div>
            
            <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold">{age.days}</p>
              <p className="text-sm text-muted-foreground">Days</p>
            </div>
            
            <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold">{age.totalDays}</p>
              <p className="text-sm text-muted-foreground">Total Days</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
