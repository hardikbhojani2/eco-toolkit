
import Header from "@/components/Header";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              About EcoTools
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your comprehensive suite of online tools for everyday calculations and utilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                EcoTools is dedicated to providing free, easy-to-use online tools that help you solve everyday problems. 
                From financial calculations to unit conversions, we aim to make complex calculations simple and accessible to everyone.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• 100% Free to use</li>
                <li>• No registration required</li>
                <li>• Mobile-friendly design</li>
                <li>• Accurate calculations</li>
                <li>• Privacy-focused</li>
              </ul>
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 border text-center">
            <h2 className="text-2xl font-semibold mb-4">Our Tools</h2>
            <p className="text-muted-foreground mb-6">
              We offer a wide range of calculators and tools including age calculators, EMI calculators, 
              GST calculators, QR code generators, and much more. All our tools are designed with simplicity 
              and accuracy in mind.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Age Calculator</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">EMI Calculator</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">GST Calculator</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">QR Generator</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Unit Converter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
