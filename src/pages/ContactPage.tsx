
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 text-center">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Get in Touch</h2>
              
              <div className="contact-link">
                <Phone className="w-5 h-5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:0711483989" className="text-primary hover:underline">
                    0711 483 989
                  </a>
                </div>
              </div>

              <div className="contact-link">
                <Mail className="w-5 h-5" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:info@plugtechbusiness.com" className="text-primary hover:underline">
                    info@plugtechbusiness.com
                  </a>
                </div>
              </div>

              <div className="contact-link">
                <MapPin className="w-5 h-5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p>Rasumal House, Shop 5, 1st Floor</p>
                  <p>Tom Mboya Street, Nairobi</p>
                </div>
              </div>

              <div className="contact-link">
                <Clock className="w-5 h-5" />
                <div>
                  <p className="font-medium">Working Hours</p>
                  <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Map or Additional Info */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Visit Our Store</h3>
              <p className="text-muted-foreground mb-4">
                We're located in the heart of Nairobi's business district. Come visit us to see our latest products and get expert advice on your tech needs.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Landmark:</strong> Near Kencom House
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Parking:</strong> Available nearby
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Public Transport:</strong> Accessible via matatu and bus routes
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn-primary w-full md:w-auto"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default ContactPage;
