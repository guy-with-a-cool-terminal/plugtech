
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate WhatsApp message from form data
    const phoneNumber = "254711483989";
    let message = "📧 *CONTACT FORM MESSAGE*\n\n";
    message += `👤 *Name:* ${formData.name}\n`;
    message += `📧 *Email:* ${formData.email}\n`;
    message += `📝 *Subject:* ${formData.subject}\n\n`;
    message += `*Message:*\n${formData.message}\n\n`;
    message += "Please respond at your earliest convenience.\n";
    message += "Thank you! 🙏";
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

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
                  <a href="mailto:collinskimtai1999@gmail.com" className="text-primary hover:underline">
                    collinskimtai1999@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-link">
                <MapPin className="w-5 h-5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p>Rasumal House, Shop 5, 1st Floor</p>
                  <p>Tom Mboya Street, Nairobi (Ask For Collins)</p>
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
                  <strong>Landmark:</strong> Opposite Imenti House
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
            <h3 className="text-lg font-semibold text-foreground mb-4">Send us a Message to WhatsApp</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Fill out the form below and we'll send your message directly to our WhatsApp for a quick response.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                  Subject
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can we help?"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="resize-none"
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full md:w-auto"
              >
                Send Message to WhatsApp
              </Button>
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
