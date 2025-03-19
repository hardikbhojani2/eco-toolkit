
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(10);
  const [loanTenure, setLoanTenure] = useState<number>(12);
  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  
  const { toast } = useToast();

  const calculateEMI = () => {
    if (loanAmount <= 0 || interestRate <= 0 || loanTenure <= 0) {
      toast({
        title: "Invalid input",
        description: "Please enter valid values for loan amount, interest rate, and tenure",
        variant: "destructive",
      });
      return;
    }
    
    // Convert interest rate from annual to monthly rate
    const monthlyRate = interestRate / 12 / 100;
    
    // Calculate EMI using the formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    const emiValue = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTenure) / (Math.pow(1 + monthlyRate, loanTenure) - 1);
    
    const totalAmountValue = emiValue * loanTenure;
    const totalInterestValue = totalAmountValue - loanAmount;
    
    setEmi(Math.round(emiValue));
    setTotalInterest(Math.round(totalInterestValue));
    setTotalAmount(Math.round(totalAmountValue));
    
    toast({
      title: "EMI calculated successfully",
      description: `Your monthly EMI is ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Math.round(emiValue))}`,
    });
  };

  return (
    <div className="animate-fade-in w-full max-w-xl mx-auto">
      <div className="glass-panel p-6 mb-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="loan-amount" className="mb-1 block">Loan Amount (₹)</Label>
            <Input
              id="loan-amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
              min="0"
              className="mb-2 bg-white/50 dark:bg-black/30"
            />
            <Slider 
              value={[loanAmount]} 
              min={10000} 
              max={10000000} 
              step={10000} 
              onValueChange={(vals) => setLoanAmount(vals[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>₹10,000</span>
              <span>₹1,00,00,000</span>
            </div>
          </div>
          
          <div>
            <Label htmlFor="interest-rate" className="mb-1 block">Interest Rate (% per annum)</Label>
            <Input
              id="interest-rate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              min="0"
              step="0.1"
              className="mb-2 bg-white/50 dark:bg-black/30"
            />
            <Slider 
              value={[interestRate]} 
              min={1} 
              max={36} 
              step={0.1} 
              onValueChange={(vals) => setInterestRate(vals[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1%</span>
              <span>36%</span>
            </div>
          </div>
          
          <div>
            <Label htmlFor="loan-tenure" className="mb-1 block">Loan Tenure (months)</Label>
            <Input
              id="loan-tenure"
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(parseInt(e.target.value))}
              min="1"
              className="mb-2 bg-white/50 dark:bg-black/30"
            />
            <Slider 
              value={[loanTenure]} 
              min={1} 
              max={360} 
              step={1} 
              onValueChange={(vals) => setLoanTenure(vals[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1 month</span>
              <span>30 years</span>
            </div>
          </div>
          
          <Button 
            onClick={calculateEMI} 
            className="w-full"
          >
            Calculate EMI
          </Button>
        </div>
      </div>
      
      {emi !== null && (
        <div className="glass-panel p-6 animate-scale-in">
          <h3 className="text-xl font-medium mb-4">EMI Results</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Monthly EMI</p>
              <p className="text-2xl font-bold">₹{emi.toLocaleString('en-IN')}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-xl font-bold">₹{totalInterest?.toLocaleString('en-IN')}</p>
              </div>
              
              <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-xl font-bold">₹{totalAmount?.toLocaleString('en-IN')}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500" 
                  style={{ width: `${loanAmount / (totalAmount || 1) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Principal: ₹{loanAmount.toLocaleString('en-IN')}</span>
                <span>Interest: ₹{totalInterest?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMICalculator;
