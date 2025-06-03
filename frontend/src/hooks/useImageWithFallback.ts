import { useState, useEffect } from 'react';
import fallbackImage from '../sources/fallback-image.jpg';

export function useImageWithFallback(src?: string) {
  const [imgSrc, setImgSrc] = useState(src || fallbackImage);

  useEffect(() => {
    setImgSrc(src || fallbackImage);
  }, [src]);

  const onError = () => setImgSrc(fallbackImage);

  return { imgSrc, onError };
}
