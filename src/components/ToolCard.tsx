
import { Link } from 'react-router-dom';
import { Tool } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  tool: Tool;
  className?: string;
  index?: number;
}

const ToolCard = ({ tool, className, index = 0 }: ToolCardProps) => {
  return (
    <Link
      to={`/tools/${tool.route}`}
      className={cn(
        "tool-card glass-card overflow-hidden p-6 flex flex-col animate-fade-in",
        className
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div 
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
          tool.bgColor
        )}
      >
        <span className="text-white text-xl" dangerouslySetInnerHTML={{ __html: tool.icon }} />
      </div>
      
      <h3 className="text-xl font-medium mb-2">{tool.name}</h3>
      <p className="text-muted-foreground text-sm">{tool.description}</p>
    </Link>
  );
};

export default ToolCard;
