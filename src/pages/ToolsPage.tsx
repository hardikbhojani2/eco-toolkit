
import { useParams } from 'react-router-dom';
import { tools } from './Index';
import Header from '@/components/Header';
import PlagiarismChecker from '@/components/tools/PlagiarismChecker';
import ReverseImageSearch from '@/components/tools/ReverseImageSearch';
import VideoDownloader from '@/components/tools/VideoDownloader';
import ParaphrasingTool from '@/components/tools/ParaphrasingTool';
import AIDetector from '@/components/tools/AIDetector';
import GrammarChecker from '@/components/tools/GrammarChecker';
import AgeCalculator from '@/components/tools/AgeCalculator';
import EMICalculator from '@/components/tools/EMICalculator';
import GSTCalculator from '@/components/tools/GSTCalculator';
import QRCodeGenerator from '@/components/tools/QRCodeGenerator';
import PercentageCalculator from '@/components/tools/PercentageCalculator';
import ProfitLossCalculator from '@/components/tools/ProfitLossCalculator';
import AreaUnitCalculator from '@/components/tools/AreaUnitCalculator';
import NotFound from '@/pages/NotFound';

const ToolsPage = () => {
  const { toolRoute } = useParams();
  
  // Find the tool from our tools array
  const currentTool = tools.find(tool => tool.route === toolRoute);
  
  // Render the component based on the tool route
  const renderToolComponent = () => {
    switch (toolRoute) {
      case 'plagiarism-checker':
        return <PlagiarismChecker />;
      case 'reverse-image-search':
        return <ReverseImageSearch />;
      case 'video-downloader':
        return <VideoDownloader />;
      case 'paraphrasing-tool':
        return <ParaphrasingTool />;
      case 'ai-detector':
        return <AIDetector />;
      case 'grammar-checker':
        return <GrammarChecker />;
      case 'age-calculator':
        return <AgeCalculator />;
      case 'emi-calculator':
        return <EMICalculator />;
      case 'gst-calculator':
        return <GSTCalculator />;
      case 'qr-code-generator':
        return <QRCodeGenerator />;
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'profit-loss-calculator':
        return <ProfitLossCalculator />;
      case 'area-unit-calculator':
        return <AreaUnitCalculator />;
      default:
        return <NotFound />;
    }
  };
  
  if (!currentTool) {
    return <NotFound />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black text-foreground">
      <Header />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{currentTool.name}</h1>
            <p className="text-muted-foreground">{currentTool.description}</p>
          </div>
          
          {renderToolComponent()}
        </div>
      </main>
    </div>
  );
};

export default ToolsPage;
