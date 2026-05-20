// T021 — ContactService
import { Injectable, signal } from '@angular/core';
import { ContactDetail } from '../models/contact.model';
import { CONTACT_DATA } from '../data/contact.data';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly _details = signal<ContactDetail[]>(CONTACT_DATA);
  readonly details = this._details.asReadonly();
}
