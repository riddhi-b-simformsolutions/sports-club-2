// T013 — ContactDetail model

export type ContactType = 'address' | 'phone' | 'email' | 'hours';

export interface ContactDetail {
  id: string;
  type: ContactType;
  label: string;
  value: string;
  icon: string;
}
