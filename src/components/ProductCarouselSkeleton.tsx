
import ProductCardSkeleton from './ProductCardSkeleton';

interface ProductCarouselSkeletonProps {
  title?: string;
  itemsPerView?: number;
}

const ProductCarouselSkeleton = ({ title, itemsPerView = 4 }: ProductCarouselSkeletonProps) => {
  return (
    <div className="relative">
      {title && (
        <h3 className="text-xl font-bold text-foreground mb-6">{title}</h3>
      )}
      
      <div className="carousel-container">
        <div className="flex gap-4 md:gap-6">
          {Array.from({ length: itemsPerView }).map((_, index) => (
            <div 
              key={index}
              className="flex-shrink-0"
              style={{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 1.5}rem / ${itemsPerView})` }}
            >
              <div className="h-full min-h-[500px] md:min-h-[550px]">
                <ProductCardSkeleton />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarouselSkeleton;
