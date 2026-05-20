// T014 — Mock data: 9 sports clubs
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
    accentColor: '#22C55E',
    description:
      'City Football FC has been the heartbeat of Melbourne\'s football community since 1998. From grassroots youth academies to competitive senior leagues, we nurture talent at every level. Our state-of-the-art training facilities and dedicated coaching staff ensure every member — from beginner to elite — reaches their full potential.\n\nOur philosophy is simple: football is for everyone. We welcome players of all backgrounds, ages, and skill levels, creating an inclusive environment where sport builds character and community.',
    achievements: [
      'Victorian State League Champions 2019 & 2022',
      '3× Junior Development Club of the Year',
      'Over 40 players promoted to national academies',
      'Community Choice Award — Most Inclusive Club 2023',
    ],
    activities: [
      {
        name: 'Junior Academy (U8–U16)',
        description: 'Skills-based training every Saturday morning, focusing on technique and teamwork.',
        schedule: 'Saturday, 08:00–10:00',
      },
      {
        name: 'Senior Competitive League',
        description: 'Competitive matches in the Victorian State League, training twice weekly.',
        schedule: 'Tuesday & Thursday, 19:00–21:00',
      },
      {
        name: 'Social Six-a-Side',
        description: 'Friendly six-a-side games open to all ages and skill levels.',
        schedule: 'Sunday, 10:00–12:00',
      },
      {
        name: 'Goalkeeper Specialist Programme',
        description: 'Dedicated goalkeeper coaching for all age groups.',
        schedule: 'Wednesday, 17:30–19:00',
      },
    ],
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
    accentColor: '#F59E0B',
    description:
      'Metro Basketball Club is Sydney\'s premier basketball development program. With a philosophy built on discipline, teamwork, and explosive athleticism, Metro has produced multiple NBL development squad nominees. Our indoor courts are available year-round and our coaching staff includes former professional players.\n\nFrom our beginners programmes for children to our elite squads competing at state level, we provide structured pathways that turn passionate players into accomplished athletes.',
    achievements: [
      'NSW Basketball State Championships — Gold 2021',
      '5 players selected for NSW State representation teams',
      'Best Junior Program — Basketball NSW 2020 & 2023',
      'Under-18 National Invitational Semifinalists 2022',
    ],
    activities: [
      {
        name: 'Elite Development Squad',
        description: 'High-performance sessions for players aged 14+ showing elite potential.',
        schedule: 'Monday & Wednesday, 18:30–20:30',
      },
      {
        name: 'Junior Fundamentals',
        description: 'Dribbling, shooting, and defensive foundations for children 6–13.',
        schedule: 'Saturday, 09:00–10:30',
      },
      {
        name: '3-on-3 Street League',
        description: 'Competitive 3-on-3 format league running across school terms.',
        schedule: 'Friday, 17:00–20:00',
      },
      {
        name: 'Shooting Clinics',
        description: 'Specialist sessions focused on shooting mechanics and consistency.',
        schedule: 'Sunday, 11:00–12:30',
      },
    ],
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
    accentColor: '#EF4444',
    description:
      'Harbour Tennis Club combines a rich 40-year history with a forward-thinking approach to player development. Set on 12 all-weather courts with floodlighting, we offer programmes for the social player through to the ranked competitor. Our PTQ-certified coaching team has guided members to national junior championships.\n\nWhether you\'re picking up a racquet for the first time or aiming for the national rankings, Harbour Tennis Club offers the courts, coaching, and community to take your game to the next level.',
    achievements: [
      'Queensland Tennis Club of the Year 2018 & 2022',
      '12 all-weather courts with full floodlighting',
      'Junior member ranked in Top 50 nationally (2023)',
      'Mixed Doubles State Open Champions 2021',
    ],
    activities: [
      {
        name: 'Cardio Tennis',
        description: 'High-energy group fitness session using tennis as the workout medium.',
        schedule: 'Tuesday & Thursday, 07:00–08:00',
      },
      {
        name: 'Junior Competition Pathway',
        description: 'Structured pathway from green-ball through to full yellow-ball competition.',
        schedule: 'Wednesday, 16:00–18:00',
      },
      {
        name: 'Social Round Robin',
        description: 'Rotating doubles format — great way to meet other members.',
        schedule: 'Saturday, 13:00–16:00',
      },
      {
        name: 'Private & Semi-Private Coaching',
        description: 'One-on-one and two-on-one coaching sessions bookable through the club app.',
        schedule: 'Flexible — by appointment',
      },
    ],
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
    accentColor: '#06B6D4',
    description:
      'Aqua Swim Club is Western Australia\'s most decorated swimming programme. Spanning competitive squads, masters swimming, and learn-to-swim, we serve members aged 4 to 80+. Our Olympic-length 50-metre pool, full timing infrastructure, and AIS-certified coaches give members access to elite-level training year-round.\n\nOur inclusive approach means that we cater to casual fitness swimmers and aspiring Olympians alike, creating a welcoming environment where progress is celebrated at every level.',
    achievements: [
      'WA State Swimming Championships — 14 gold medals (2023)',
      '3 members represented Australia at World Junior Championships',
      'WA Swim Club of the Decade — Swimming Australia 2020',
      'Accessible Sports Inclusion Award 2022',
    ],
    activities: [
      {
        name: 'Junior Pathfinders Squad',
        description: 'Development squad for competitive juniors aged 8–14, four sessions per week.',
        schedule: 'Mon/Wed/Fri 06:00–07:30, Sat 07:00–08:30',
      },
      {
        name: 'Masters Swimming',
        description: 'Coached sessions for adults 18+ focused on technique and competition preparation.',
        schedule: 'Tuesday & Thursday, 20:00–21:30',
      },
      {
        name: 'Learn to Swim',
        description: 'Structured programme for children aged 4–8 in a safe, fun environment.',
        schedule: 'Saturday, 09:00–10:00',
      },
      {
        name: 'Open Water Training',
        description: 'Open-water acclimatisation sessions at the local harbour.',
        schedule: 'Sunday, 07:00–08:30 (summer only)',
      },
    ],
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
    accentColor: '#8B5CF6',
    description:
      'Grassroots Cricket Club is one of South Australia\'s oldest and proudest cricket institutions. With over 50 years of history, the club fields 8 senior teams across the Adelaide Metropolitan Cricket Association and runs one of the region\'s largest junior programmes. The culture of Grassroots is built on mateship, discipline, and a deep respect for the game.\n\nFrom the youngest T20 Blast participants to our Grade 1 championship-winning senior side, every Grassroots member is part of a tradition that spans generations.',
    achievements: [
      'AMCA Grade 1 Premiers 2017, 2019 & 2023',
      '8 senior teams across all AMCA grades',
      'Junior Club of the Year — Cricket SA 2021',
      'Over 15 members represented SA at age-group level',
    ],
    activities: [
      {
        name: 'Senior Grade Cricket',
        description: 'Competitive Saturday grade matches (two-day and one-day formats) across 8 teams.',
        schedule: 'Saturday & Sunday (match days, Oct–Mar)',
      },
      {
        name: 'Junior T20 Blast',
        description: 'Fast and fun introductory T20 format for ages 8–14.',
        schedule: 'Saturday morning (Oct–Mar)',
      },
      {
        name: 'Batting Academy',
        description: 'Specialist batting coaching with video analysis and net sessions.',
        schedule: 'Tuesday, 18:00–20:00',
      },
      {
        name: "Women's & Girls' Programme",
        description: "Dedicated women's competition and all-girls coaching pathway.",
        schedule: 'Thursday, 17:30–19:30',
      },
    ],
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
    accentColor: '#EC4899',
    description:
      'Shuttle Badminton Club has grown from a small community group to the ACT\'s premier badminton hub. With 10 indoor courts at our dedicated venue, we run everything from beginner-friendly social sessions to BWF-registered competitive teams. Our focus on technique-first coaching ensures members improve consistently regardless of starting level.\n\nWe pride ourselves on creating an atmosphere where competitive drive and social enjoyment coexist — you\'ll find fierce competitors and casual players sharing the same courts every week.',
    achievements: [
      'ACT Open Doubles Champions 2022 & 2023',
      '2 members selected for ACT State Teams',
      'Club membership grew 60% between 2020–2024',
      'Best Recreational Sports Programme — ACT Sport Awards 2022',
    ],
    activities: [
      {
        name: 'Social Drop-in Sessions',
        description: 'Relaxed social play with rotating partners, suitable for all levels.',
        schedule: 'Monday, Wednesday & Friday, 19:00–22:00',
      },
      {
        name: 'Competitive League',
        description: 'Internal club league with ranked divisions and monthly standings.',
        schedule: 'Sunday, 14:00–18:00',
      },
      {
        name: 'Youth Development',
        description: 'Structured coaching for players aged 10–17, progressing from basics to competition.',
        schedule: 'Saturday, 10:00–12:00',
      },
      {
        name: 'Doubles Masterclass',
        description: 'Advanced session on doubles tactics, positioning, and communication.',
        schedule: 'Thursday, 19:00–21:00',
      },
    ],
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
    accentColor: '#FF6B35',
    description:
      "Velocity Athletics Club is Melbourne's go-to home for sprinters, distance runners, and field event athletes. Training on a certified 400-metre track with full field facilities, members benefit from biomechanics-led coaching and a thriving competitive programme. We compete at state, national and international open-track meets.\n\nOur coaching staff, which includes former national athletes, brings a scientific approach to training that yields measurable improvements for every athlete — from the first-time jogger to the championship contender.",
    achievements: [
      '12 State Champions across sprint, middle-distance & jumps (2023)',
      '3 members qualified for Athletics Australia national squad',
      'Club Record holders in 100m, 400m, Long Jump & High Jump',
      'Victorian Athletics Club of the Year 2020',
    ],
    activities: [
      {
        name: 'Sprint & Speed Development',
        description:
          'Biomechanics-led sprint coaching covering starts, acceleration, and max velocity phases.',
        schedule: 'Tuesday & Thursday, 17:30–19:30',
      },
      {
        name: 'Distance Running Group',
        description: 'Structured interval and long-run sessions for 1500m to marathon runners.',
        schedule: 'Monday & Wednesday, 06:00–07:30',
      },
      {
        name: 'Field Events Academy',
        description: 'Technical coaching for long jump, high jump, shot put, and javelin.',
        schedule: 'Saturday, 09:00–12:00',
      },
      {
        name: 'Junior Track Programme',
        description: 'Introductory athletics for 8–15 year olds covering all disciplines.',
        schedule: 'Sunday, 09:30–11:30',
      },
    ],
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
    accentColor: '#3B82F6',
    description:
      "Peloton Cycling Club is a community of road cyclists passionate about both performance and the sheer joy of riding. From weekly group rides through the Blue Mountains to criterium racing and time trials, we offer a full cycling experience. Our PMBIA-accredited coaches provide structured training plans adapted to power-meter-based workouts.\n\nOur club culture is built around the shared experience of the ride — from the camaraderie of a pre-dawn Saturday group ride to the focused intensity of Wednesday night crits, every pedal stroke brings the Peloton community closer together.",
    achievements: [
      'Tour de Cure charity ride — raised $520,000 since 2015',
      'Masters Criterium Champions NSW 2022',
      'Club Challenge — highest average VO2 max improvement 2023',
      'Cycling NSW Active Club of the Year 2021',
    ],
    activities: [
      {
        name: 'Saturday Group Ride',
        description: 'Weekly group road ride at A, B, and C pace groups — distances 60–120 km.',
        schedule: 'Saturday, 06:30 departure',
      },
      {
        name: 'Criterium Racing',
        description: 'Wednesday-night criterium series on a closed circuit for competitive members.',
        schedule: 'Wednesday, 18:00–21:00 (Oct–Apr)',
      },
      {
        name: 'Indoor Training Sessions',
        description: 'Structured trainer sessions led by a certified coach via our club Zwift Meetup.',
        schedule: 'Tuesday & Thursday, 06:00–07:00',
      },
      {
        name: 'Learn to Ride Club',
        description: 'Beginner-friendly rides on quiet paths for those new to road cycling.',
        schedule: 'Sunday, 08:00–10:00',
      },
    ],
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
    accentColor: '#DC2626',
    description:
      "Iron Fist Boxing Club has produced some of Queensland's most decorated amateur and professional boxers since 2000. The gym's no-nonsense culture values respect, hard work, and personal growth above all. Whether you're stepping into the ring for the first time or preparing for your next amateur bout, Iron Fist provides the environment and expertise to get you there.\n\nBeyond the competitive programme, Iron Fist runs one of Queensland's most successful community outreach initiatives, using boxing as a vehicle for youth development and positive behavioural change.",
    achievements: [
      'QLD Amateur Boxing Championships — 6 gold medals (2023)',
      '2 members progressed to professional ranks',
      'Community Safety Initiative — Youth Boxing Diversion Program',
      'Boxing Queensland Club of the Year 2019 & 2022',
    ],
    activities: [
      {
        name: 'Boxing Fitness Classes',
        description:
          'Non-contact pad work and conditioning sessions — perfect for fitness without sparring.',
        schedule: 'Mon, Wed & Fri, 06:00–07:00 & 18:00–19:00',
      },
      {
        name: 'Amateur Competition Squad',
        description: 'Full technical training for members preparing for sanctioned amateur bouts.',
        schedule: 'Tuesday & Thursday, 17:00–19:30',
      },
      {
        name: 'White Collar Boxing',
        description: '10-week programme for working professionals, culminating in a charity event.',
        schedule: 'Starting February & July each year',
      },
      {
        name: 'Youth Development Programme',
        description: 'After-school boxing for 12–17 year olds — structured, safe, and supervised.',
        schedule: 'Monday & Wednesday, 15:30–17:00',
      },
    ],
  },
];
