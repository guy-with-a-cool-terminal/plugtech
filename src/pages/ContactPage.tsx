
import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-muted-foreground">
            Get in touch with Plug Tech Business for all your computer hardware needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Phone</h3>
                  <a href="tel:+254711448398" className="text-primary hover:text-primary-hover transition-colors">
                    +254 711 448 398
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">WhatsApp</h3>
                  <p className="text-muted-foreground">For quick orders and inquiries</p>
                  <WhatsAppButton className="mt-2" />
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    Rasumal House, Shop Number 5, 1st Floor<br />
                    Tom Mboya Street, Nairobi<br />
                    Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Working Hours</h3>
                  <div className="text-muted-foreground space-y-1">
                    <p>Monday - Saturday: 8:00 AM - 7:00 PM</p>
                    <p>Sunday: 10:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Instagram className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Social Media</h3>
                  <div className="flex gap-4">
                    <a 
                      href="https://instagram.com/collo_thee_plug" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-hover transition-colors"
                    >
                      Instagram
                    </a>
                    <a 
                      href="https://tiktok.com/@collo_thee_plug" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-hover transition-colors"
                    >
                      TikTok
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">@collo_thee_plug</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Why Choose Plug Tech Business?</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">Quality Guaranteed</h3>
                <p className="text-muted-foreground text-sm">
                  All our computers and laptops are thoroughly tested and come with warranty coverage.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-2">Competitive Prices</h3>
                <p className="text-muted-foreground text-sm">
                  We offer the best prices in Nairobi for both new and refurbished computers.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-2">Expert Support</h3>
                <p className="text-muted-foreground text-sm">
                  Our team provides professional advice and after-sale support for all purchases.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-2">Wide Selection</h3>
                <p className="text-muted-foreground text-sm">
                  From budget laptops to high-end gaming computers, we have something for everyone.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <WhatsAppButton className="w-full justify-center" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
