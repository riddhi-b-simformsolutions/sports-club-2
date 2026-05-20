// T020 — FaqService
import { Injectable, signal } from '@angular/core';
import { FaqItem } from '../models/faq.model';
import { FAQ_DATA } from '../data/faq.data';

@Injectable({ providedIn: 'root' })
export class FaqService {
  private readonly _faqs = signal<FaqItem[]>(FAQ_DATA);
  readonly faqs = this._faqs.asReadonly();
}
