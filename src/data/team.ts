/**
 * Team Member Data
 * 
 * Information about the Amanar Carbon team for the About page.
 * This data structure supports easy updates and additions as the team grows.
 */

import { TeamMember } from '../types';

export const teamMembers: TeamMember[] = [
  {
    name: 'Dr. Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former Director of Carbon Markets at Goldman Sachs with 15+ years in environmental finance. PhD in Environmental Economics from Stanford.',
    expertise: ['Carbon Markets', 'Environmental Finance', 'Policy Development', 'Risk Management']
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO & Co-Founder',
    bio: 'Ex-Google Earth Engine lead engineer with expertise in satellite data processing and machine learning for environmental monitoring.',
    expertise: ['Satellite Data', 'Machine Learning', 'Earth Observation', 'Platform Architecture']
  },
  {
    name: 'Dr. Amara Okafor',
    role: 'Chief Science Officer',
    bio: 'Leading carbon cycle researcher with 20+ publications. Former IPCC contributing author and NASA climate scientist.',
    expertise: ['Carbon Cycle Science', 'Climate Modeling', 'MRV Methodologies', 'Scientific Research']
  },
  {
    name: 'James Thompson',
    role: 'Head of Product',
    bio: 'Product leader from Bloomberg Terminal team, specializing in financial data platforms and user experience design.',
    expertise: ['Product Strategy', 'Financial Data', 'User Experience', 'Platform Design']
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Head of Ratings',
    bio: 'Former Moody\'s senior analyst with expertise in ESG ratings and risk assessment methodologies.',
    expertise: ['Credit Ratings', 'Risk Assessment', 'ESG Analysis', 'Methodology Development']
  },
  {
    name: 'Alex Kim',
    role: 'Head of Engineering',
    bio: 'Engineering leader from Stripe with experience building scalable financial infrastructure and data platforms.',
    expertise: ['Platform Engineering', 'Data Infrastructure', 'Financial Systems', 'Team Leadership']
  }
];

export const advisors: TeamMember[] = [
  {
    name: 'Lord Nicholas Stern',
    role: 'Strategic Advisor',
    bio: 'Author of the Stern Review on the Economics of Climate Change and former World Bank Chief Economist.',
    expertise: ['Climate Economics', 'Policy Development', 'International Finance']
  },
  {
    name: 'Dr. Barbara Haya',
    role: 'Scientific Advisor',
    bio: 'Director of the Berkeley Carbon Trading Project and leading researcher on carbon offset effectiveness.',
    expertise: ['Carbon Offset Research', 'Policy Analysis', 'Market Mechanisms']
  }
];