// T012 — FaqItem model

export type FaqCategory = 'General' | 'Membership' | 'Activities' | 'Facilities';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}
