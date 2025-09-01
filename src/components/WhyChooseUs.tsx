
import { CheckCircle, Users, Headphones, MapPin } from 'lucide-react';

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "Every device is thoroughly tested and comes with our 30-day warranty guarantee."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our experienced technicians provide professional advice and support for all your computer needs."
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Dedicated customer service available Mon-Sat, 9AM-7PM. Contact us anytime via WhatsApp."
    },
    {
      icon: MapPin,
      title: "Prime Location",
      description: "Conveniently located in Nairobi CBD at Tom Mboya Street. Easy access via public transport."
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Plug Tech Business?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best computer hardware solutions in Nairobi with unmatched quality and service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
