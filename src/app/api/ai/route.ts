import { GoogleGenerativeAI } from "@google/generative-ai";


export async function POST(req: Request) {

  try {

    const { message } = await req.json();


    if (!message) {

      return Response.json(
        {
          error: "No question provided",
        },
        {
          status: 400,
        }
      );

    }


    const apiKey = process.env.GEMINI_API_KEY;


    if (!apiKey) {

      return Response.json(
        {
          error: "Gemini API key missing",
        },
        {
          status: 500,
        }
      );

    }


    const genAI = new GoogleGenerativeAI(apiKey);


    const model = genAI.getGenerativeModel({

      model: "gemini-2.0-flash",

    });



    const result = await model.generateContent(
      `
You are LT7, the intelligent academic assistant of Luqify e-Library.

Rules:
- Explain concepts clearly for university students.
- Use simple language.
- Give examples when useful.
- Help with notes, summaries and quizzes.
- Stay focused on education.

Student question:

${message}
`
    );


    const answer = result.response.text();


    return Response.json({

      reply: answer,

    });



  } catch (error) {


    console.error("LT7 ERROR:", error);


    return Response.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );


  }

}