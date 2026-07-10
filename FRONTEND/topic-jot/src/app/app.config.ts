import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LucideAngularModule, NotepadText, Clock, Star, Plus, EllipsisVertical, ArrowLeft, Bookmark, ChevronDown, Code, GraduationCap, Banknote, Plane, Headphones, Utensils, Gamepad2, Dumbbell, ShoppingCart, Clapperboard, LayoutGrid, Archive, Funnel, Undo2 } from 'lucide-angular';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from './core/services/config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick({ NotepadText, Clock, Star, Plus, EllipsisVertical, ArrowLeft, Bookmark, ChevronDown, Code, GraduationCap, Banknote, Plane, Headphones, Utensils, Gamepad2, Dumbbell, ShoppingCart, Clapperboard, LayoutGrid, Archive, Funnel, Undo2 })),
    provideHttpClient(),
    {
      provide: 'APP_INITIALIZER',
      useFactory: (configService: ConfigService) => () => configService.loadConfig(),
      deps: [ConfigService],
      multi: true,
    }
  ]
};
