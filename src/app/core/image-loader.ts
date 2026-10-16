import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { Provider } from '@angular/core';
import { photoUrl } from './photos';

/**
 * NgOptimizedImage loader for the Unsplash CDN. `ngSrc` is the Unsplash photo id; the crop
 * ratio comes through `loaderParams` so one photo can be cut for many layouts.
 */
export const UNSPLASH_LOADER: Provider = {
  provide: IMAGE_LOADER,
  useValue: (config: ImageLoaderConfig) => {
    const ratio = (config.loaderParams as { ratio?: number } | undefined)?.ratio;
    return photoUrl(config.src, config.width ?? 800, ratio);
  },
};
