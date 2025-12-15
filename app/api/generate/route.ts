import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({
  apiKey:  process.env. GROQ_API_KEY!,
});

// Domain-specific guidance for the AI
const DOMAIN_PROMPTS:  Record<string, string> = {
  software_developer: `
    DOMAIN:  Software Development / Engineering
    - Focus on technical skills, programming languages, frameworks, and tools
    - Highlight code quality, system design, and problem-solving abilities
    - Use technical action verbs:  Architected, Implemented, Debugged, Refactored, Deployed, Optimized
  `,
  data_science: `
    DOMAIN: Data Science / Machine Learning
    - Focus on ML/AI frameworks, statistical analysis, and data processing skills
    - Highlight model accuracy, data pipeline efficiency, and insights generated
    - Use action verbs: Analyzed, Modeled, Predicted, Trained, Validated, Visualized
  `,
  medical:  `
    DOMAIN: Medical / Healthcare Professional
    - Focus on clinical skills, patient care, certifications, and specializations
    - Highlight patient outcomes, care quality metrics, and procedural expertise
    - Use action verbs: Diagnosed, Treated, Administered, Coordinated, Assessed, Monitored
  `,
  marketing: `
    DOMAIN: Marketing / Digital Marketing
    - Focus on campaign management, analytics tools, and creative skills
    - Highlight ROI, conversion rates, engagement metrics, and brand growth
    - Use action verbs: Launched, Increased, Targeted, Optimized, Branded, Converted
  `,
  finance: `
    DOMAIN: Finance / Accounting
    - Focus on financial analysis, reporting, compliance, and software proficiency
    - Highlight cost savings, revenue impact, audit success, and accuracy metrics
    - Use action verbs: Analyzed, Forecasted, Audited, Reconciled, Budgeted, Reported
  `,
  design: `
    DOMAIN: UI/UX Design / Graphic Design
    - Focus on design tools, user research, prototyping, and visual skills
    - Highlight user satisfaction scores, conversion improvements, and design systems
    - Use action verbs: Designed, Prototyped, Researched, Iterated, Created, Collaborated
  `,
  education: `
    DOMAIN: Education / Teaching
    - Focus on curriculum development, teaching methodologies, and subject expertise
    - Highlight student outcomes, engagement rates, and program improvements
    - Use action verbs: Taught, Mentored, Developed, Assessed, Facilitated, Inspired
  `,
  legal: `
    DOMAIN: Legal / Law
    - Focus on legal research, case management, and specialization areas
    - Highlight case outcomes, client satisfaction, and regulatory compliance
    - Use action verbs:  Represented, Negotiated, Drafted, Litigated, Advised, Researched
  `,
  sales: `
    DOMAIN: Sales / Business Development
    - Focus on sales techniques, CRM tools, and relationship management
    - Highlight revenue generated, deals closed, and quota achievement
    - Use action verbs:  Closed, Generated, Exceeded, Prospected, Negotiated, Retained
  `,
  hr: `
    DOMAIN: Human Resources
    - Focus on recruitment, employee relations, HRIS systems, and policy development
    - Highlight hiring metrics, retention rates, and program implementations
    - Use action verbs: Recruited, Onboarded, Implemented, Mediated, Developed, Streamlined
  `,
  engineering: `
    DOMAIN: Engineering (Non-Software)
    - Focus on technical specifications, project management, and industry standards
    - Highlight project completions, efficiency improvements, and safety records
    - Use action verbs: Engineered, Designed, Tested, Fabricated, Improved, Supervised
  `,
  content: `
    DOMAIN: Content Writing / Journalism
    - Focus on writing skills, content strategy, and editorial experience
    - Highlight readership growth, engagement metrics, and publication achievements
    - Use action verbs: Wrote, Published, Edited, Researched, Interviewed, Increased
  `,
  consulting: `
    DOMAIN: Consulting / Management
    - Focus on strategic planning, problem-solving, and client management
    - Highlight client outcomes, project deliveries, and business impact
    - Use action verbs: Advised, Strategized, Delivered, Transformed, Recommended, Analyzed
  `,
  research: `
    DOMAIN: Research / Academia
    - Focus on research methodologies, publications, and academic achievements
    - Highlight citations, grants received, and research impact
    - Use action verbs:  Researched, Published, Presented, Collaborated, Discovered, Analyzed
  `,
  other: `
    DOMAIN: General Professional
    - Focus on transferable skills, achievements, and professional growth
    - Highlight measurable outcomes and key contributions
    - Use relevant action verbs based on the specific field
  `,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Extract domain from the request body
    const domain = body.professional?. domain || "other";
    const domainGuidance = DOMAIN_PROMPTS[domain] || DOMAIN_PROMPTS.other;

    // IMPORTANT: Remove profileImage from the data sent to AI (it's too large!)
    // Create a clean copy without the base64 image
    const cleanedBody = {
      personalInfo: {
        name: body.personalInfo?.name || "",
        email:  body.personalInfo?. email || "",
        phone: body.personalInfo?.phone || "",
        location: body.personalInfo?.location || "",
        github: body.personalInfo?.github || "",
        linkedIn: body.personalInfo?.linkedIn || "",
        // DO NOT include profileImage - it's base64 and very large
      },
      professional: {
        skills: body.professional?. skills || "",
        experienceYears: body.professional?.experienceYears || "",
        summary: body.professional?. summary || "",
        domain: body.professional?. domain || "",
      },
      projects: {
        project1: body.projects?.project1 || "",
        project2: body. projects?.project2 || "",
      },
      experience: {
        exp1: body.experience?.exp1 || "",
        exp2: body.experience?. exp2 || "",
      },
    };

    const prompt = `
You are an expert portfolio content generator. 

Convert the user input into a professional JSON object for a portfolio website. 

${domainGuidance}

====================
OUTPUT FORMAT (STRICT)
====================
Return ONLY valid JSON.  No markdown, no backticks, no explanations.

{
  "summary": "2-3 sentence professional summary",
  "skills": ["Skill1", "Skill2"],
  "experience":  [
    {
      "company": "Company Name",
      "role": "Job Title",
      "duration": "Date Range",
      "points": ["Achievement 1", "Achievement 2"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "tech": ["Tech1", "Tech2"],
      "description": "Project description"
    }
  ]
}

====================
RULES
====================
- SKILLS:  Split by commas, capitalize properly (react → React)
- EXPERIENCE: Use strong action verbs, create achievement-oriented bullet points
- PROJECTS:  Infer tech stack, write professional descriptions
- SUMMARY:  Write a compelling 2-3 sentence professional summary tailored to the domain
- If data is missing, make reasonable assumptions
- Keep it concise and professional

====================
USER INPUT
====================
${JSON.stringify(cleanedBody, null, 2)}
`;

    const response = await client.chat.completions.create({
      model:  "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "Return strict JSON only.  No markdown." },
        { role: "user", content: prompt },
      ],
      temperature: 0.1,
      max_tokens: 2000,
    });

    let output = response.choices[0].message.content || "";

    // Clean up the response
    output = output
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Try to extract JSON if there's extra text
    const jsonMatch = output.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      output = jsonMatch[0];
    }

    const json = JSON.parse(output);

    return NextResponse.json({
      success: true,
      aiPortfolio: json, // Changed from aiResume to aiPortfolio
    });
  } catch (err:  any) {
    console.error("AI Parsing Error:", err);

    // Provide more specific error messages
    let errorMessage = "AI generation failed";
    if (err?. message?.includes("context_length_exceeded")) {
      errorMessage = "Input too long.  Please reduce the amount of text.";
    } else if (err?.status === 429) {
      errorMessage = "Rate limit exceeded. Please try again in a moment.";
    }

    return NextResponse.json(
      { success: false, error:  errorMessage },
      { status: 500 }
    );
  }
}