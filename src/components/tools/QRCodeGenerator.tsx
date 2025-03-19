
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// QR code generation uses a simple URL to generate QR codes via an API
const QR_API_URL = "https://api.qrserver.com/v1/create-qr-code/";

type QRInputType = 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi';

const QRCodeGenerator = () => {
  const [inputType, setInputType] = useState<QRInputType>('url');
  const [qrData, setQrData] = useState({
    url: 'https://example.com',
    text: 'Hello World',
    email: '',
    phone: '',
    sms: { number: '', message: '' },
    wifi: { ssid: '', password: '', encryption: 'WPA' }
  });
  const [qrSize, setQrSize] = useState<number>(200);
  const [qrColor, setQrColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [qrImageUrl, setQrImageUrl] = useState<string>('');
  
  const qrRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const formatQRData = (): string => {
    switch (inputType) {
      case 'url':
        return qrData.url;
      case 'text':
        return qrData.text;
      case 'email':
        return `mailto:${qrData.email}`;
      case 'phone':
        return `tel:${qrData.phone}`;
      case 'sms':
        return `smsto:${qrData.sms.number}:${qrData.sms.message}`;
      case 'wifi':
        return `WIFI:S:${qrData.wifi.ssid};T:${qrData.wifi.encryption};P:${qrData.wifi.password};;`;
      default:
        return '';
    }
  };

  const generateQRCode = () => {
    const data = formatQRData();
    if (!data) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Color values need to be without the # for the API
    const fgColor = qrColor.replace('#', '');
    const backgroundColor = bgColor.replace('#', '');
    
    // Construct the QR code URL
    const qrUrl = `${QR_API_URL}?data=${encodeURIComponent(data)}&size=${qrSize}x${qrSize}&color=${fgColor}&bgcolor=${backgroundColor}`;
    
    setQrImageUrl(qrUrl);
    
    toast({
      title: "QR Code generated",
      description: "Your QR code has been generated successfully",
    });
  };

  const downloadQRCode = () => {
    if (!qrImageUrl) {
      toast({
        title: "No QR code to download",
        description: "Please generate a QR code first",
        variant: "destructive",
      });
      return;
    }
    
    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code downloaded",
      description: "Your QR code has been downloaded successfully",
    });
  };

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <div className="glass-panel p-6">
            <Tabs value={inputType} onValueChange={(v) => setInputType(v as QRInputType)}>
              <TabsList className="grid grid-cols-3 mb-6 w-full">
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              
              <TabsContent value="url" className="space-y-4">
                <div>
                  <Label htmlFor="url-input">Website URL</Label>
                  <Input
                    id="url-input"
                    placeholder="https://example.com"
                    value={qrData.url}
                    onChange={(e) => setQrData({...qrData, url: e.target.value})}
                    className="bg-white/50 dark:bg-black/30"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="text" className="space-y-4">
                <div>
                  <Label htmlFor="text-input">Text Content</Label>
                  <Textarea
                    id="text-input"
                    placeholder="Enter your text here..."
                    value={qrData.text}
                    onChange={(e) => setQrData({...qrData, text: e.target.value})}
                    className="min-h-32 bg-white/50 dark:bg-black/30"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="phone" className="space-y-4">
                <div>
                  <Label htmlFor="phone-input">Phone Number</Label>
                  <Input
                    id="phone-input"
                    placeholder="+1234567890"
                    value={qrData.phone}
                    onChange={(e) => setQrData({...qrData, phone: e.target.value})}
                    className="bg-white/50 dark:bg-black/30"
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="border-t mt-6 pt-6">
              <h3 className="text-lg font-medium mb-4">QR Code Options</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="qr-size">QR Code Size</Label>
                  <Select value={qrSize.toString()} onValueChange={(val) => setQrSize(Number(val))}>
                    <SelectTrigger id="qr-size" className="bg-white/50 dark:bg-black/30">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">Small (100px)</SelectItem>
                      <SelectItem value="200">Medium (200px)</SelectItem>
                      <SelectItem value="300">Large (300px)</SelectItem>
                      <SelectItem value="400">Extra Large (400px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="qr-color">QR Code Color</Label>
                  <div className="flex">
                    <Input
                      id="qr-color"
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="w-12 p-1 h-10"
                    />
                    <Input
                      type="text"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="flex-1 ml-2 bg-white/50 dark:bg-black/30"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bg-color">Background Color</Label>
                  <div className="flex">
                    <Input
                      id="bg-color"
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-12 p-1 h-10"
                    />
                    <Input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 ml-2 bg-white/50 dark:bg-black/30"
                    />
                  </div>
                </div>
              </div>
              
              <Button onClick={generateQRCode} className="w-full mt-6">
                Generate QR Code
              </Button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="glass-panel p-6 h-full flex flex-col">
            <h3 className="text-lg font-medium mb-4">QR Code Preview</h3>
            
            <div ref={qrRef} className="flex-1 flex items-center justify-center p-4 bg-white/80 dark:bg-black/50 rounded-lg mb-4">
              {qrImageUrl ? (
                <img 
                  src={qrImageUrl} 
                  alt="Generated QR Code" 
                  className="max-w-full max-h-full"
                  style={{ background: bgColor }}
                />
              ) : (
                <p className="text-center text-muted-foreground">Your QR code will appear here</p>
              )}
            </div>
            
            <Button 
              onClick={downloadQRCode} 
              className="w-full"
              disabled={!qrImageUrl}
            >
              Download QR Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
