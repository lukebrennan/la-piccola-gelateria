import { IMAGE_CONFIG } from '@angular/common';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { routes } from './app.routes';
import { UNSPLASH_LOADER } from './core/image-loader';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
      withViewTransitions({ skipInitialTransition: true }),
    ),
    UNSPLASH_LOADER,
    {
      provide: IMAGE_CONFIG,
      useValue: { breakpoints: [320, 480, 640, 828, 1080, 1440, 1920] },
    },
    provideClientHydration(),
  ],
};
