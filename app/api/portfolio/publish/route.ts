import { NextRequest, NextResponse } from 'next/server';
import { publishPortfolio } from '@/lib/services/portfolio-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { personalInfo, professional, aiPortfolio } = body;

        if (!personalInfo || !professional || ! aiPortfolio) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!personalInfo. name || personalInfo.name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const result = await publishPortfolio({
      personalInfo,
      professional,
      aiPortfolio,
    });

    return NextResponse.json({
      success: true,
      code: result.code,
      url: `/p/${result.code}`,
    });

  } catch (error) {
    console.error('Error publishing portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to publish portfolio' },
      { status: 500 }
    );
  }
}