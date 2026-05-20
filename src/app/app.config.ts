import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  HomeOutline,
  BarsOutline,
  MenuOutline,
  CloseOutline,
  TrophyOutline,
  FireOutline,
  TeamOutline,
  StarOutline,
  MailOutline,
  PhoneOutline,
  EnvironmentOutline,
  CheckCircleOutline,
  ClockCircleOutline,
  FacebookOutline,
  TwitterOutline,
  InstagramOutline,
  YoutubeOutline,
  ArrowRightOutline,
  ArrowLeftOutline,
  CalendarOutline,
  UserOutline,
  CheckOutline,
  GlobalOutline,
} from '@ant-design/icons-angular/icons';

registerLocaleData(en);

// T023 — App configuration with icon registration
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(
      NzIconModule.forRoot([
        HomeOutline,
        BarsOutline,
        MenuOutline,
        CloseOutline,
        TrophyOutline,
        FireOutline,
        TeamOutline,
        StarOutline,
        MailOutline,
        PhoneOutline,
        EnvironmentOutline,
        CheckCircleOutline,
        ClockCircleOutline,
        FacebookOutline,
        TwitterOutline,
        InstagramOutline,
        YoutubeOutline,
        ArrowRightOutline,
        ArrowLeftOutline,
        CalendarOutline,
        UserOutline,
        CheckOutline,
        GlobalOutline,
      ]),
    ),
  ],
};
