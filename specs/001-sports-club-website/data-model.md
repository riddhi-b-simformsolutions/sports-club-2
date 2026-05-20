# Data Model: Modern Static Sports-Club Website

**Phase**: 1 — Design
**Branch**: `001-sports-club-website`
**Date**: 2026-05-20
**Source**: [spec.md](./spec.md) § Key Entities + [research.md](./research.md) R-003

---

## Entities

### 1. Club

Primary entity. Represents one of the 9 sports clubs.

```typescript
// src/app/core/models/club.model.ts

export interface Activity {
  name: string;
  description: string;
  schedule?: string;   // e.g. "Monday & Wednesday, 18:00–20:00"
}

export interface Club {
  id: string;                   // URL-safe slug, e.g. "football-fc"
  name: string;                 // Display name, e.g. "City Football FC"
  sport: string;                // Category label, e.g. "Football"
  sportIcon: string;            // ng-zorro icon name, e.g. "trophy"
  tagline: string;              // One-sentence pitch
  location: string;             // City / suburb, e.g. "Melbourne, VIC"
  coverImageUrl: string;        // Card thumbnail (400×280)
  heroImageUrl: string;         // Detail page banner (1200×500)
  foundingYear: number;
  memberCount: number;
  description: string;          // Multi-paragraph HTML-safe plain text
  achievements: string[];       // 3–5 achievement strings
  activities: Activity[];       // 3–5 training sessions / programmes
  accentColor: string;          // Club brand colour, used in UI accents (hex)
}
```

**Relationships**: None (flat list; no cross-club references).
**Validation rules**: `id` must be unique; used as route param (`:id`); URL-safe slug format.
**State**: Read-only after initialisation (no mutations in UI).

---

### 2. TeamMember

Represents an organisation staff member shown on the About page.

```typescript
// src/app/core/models/team.model.ts

export interface TeamMember {
  id: string;
  name: string;
  title: string;      // Role, e.g. "Head of Partnerships"
  bio: string;        // One-sentence bio
  avatarUrl: string;  // Square avatar (120×120)
}
```

**Relationships**: Belongs to the organisation, not a specific club.
**Validation rules**: None beyond string non-empty.

---

### 3. FaqItem

Represents a single FAQ entry shown on the FAQ page.

```typescript
// src/app/core/models/faq.model.ts

export type FaqCategory = 'General' | 'Membership' | 'Activities' | 'Facilities';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}
```

**Relationships**: None.
**Grouping**: `category` is used to optionally group items in the accordion.

---

### 4. ContactDetail

Represents a single contact information entry shown on the Contact page.

```typescript
// src/app/core/models/contact.model.ts

export type ContactType = 'address' | 'phone' | 'email' | 'hours';

export interface ContactDetail {
  id: string;
  type: ContactType;
  label: string;      // Display label, e.g. "Main Office"
  value: string;      // Displayed value, e.g. "123 Sport Street, Melbourne"
  icon: string;       // ng-zorro icon name, e.g. "environment"
}
```

---

## Mock Data Definitions

### clubs.data.ts — 9 Clubs

```typescript
// src/app/core/data/clubs.data.ts
import { Club } from '../models/club.model';

export const CLUBS_DATA: Club[] = [
  {
    id: 'city-football-fc',
    name: 'City Football FC',
    sport: 'Football',
    sportIcon: 'trophy',
    tagline: 'Where passion meets the pitch — uniting the city one match at a time.',
    location: 'Melbourne, VIC',
    coverImageUrl: 'https://picsum.photos/seed/club-football-cover/400/280',
    heroImageUrl: 'https://picsum.photos/seed/club-football-hero/1200/500',
    foundingYear: 1998,
    memberCount: 420,
    description: 'City Football FC has been the heartbeat of Melbourne's football community since 1998. From grassroots youth academies to competitive senior leagues, we nurture talent at every level. Our state-of-the-art training facilities and dedicated coaching staff ensure every member — from beginner to elite — reaches their full potential.',
    achievements: [
      'Victorian State League Champions 2019 & 2022',
      '3× Junior Development Club of the Year',
      'Over 40 players promoted to national academies',
      'Community Choice Award — Most Inclusive Club 2023'
    ],
    activities: [
      { name: 'Junior Academy (U8–U16)', description: 'Skills-based training every Saturday morning, focusing on technique and teamwork.', schedule: 'Saturday, 08:00–10:00' },
      { name: 'Senior Competitive League', description: 'Competitive matches in the Victorian State League, training twice weekly.', schedule: 'Tuesday & Thursday, 19:00–21:00' },
      { name: 'Social Six-a-Side', description: 'Friendly six-a-side games open to all ages and skill levels.', schedule: 'Sunday, 10:00–12:00' },
      { name: 'Goalkeeper Specialist Programme', description: 'Dedicated goalkeeper coaching for all age groups.', schedule: 'Wednesday, 17:30–19:00' }
    ],
    accentColor: '#22C55E'
  },
  {
    id: 'metro-basketball',
    name: 'Metro Basketball Club',
    sport: 'Basketball',
    sportIcon: 'fire',
    tagline: 'Rise above the rim — elite coaching, elite results.',
    location: 'Sydney, NSW',
    coverImageUrl: 'https://picsum.photos/seed/club-basketball-cover/400/280',
    heroImageUrl: 'https://picsum.photos/seed/club-basketball-hero/1200/500',
    foundingYear: 2003,
    memberCount: 310,
    description: 'Metro Basketball Club is Sydney's premier basketball development program. With a philosophy built on discipline, teamwork, and explosive athleticism, Metro has produced multiple NBL development squad nominees. Our indoor courts are available year-round and our coaching staff includes former professional players.',
    achievements: [
      'NSW Basketball State Championships — Gold 2021',
      '5 players selected for NSW State representation teams',
      'Best Junior Program — Basketball NSW 2020 & 2023',
      'Under-18 National Invitational Semifinalists 2022'
    ],
    activities: [
      { name: 'Elite Development Squad', description: 'High-performance sessions for players aged 14+ showing elite potential.', schedule: 'Monday & Wednesday, 18:30–20:30' },
      { name: 'Junior Fundamentals', description: 'Dribbling, shooting, and defensive foundations for children 6–13.', schedule: 'Saturday, 09:00–10:30' },
      { name: '3-on-3 Street League', description: 'Competitive 3-on-3 format league running in school terms.', schedule: 'Friday, 17:00–20:00' },
      { name: 'Shooting Clinics', description: 'Specialist sessions focused on shooting mechanics and consistency.', schedule: 'Sunday, 11:00–12:30' }
    ],
    accentColor: '#F59E0B'
  },
  {
    id: 'harbour-tennis',
    name: 'Harbour Tennis Club',
    sport: 'Tennis',
    sportIcon: 'star',
    tagline: 'Ace your game in the shadow of the harbour.',
    location: 'Brisbane, QLD',
    coverImageUrl: 'https://picsum.photos/seed/club-tennis-cover/400/280',
    heroImageUrl: 'https://picsum.photos/seed/club-tennis-hero/1200/500',
    foundingYear: 1985,
    memberCount: 280,
    description: 'Harbour Tennis Club combines a rich 40-year history with a forward-thinking approach to player development. Set on 12 all-weather courts with floodlighting, we offer programs for the social player through to the ranked competitor. Our PTQ-certified coaching team has guided members to national junior championships.',
    achievements: [
      'Queensland Tennis Club of the Year 2018 & 2022',
      '12 all-weather courts with full floodlighting',
      'Junior member ranked in Top 50 nationally (2023)',
      'Mixed Doubles State Open Champions 2021'
    ],
    activities: [
      { name: 'Cardio Tennis', description: 'High-energy group fitness session using tennis as the workout medium.', schedule: 'Tuesday & Thursday, 07:00–08:00' },
      { name: 'Junior Competition Pathway', description: 'Structured pathway from green-ball through to full yellow-ball competition.', schedule: 'Wednesday, 16:00–18:00' },
      { name: 'Social Round Robin', description: 'Rotating doubles format — great way to meet other members.', schedule: 'Saturday, 13:00–16:00' },
      { name: 'Private & Semi-Private Coaching', description: 'One-on-one and two-on-one coaching sessions bookable through the club app.', schedule: 'Flexible — by appointment' }
    ],
    accentColor: '#EF4444'
  },
  {
    id: 'aqua-swim-club',
    name: 'Aqua Swim Club',
    sport: 'Swimming',
    sportIcon: 'team',
    tagline: 'Dive deeper. Swim faster. Go further.',
    location: 'Perth, WA',
    coverImageUrl: 'https://picsum.photos/seed/club-swimming-cover/400/280',
    heroImageUrl: 'https://picsum.photos/seed/club-swimming-hero/1200/500',
    foundingYear: 1991,
    memberCount: 350,
    description: 'Aqua Swim Club is Western Australia's most decorated swimming programme. Spanning competitive squads, masters swimming, and learn-to-swim, we serve members aged 4 to 80+. Our Olympic-length 50-metre pool, full timing infrastructure, and AIS-certified coaches give members access to elite-level training year-round.',
    achievements: [
      'WA State Swimming Championships — 14 gold medals (2023)',
      '3 members represented Australia at World Junior Championships',
      'WA Swim Club of the Decade — Swimming Australia 2020',
      'Accessible Sports Inclusion Award 2022'
    ],
    activities: [
      { name: 'Junior Pathfinders Squad', description: 'Development squad for competitive juniors aged 8–14, four sessions per week.', schedule: 'Mon/Wed/Fri, 06:00–07:30 & Sat, 07:00–08:30' },
      { name: 'Masters Swimming', description: 'Coached sessions for adults 18+ focused on technique and competition preparation.', schedule: 'Tuesday & Thursday, 20:00–21:30' },
      { name: 'Learn to Swim', description: 'Structured learn-to-swim program for children aged 4–8 in a safe, fun environment.', schedule: 'Saturday, 09:00–10:00' },
      { name: 'Open Water Training', description: 'Open-water acclimatisation sessions at the local harbour.', schedule: 'Sunday, 07:00–08:30 (summer only)' }
    ],
    accentColor: '#06B6D4'
  },
  {
    id: 'grassroots-cricket',
    name: 'Grassroots Cricket Club',
    sport: 'Cricket',
    sportIcon: 'trophy',
    tagline: 'Stump to stumps — cricket for life.',
    location: 'Adelaide, SA',
    coverImageUrl: 'https://picsum.photos/seed/club-cricket-cover/400/280',
    heroImageUrl: 'https://picsum.photos/seed/club-cricket-hero/1200/500',
    foundingYear: 1972,
    memberCount: 390,
    description: 'Grassroots Cricket Club is one of South Australia's oldest and proudest cricket institutions. With over 50 years of history, the club fields 8 senior teams across the Adelaide Metropolitan Cricket Association and runs one of the region's largest junior programs. The culture of Grassroots is built on mateship, discipline, and a deep respect for the game.',
    achievements: [
      'AMCA Grade 1 Premiers 2017, 2019 & 2023',
      '8 senior teams across all AMCA grades',
      'Junior Club of the Year — Cricket SA 2021',
      'Over 15 members represented SA at age-group level'
    ],
    activities: [
      { name: 'Senior Grade Cricket', description: 'Competitive Saturday grade matches (two-day and one-day formats) across 8 teams.', schedule: 'Saturday & Sunday (match days, Oct–Mar)' },
      { name: 'Junior T20 Blast', description: 'Fast and fun introductory T20 format for ages 8–14.', schedule: 'Saturday morning (Oct–Mar)' },
      { name: 'Batting Academy', description: 'Specialist batting coaching with video analysis and net sessions.', schedule: 'Tuesday, 18:00–20:00' },
      { name: 'Women\'s & Girls\' Programme', description: 'Dedicated women\'s competition and all-girls coaching pathway.', schedule: 'Thursday, 17:30–19:30' }
    ],
    accentColor: '#8B5CF6'
  },
  {
    id: 'shuttle-badminton',
    name: 'Shuttle Badminton Club',
    sport: 'Badminton',
    sportIcon: 'fire',
    tagline: 'From casual rallies to championship shuttles.',
    location: 'Canberra, ACT',
    coverImageUrl: 'https://picsum.photos/seed/club-badminton-cover/400/280',
    heroImageUrl: 'https://picsum.photos/seed/club-badminton-hero/1200/500',
    foundingYear: 2007,
    memberCount: 195,
    description: 'Shuttle Badminton Club has grown from a small community group to the ACT's premier badminton hub. With 10 indoor courts at our dedicated venue, we run everything from beginner-friendly social sessions to BWF-registered competitive teams. Our focus on technique-first coaching ensures members improve consistently regardless of starting level.',
    achievements: [
      'ACT Open Doubles Champions 2022 & 2023',
      '2 members selected for ACT State Teams',
      'Club membership grew 60% between 2020–2024',
      'Best Recreational Sports Program — ACT Sport Awards 2022'
    ],
    activities: [
      { name: 'Social Drop-in Sessions', description: 'Relaxed social play with rotating partners, suitable for all levels.', schedule: 'Monday, Wednesday & Friday, 19:00–22:00' },
      { name: 'Competitive League', description: 'Internal club league with ranked divisions and monthly standings.', schedule: 'Sunday, 14:00–18:00' },
      { name: 'Youth Development', description: 'Structured coaching for players aged 10–17, progressing from basics to competition.', schedule: 'Saturday, 10:00–12:00' },
      { name: 'Doubles Masterclass', description: 'Advanced session on doubles tactics, positioning, and communication.', schedule: 'Thursday, 19:00–21:00' }
    ],
    accentColor: '#EC4899'
  },
  {
    id: 'velocity-athletics',
    name: 'Velocity Athletics Club',
    sport: 'Athletics',
    sportIcon: 'fire',
    tagline: 'Every millisecond counts — run your best.',
    location: 'Melbourne, VIC',
    coverImageUrl: 'https://picsum.photos/seed/club-athletics-cover/400/280',
    heroImageUrl: 'https://picsum.photos/seed/club-athletics-hero/1200/500',
    foundingYear: 1996,
    memberCount: 270,
    description: 'Velocity Athletics Club is Melbourne's go-to home for sprinters, distance runners, and field event athletes. Training on a certified 400-metre track with full field facilities, members benefit from biomechanics-led coaching and a thriving competitive program. We compete at state, national and international open-track meets.',
    achievements: [
      '12 State Champions across sprint, middle-distance & jumps (2023)',
      '3 members qualified for Athletics Australia national squad',
      'Club Record holders in 100m, 400m, Long Jump & High Jump',
      'Victorian Athletics Club of the Year 2020'
    ],
    activities: [
      { name: 'Sprint & Speed Development', description: 'Biomechanics-led sprint coaching covering starts, acceleration, and max velocity phases.', schedule: 'Tuesday & Thursday, 17:30–19:30' },
      { name: 'Distance Running Group', description: 'Structured interval and long-run sessions for 1500m to marathon runners.', schedule: 'Monday & Wednesday, 06:00–07:30' },
      { name: 'Field Events Academy', description: 'Technical coaching for long jump, high jump, shot put, and javelin.', schedule: 'Saturday, 09:00–12:00' },
      { name: 'Junior Track Programme', description: 'Introductory athletics for 8–15 year olds covering all disciplines.', schedule: 'Sunday, 09:30–11:30' }
    ],
    accentColor: '#FF6B35'
  },
  {
    id: 'peloton-cycling',
    name: 'Peloton Cycling Club',
    sport: 'Cycling',
    sportIcon: 'team',
    tagline: 'Ride together. Arrive stronger.',
    location: 'Sydney, NSW',
    coverImageUrl: 'https://picsum.photos/seed/club-cycling-cover/400/280',
    heroImageUrl: 'https://picsum.photos/seed/club-cycling-hero/1200/500',
    foundingYear: 2011,
    memberCount: 240,
    description: 'Peloton Cycling Club is a community of road cyclists passionate about both performance and the sheer joy of riding. From weekly group rides through the Blue Mountains to criterium racing and time trials, we offer a full cycling experience. Our PMBIA-accredited coaches provide structured training plans adapted to STRAVA-compatible workouts.',
    achievements: [
      'Tour de Cure charity ride — raised $520,000 since 2015',
      'Masters Criterium Champions NSW 2022',
      'Club Challenge — highest average VO2 max improvement 2023',
      'Cycling NSW Active Club of the Year 2021'
    ],
    activities: [
      { name: 'Saturday Group Ride', description: 'Weekly group road ride at A, B, and C pace groups — distances 60–120 km.', schedule: 'Saturday, 06:30 departure' },
      { name: 'Criterium Racing', description: 'Wednesday-night criterium series on a closed circuit for competitive members.', schedule: 'Wednesday, 18:00–21:00 (Oct–Apr)' },
      { name: 'Indoor Zwift Sessions', description: 'Structured trainer sessions led by a certified coach via our club Zwift Meetup.', schedule: 'Tuesday & Thursday, 06:00–07:00' },
      { name: 'Learn to Ride Club', description: 'Beginner-friendly rides on quiet paths for those new to road cycling.', schedule: 'Sunday, 08:00–10:00' }
    ],
    accentColor: '#3B82F6'
  },
  {
    id: 'iron-fist-boxing',
    name: 'Iron Fist Boxing Club',
    sport: 'Boxing',
    sportIcon: 'fire',
    tagline: 'Discipline forged in sweat — champions built here.',
    location: 'Brisbane, QLD',
    coverImageUrl: 'https://picsum.photos/seed/club-boxing-cover/400/280',
    heroImageUrl: 'https://picsum.photos/seed/club-boxing-hero/1200/500',
    foundingYear: 2000,
    memberCount: 185,
    description: 'Iron Fist Boxing Club has produced some of Queensland's most decorated amateur and professional boxers since 2000. The gym's no-nonsense culture values respect, hard work, and personal growth above all. Whether you're stepping into the ring for the first time or preparing for your next amateur bout, Iron Fist provides the environment and expertise to get you there.',
    achievements: [
      'QLD Amateur Boxing Championships — 6 gold medals (2023)',
      '2 members progressed to professional ranks',
      'Community Safety Initiative — Youth Boxing Diversion Program',
      'Boxing Queensland Club of the Year 2019 & 2022'
    ],
    activities: [
      { name: 'Boxing Fitness Classes', description: 'Non-contact pad work and conditioning sessions — perfect for fitness without sparring.', schedule: 'Monday, Wednesday & Friday, 06:00–07:00 & 18:00–19:00' },
      { name: 'Amateur Competition Squad', description: 'Full technical training for members preparing for sanctioned amateur bouts.', schedule: 'Tuesday & Thursday, 17:00–19:30' },
      { name: 'White Collar Boxing', description: '10-week programme for working professionals, culminating in a charity boxing event.', schedule: 'Starting February & July each year' },
      { name: 'Youth Development Programme', description: 'After-school boxing for 12–17 year olds — structured, safe, and supervised.', schedule: 'Monday & Wednesday, 15:30–17:00' }
    ],
    accentColor: '#DC2626'
  }
];
```

---

### team.data.ts — Organisation Team Members

```typescript
// src/app/core/data/team.data.ts
import { TeamMember } from '../models/team.model';

export const TEAM_DATA: TeamMember[] = [
  { id: 'tm-1', name: 'Marcus Webb', title: 'CEO & Co-Founder', bio: 'Former professional athlete turned sports administrator with 20 years of club management experience.', avatarUrl: 'https://picsum.photos/seed/team-1/120/120' },
  { id: 'tm-2', name: 'Priya Sharma', title: 'Head of Club Development', bio: 'Specialist in community sport growth strategy and inclusive programming across diverse demographics.', avatarUrl: 'https://picsum.photos/seed/team-2/120/120' },
  { id: 'tm-3', name: 'Daniel Okafor', title: 'Director of Partnerships', bio: 'Builds and manages corporate and government relationships that fund club infrastructure and youth programmes.', avatarUrl: 'https://picsum.photos/seed/team-3/120/120' },
  { id: 'tm-4', name: 'Sophie Chen', title: 'Head of Digital & Communications', bio: 'Leads brand strategy, digital presence, and member communications for all affiliated clubs.', avatarUrl: 'https://picsum.photos/seed/team-4/120/120' },
  { id: 'tm-5', name: 'James Kowalski', title: 'Head Coach Coordinator', bio: 'Oversees coaching standards, accreditation requirements, and mentoring programmes across all 9 clubs.', avatarUrl: 'https://picsum.photos/seed/team-5/120/120' },
  { id: 'tm-6', name: 'Aisha Ndiaye', title: 'Community & Outreach Manager', bio: 'Drives inclusion initiatives, connecting under-represented communities with sport participation opportunities.', avatarUrl: 'https://picsum.photos/seed/team-6/120/120' }
];
```

---

### faq.data.ts — FAQ Items

```typescript
// src/app/core/data/faq.data.ts
import { FaqItem } from '../models/faq.model';

export const FAQ_DATA: FaqItem[] = [
  { id: 'faq-1', category: 'General', question: 'What is the Sports Club Hub?', answer: 'Sports Club Hub is a central platform connecting athletes, families, and the community to 9 premier sports clubs across Australia. We make it easy to explore clubs, discover activities, and find your sporting home.' },
  { id: 'faq-2', category: 'General', question: 'Are the clubs suitable for beginners?', answer: 'Absolutely. Every club on our platform offers beginner-friendly pathways alongside competitive programmes. Whether you\'ve never played before or are returning after a break, you\'ll find a programme tailored to your level.' },
  { id: 'faq-3', category: 'Membership', question: 'How do I join a club?', answer: 'Visit the club\'s detail page and click the "Contact / Join" button. This will take you to our Contact Us page where you can send a direct enquiry. A club representative will respond within 2 business days.' },
  { id: 'faq-4', category: 'Membership', question: 'Is there an age limit for joining?', answer: 'Most clubs welcome members from age 5 through to 80+. Each club details its specific age groups on their page. Junior programmes typically require parental consent for members under 18.' },
  { id: 'faq-5', category: 'Membership', question: 'What are the membership fees?', answer: 'Membership fees vary by club and programme level. Contact the individual club directly via the Contact Us page for current fee schedules. Many clubs offer discounted rates for juniors, students, and concession card holders.' },
  { id: 'faq-6', category: 'Activities', question: 'Can I try a session before committing to membership?', answer: 'Yes! Most of our affiliated clubs offer a free trial period of 1–2 sessions for new members. Mention that you\'re a first-time visitor when you contact the club and they\'ll arrange it for you.' },
  { id: 'faq-7', category: 'Activities', question: 'What equipment do I need to bring?', answer: 'Basic equipment requirements are listed on each club\'s detail page under Activities. Most clubs provide shared equipment for trial sessions. As you progress, you\'ll be advised on recommended personal gear.' },
  { id: 'faq-8', category: 'Activities', question: 'Do the clubs run holiday and school programmes?', answer: 'Many of our clubs run school holiday clinics and term-based junior programmes. Check each club\'s Activities section for details or contact them directly for holiday programme schedules.' },
  { id: 'faq-9', category: 'Facilities', question: 'Are the club facilities accessible for people with disabilities?', answer: 'All clubs affiliated with Sports Club Hub are required to meet Australian Disability Discrimination Act standards. For specific accessibility features at a particular club\'s venue, please contact them directly.' },
  { id: 'faq-10', category: 'Facilities', question: 'Is parking available at club venues?', answer: 'Parking availability varies by venue. Each club\'s location is listed on their detail page. We recommend checking the club\'s own website or contacting them directly for venue-specific parking information.' }
];
```

---

### contact.data.ts — Contact Details

```typescript
// src/app/core/data/contact.data.ts
import { ContactDetail } from '../models/contact.model';

export const CONTACT_DATA: ContactDetail[] = [
  { id: 'cd-1', type: 'address', label: 'Head Office', value: 'Level 4, 88 Sports Boulevard, Melbourne VIC 3000', icon: 'environment' },
  { id: 'cd-2', type: 'phone', label: 'General Enquiries', value: '+61 3 9000 1234', icon: 'phone' },
  { id: 'cd-3', type: 'email', label: 'Email Us', value: 'hello@sportclubhub.com.au', icon: 'mail' },
  { id: 'cd-4', type: 'hours', label: 'Office Hours', value: 'Monday – Friday, 9:00 AM – 5:30 PM AEST', icon: 'clock-circle' }
];
```

---

## State Transitions

All entities are **read-only** at runtime — no entity state transitions exist. The only state mutations in the UI:

| Entity | Signal | Mutation | Where |
|---|---|---|---|
| Contact Form | `formSubmitted: Signal<boolean>` | `false → true` on valid submit | ContactFormComponent |
| FAQ Accordion | `expandedId: Signal<string \| null>` | Toggles on accordion item click | FaqListComponent |
| Mobile nav | `menuOpen: Signal<boolean>` | Toggles on hamburger click | NavHeaderComponent |

---

## Entity Relationships Diagram

```
CLUBS_DATA [Club []]
  └── Club
        ├── activities: Activity[]
        └── (no FK refs to other entities)

TEAM_DATA [TeamMember[]]          → About page only

FAQ_DATA [FaqItem[]]              → FAQ page only
  └── FaqItem.category            → used for grouping in FaqListComponent

CONTACT_DATA [ContactDetail[]]    → Contact page only
```
