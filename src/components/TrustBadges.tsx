
import { Shield, Award, Clock, MapPin } from 'lucide-react';

const TrustBadges = () => {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Quality Guaranteed</h4>
              <p className="text-xs text-muted-foreground">30-day warranty</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Certified Business</h4>
              <p className="text-xs text-muted-foreground">Licensed dealer</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">5+ Years Experience</h4>
              <p className="text-xs text-muted-foreground">Trusted by 1000+ customers</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Local Business</h4>
              <p className="text-xs text-muted-foreground">Nairobi CBD location</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
