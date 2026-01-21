import { getDatabase } from '@/lib/mongodb';
import { nanoid } from 'nanoid';

export interface PublishedPortfolio {
  code: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    linkedIn: string;
    github?:  string;
    location?:  string;
    profileImage?: string;
  };
  professional: {
    skills: string;
    experienceYears: string;
    summary: string;
    domain: string;
  };
  aiPortfolio:  {
    summary?:  string;
    skills?:  string[];
    experience?: {
      company: string;
      role: string;
      duration: string;
      points: string[];
    }[];
    projects?: {
      name: string;
      tech: string[];
      description: string;
    }[];
  };
  createdAt: Date;
  views: number;
}

const COLLECTION_NAME = 'portfolios';

export async function publishPortfolio(data: {
  personalInfo: PublishedPortfolio['personalInfo'];
  professional: PublishedPortfolio['professional'];
  aiPortfolio: PublishedPortfolio['aiPortfolio'];
}): Promise<{ code: string; success: boolean }> {
  const db = await getDatabase();
  const collection = db.collection<PublishedPortfolio>(COLLECTION_NAME);

  let code = nanoid(7);

  const portfolio:  PublishedPortfolio = {
    code,
    personalInfo: data.personalInfo,
    professional: data.professional,
    aiPortfolio: data.aiPortfolio,
    createdAt: new Date(),
    views: 0,
  };
  await collection.insertOne(portfolio);

  return { code, success: true };
}

export async function getPortfolioByCode(
  code: string
): Promise<PublishedPortfolio | null> {
  const db = await getDatabase();
  const collection = db.collection<PublishedPortfolio>(COLLECTION_NAME);

  const portfolio = await collection.findOne({ code });

  return portfolio;
}