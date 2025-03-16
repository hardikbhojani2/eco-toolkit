
import { tools } from './Index';
import Header from '@/components/Header';
import ToolCard from '@/components/ToolCard';

const ToolsListPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black text-foreground">
      <Header />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">All Tools</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our collection of eco-friendly content tools designed to help creators work more efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ToolsListPage;
