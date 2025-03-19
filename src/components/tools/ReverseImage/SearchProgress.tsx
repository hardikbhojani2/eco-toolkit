
import { Progress } from '@/components/ui/progress';

interface SearchProgressProps {
  progress: number;
}

const SearchProgress = ({ progress }: SearchProgressProps) => {
  return (
    <div className="space-y-2">
      <Progress value={progress} className="h-2" />
      <p className="text-sm text-center text-muted-foreground">
        Searching... {progress}%
      </p>
    </div>
  );
};

export default SearchProgress;
