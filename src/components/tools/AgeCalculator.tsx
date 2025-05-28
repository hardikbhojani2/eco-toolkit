
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { differenceInYears, differenceInMonths, differenceInDays, isValid } from 'date-fns';

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
    <div className="animate-fade-in w-full max-w-4xl mx-auto">
      {/* SEO Content Section */}
      <div className="glass-panel p-6 mb-6">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Free Online Age Calculator</h2>
          <p className="text-muted-foreground mb-4">
            Calculate your exact age in years, months, and days with our precise age calculator. Whether you need to know 
            your age for official documents, birthday planning, or simple curiosity, our tool provides accurate calculations 
            instantly. Perfect for determining age differences, planning events, or calculating milestones.
          </p>
          
          <h3 className="text-xl font-medium mb-3">What You Can Calculate:</h3>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
            <li>Exact age in years, months, and days</li>
            <li>Total number of days lived</li>
            <li>Age between any two dates</li>
            <li>Time until next birthday</li>
            <li>Age at specific future or past dates</li>
            <li>Precise calculations accounting for leap years</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">Common Use Cases:</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium mb-2">Personal Use:</h4>
              <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-1">
                <li>Calculate your exact current age</li>
                <li>Plan milestone birthdays and celebrations</li>
                <li>Track personal achievements and goals</li>
                <li>Calculate age for dating profiles</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Professional Use:</h4>
              <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-1">
                <li>HR documentation and employee records</li>
                <li>Insurance applications and policies</li>
                <li>Legal documents requiring exact age</li>
                <li>Medical records and healthcare forms</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Tip:</strong> Our age calculator accounts for leap years and varying month lengths, 
              ensuring the most accurate results possible. All calculations are performed in your browser for privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Tool Interface */}
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
        <div className="glass-panel p-6 animate-scale-in mb-6">
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

      {/* Related Tools Section */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-medium mb-4">Related Calculator Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/tools/percentage-calculator" className="p-4 bg-white/50 dark:bg-black/30 rounded-lg hover:bg-white/70 dark:hover:bg-black/40 transition-colors">
            <h4 className="font-medium mb-2">Percentage Calculator</h4>
            <p className="text-sm text-muted-foreground">Calculate percentages, increases, and decreases</p>
          </Link>
          <Link to="/tools/emi-calculator" className="p-4 bg-white/50 dark:bg-black/30 rounded-lg hover:bg-white/70 dark:hover:bg-black/40 transition-colors">
            <h4 className="font-medium mb-2">EMI Calculator</h4>
            <p className="text-sm text-muted-foreground">Calculate loan EMIs and payment schedules</p>
          </Link>
          <Link to="/tools/profit-loss-calculator" className="p-4 bg-white/50 dark:bg-black/30 rounded-lg hover:bg-white/70 dark:hover:bg-black/40 transition-colors">
            <h4 className="font-medium mb-2">Profit Loss Calculator</h4>
            <p className="text-sm text-muted-foreground">Calculate business profit and loss</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
