import { ServiceCard } from '../ServiceCard';
import spaImage from '@assets/stock_images/hot_stone_massage_6c34b301.jpg';

export default function ServiceCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ServiceCard
        image={spaImage}
        category="Spa"
        name="Relaxation Massage"
        description="Unwind with our signature full-body massage using premium oils and techniques"
        duration="60 min"
        price="120"
      />
    </div>
  );
}
