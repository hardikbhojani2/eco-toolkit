
import { ReverseImageResult } from '@/lib/types';

interface SearchResultsProps {
  result: ReverseImageResult;
}

const SearchResults = ({ result }: SearchResultsProps) => {
  return (
    <div className="glass-panel p-6 animate-scale-in">
      <h3 className="text-xl font-medium mb-4">Found Similar Images</h3>
      
      <div className="space-y-4">
        {result.matches.map((match, index) => (
          <a 
            key={index}
            href={match.url}
            target="_blank"
            rel="noopener noreferrer" 
            className="block p-4 bg-white/50 dark:bg-black/30 rounded-lg hover:bg-white/70 dark:hover:bg-black/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">{match.source}</span>
              <span className="text-sm">{match.similarity}% match</span>
            </div>
            <p className="text-sm text-muted-foreground">{match.url}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
