
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm w-full h-full flex flex-col">
      <div className="relative overflow-hidden aspect-[4/3]">
        <Skeleton className="w-full h-full" />
        
        {/* Status badges skeleton */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        
        {/* Rating stars skeleton */}
        <div className="flex items-center gap-1 mb-3">
          <Skeleton className="w-12 h-3" />
          <Skeleton className="w-8 h-3 ml-1" />
        </div>
        
        <div className="space-y-2 mb-4 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-20" />
            <div className="text-right">
              <Skeleton className="h-3 w-16 mb-1" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Skeleton className="w-full h-10 rounded-lg" />
            <Skeleton className="w-full h-10 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
