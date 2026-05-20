// T017 — Mock data: contact details
import { ContactDetail } from '../models/contact.model';

export const CONTACT_DATA: ContactDetail[] = [
  {
    id: 'cd-1',
    type: 'address',
    label: 'Head Office',
    value: 'Level 4, 88 Sports Boulevard, Melbourne VIC 3000',
    icon: 'environment',
  },
  {
    id: 'cd-2',
    type: 'phone',
    label: 'General Enquiries',
    value: '+61 3 9000 1234',
    icon: 'phone',
  },
  {
    id: 'cd-3',
    type: 'email',
    label: 'Email Us',
    value: 'hello@sportclubhub.com.au',
    icon: 'mail',
  },
  {
    id: 'cd-4',
    type: 'hours',
    label: 'Office Hours',
    value: 'Monday – Friday, 9:00 AM – 5:30 PM AEST',
    icon: 'clock-circle',
  },
];
