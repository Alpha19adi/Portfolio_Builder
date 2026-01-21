import { getPortfolioByCode } from '@/lib/services/portfolio-service';
import { notFound } from 'next/navigation';
import { PublicPortfolioWrapper } from './PublicPortfolioWrapper';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ code: string }>;
}

export default async function PublicPortfolioPage({ params }: PageProps) {
  const { code } = await params;
  const portfolio = await getPortfolioByCode(code);

  if (!portfolio) {
    notFound();
  }

  return <PublicPortfolioWrapper portfolio={portfolio} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { code } = await params;
  const portfolio = await getPortfolioByCode(code);

  if (!portfolio) {
    return { title: 'Portfolio Not Found' };
  }

  return {
    title: `${portfolio.personalInfo.name} | Portfolio`,
    description: portfolio.aiPortfolio?.summary || `${portfolio.personalInfo.name}'s portfolio`,
  };
}
