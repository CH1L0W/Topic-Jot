import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LucideAngularModule, NotepadText, Clock, Star, Plus, EllipsisVertical, ArrowLeft, Bookmark, ChevronDown, Code, GraduationCap, Banknote, Plane, Headphones, Utensils, Gamepad2, Dumbbell, ShoppingCart, Clapperboard } from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick({ NotepadText, Clock, Star, Plus, EllipsisVertical, ArrowLeft, Bookmark, ChevronDown, Code, GraduationCap, Banknote, Plane, Headphones, Utensils, Gamepad2, Dumbbell, ShoppingCart, Clapperboard }))
  ]
};
