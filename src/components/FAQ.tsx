
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do you offer warranty on refurbished laptops?",
      answer: "Yes, all our refurbished laptops come with a 30-day warranty covering hardware defects. We also provide ongoing technical support for all our customers."
    },
    {
      question: "Where is your shop located in Nairobi?",
      answer: "We're located at Rasumal House, Shop 5, 1st Floor, Tom Mboya Street in Nairobi CBD. It's easily accessible via public transport and close to major bus stops."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash payments and mobile money transfers (M-Pesa, Airtel Money). For large purchases, we can arrange flexible payment plans."
    },
    {
      question: "Can I test the laptop before purchasing?",
      answer: "Absolutely! We encourage customers to test all devices before purchase. Our technicians will demonstrate the laptop's functionality and answer any questions."
    },
    {
      question: "Do you provide delivery services in Nairobi?",
      answer: "Yes, we offer delivery services within Nairobi and surrounding areas. Delivery charges vary based on location. Contact us for specific delivery rates."
    },
    {
      question: "What if I need technical support after purchase?",
      answer: "We provide ongoing technical support via WhatsApp and phone. For hardware issues within warranty period, bring the device to our shop for free diagnosis and repair."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. Find the most common questions our customers ask.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg mb-4 overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 text-left bg-card hover:bg-muted/50 transition-colors duration-200 flex justify-between items-center"
              >
                <h3 className="font-semibold text-foreground pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="p-6 pt-0 border-t border-border bg-muted/30">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="https://wa.me/254711483989?text=Hello! I have a question about your products."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors duration-200 inline-block font-medium"
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
