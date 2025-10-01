/**
 * Optimizes Supabase Storage image URLs with transformations
 * Reduces image size and improves load times dramatically
 */

interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}

export const getOptimizedImageUrl = (
  imageUrl: string,
  version: number,
  options: ImageTransformOptions = {}
): string => {
  if (!imageUrl) return '';
  
  // Check if it's a Supabase storage URL
  const isSupabaseUrl = imageUrl.includes('supabase.co/storage/v1/object/public');
  
  if (!isSupabaseUrl) {
    return `${imageUrl}?v=${version}`;
  }

  const {
    width = 400,
    height = 300,
    quality = 80,
    format = 'webp'
  } = options;

  // Add transformation parameters for Supabase Image Transformation
  const transformParams = new URLSearchParams({
    width: width.toString(),
    height: height.toString(),
    quality: quality.toString(),
    format: format,
    resize: 'cover'
  });

  return `${imageUrl}?${transformParams.toString()}&v=${version}`;
};

export const getImageSrcSet = (imageUrl: string, version: number) => {
  if (!imageUrl) return '';
  
  const isSupabaseUrl = imageUrl.includes('supabase.co/storage/v1/object/public');
  if (!isSupabaseUrl) return '';

  return `
    ${getOptimizedImageUrl(imageUrl, version, { width: 300, height: 225 })} 300w,
    ${getOptimizedImageUrl(imageUrl, version, { width: 400, height: 300 })} 400w,
    ${getOptimizedImageUrl(imageUrl, version, { width: 600, height: 450 })} 600w,
    ${getOptimizedImageUrl(imageUrl, version, { width: 800, height: 600 })} 800w
  `.trim();
};
