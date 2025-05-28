
import Header from "@/components/Header";

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Disclaimer
            </h1>
            <p className="text-xl text-muted-foreground">
              Important information about the use of EcoTools
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="bg-card rounded-lg p-8 border space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">General Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The information provided by EcoTools ("we," "us," or "our") on our website is for general 
                  informational purposes only. All information on the site is provided in good faith, however 
                  we make no representation or warranty of any kind, express or implied, regarding the accuracy, 
                  adequacy, validity, reliability, availability, or completeness of any information on the site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Calculation Accuracy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to provide accurate calculations through our various tools and calculators, 
                  we cannot guarantee that all calculations are 100% accurate. Users should verify important 
                  calculations independently and consult with qualified professionals when making financial or 
                  other important decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">No Professional Advice</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The tools and calculators provided on EcoTools are not intended to provide financial, legal, 
                  tax, or investment advice. The results from our calculators should not be considered as 
                  professional advice. Always consult with qualified professionals for specific advice related 
                  to your situation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Under no circumstance shall we have any liability to you for any loss or damage of any kind 
                  incurred as a result of the use of the site or reliance on any information provided on the site. 
                  Your use of the site and your reliance on any information on the site is solely at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">External Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to external websites that are not provided or maintained by us. 
                  We do not guarantee the accuracy, relevance, timeliness, or completeness of any information 
                  on these external websites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Changes to Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify this disclaimer at any time. Changes will be effective 
                  immediately upon posting on the website. Your continued use of the site after any changes 
                  indicates your acceptance of the new disclaimer.
                </p>
              </section>

              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
