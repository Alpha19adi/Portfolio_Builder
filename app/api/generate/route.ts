import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
Your job is to output STRICT JSON ONLY.
Do not include backticks, markdown, comments.
Use this structure:
{
  "summary": "",
  "skills": [],
  "experience": [
    { "company": "", "role": "", "duration": "", "points": [] }
  ],
  "projects": [
    { "name": "", "tech": [], "description": "" }
  ]
}

USER INPUT:
${JSON.stringify(body, null, 2)}
`;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "Return strict JSON only." },
        { role: "user", content: prompt },
      ],
      temperature: 0,
    });

    let output = response.choices[0].message.content || "";
    output = output
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const json = JSON.parse(output);

    return NextResponse.json({
      success: true,
      aiResume: json,
    });

  } catch (err) {
    console.error("AI Parsing Error:", err);
    return NextResponse.json(
      { success: false, error: "AI generation failed" },
      { status: 500 }
    );
  }
}
