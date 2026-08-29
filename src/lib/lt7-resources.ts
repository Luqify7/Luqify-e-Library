import { createServerSupabase } from "@/lib/supabase-server";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export type LT7Resource = {
  id: string;
  title: string | null;
  file_name: string | null;
  file_type: string | null;
  file_url: string | null;
  faculty: string | null;
  programme: string | null;
  year: string | null;
  semester: string | null;
  course: string | null;
  category: string | null;
  created_at: string | null;
};

export type LT7ResourceWithContent = LT7Resource & {
  extracted_text: string;
};

function normalize(
  value: string | null | undefined
): string {
  return (value ?? "")
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "what",
  "how",
  "why",
  "can",
  "you",
  "please",
  "give",
  "tell",
  "about",
  "explain",
  "help",
  "with",
  "from",
  "using",
  "available",
  "resources",
  "resource",
  "library",
  "luqify",
  "e",
  "find",
  "show",
  "me",
  "are",
  "there",
  "does",
  "this",
  "that",
  "into",
  "have",
  "has",
  "its",
  "their",
  "related",
  "course",
  "programme",
  "program",
]);

function getQuestionWords(
  question: string
): string[] {
  return normalize(question)
    .split(/\s+/)
    .filter(
      (word) =>
        word.length >= 3 &&
        !STOP_WORDS.has(word)
    );
}

function getResourceText(
  resource: LT7Resource
): string {
  return normalize(
    [
      resource.title,
      resource.file_name,
      resource.faculty,
      resource.programme,
      resource.year,
      resource.semester,
      resource.course,
      resource.category,
    ]
      .filter(Boolean)
      .join(" ")
  );
}

/**
 * Search the resources table using metadata.
 *
 * Important:
 * This function only searches metadata.
 * Actual document reading happens separately.
 */
export async function searchLT7Resources(
  question: string
): Promise<LT7Resource[]> {
  const supabase =
    await createServerSupabase();

  const { data, error } = await supabase
    .from("resources")
    .select(
      `
        id,
        title,
        file_name,
        file_type,
        file_url,
        faculty,
        programme,
        year,
        semester,
        course,
        category,
        created_at
      `
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "LT7 RESOURCE SEARCH ERROR:",
      error
    );

    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  const words =
    getQuestionWords(question);

  const normalizedQuestion =
    normalize(question);

  const asksAboutAccounting =
    normalizedQuestion.includes(
      "accounting"
    );

  const asksAboutFinancialAccounting =
    normalizedQuestion.includes(
      "financial accounting"
    );

  const scored = (
    data as LT7Resource[]
  )
    .map((resource) => {
      const searchableText =
        getResourceText(resource);

      const title =
        normalize(resource.title);

      const course =
        normalize(resource.course);

      const programme =
        normalize(resource.programme);

      const category =
        normalize(resource.category);

      let score = 0;

      /*
       * Strong matches
       */

      if (
        asksAboutFinancialAccounting &&
        (
          course.includes(
            "financial accounting"
          ) ||
          title.includes(
            "financial accounting"
          ) ||
          searchableText.includes(
            "financial accounting"
          )
        )
      ) {
        score += 20;
      }

      if (
        asksAboutAccounting &&
        course.includes("accounting")
      ) {
        score += 12;
      }

      if (
        asksAboutAccounting &&
        title.includes("accounting")
      ) {
        score += 10;
      }

      if (
        asksAboutAccounting &&
        programme.includes("accounting")
      ) {
        score += 5;
      }

      /*
       * Individual keyword matches
       */

      for (const word of words) {
        if (title.includes(word)) {
          score += 6;
        }

        if (course.includes(word)) {
          score += 7;
        }

        if (category.includes(word)) {
          score += 2;
        }

        if (programme.includes(word)) {
          score += 3;
        }

        if (
          searchableText.includes(word)
        ) {
          score += 1;
        }
      }

      return {
        resource,
        score,
      };
    })
    .filter(
      (item) => item.score > 0
    )
    .sort(
      (a, b) =>
        b.score - a.score
    );

  /*
   * If the question specifically asks for
   * Financial Accounting, don't return unrelated
   * Accounting-programme resources such as
   * Academic Writing simply because they belong
   * to the Accounting programme.
   */

  if (asksAboutFinancialAccounting) {
    const exactMatches =
      scored.filter(
        (item) => {
          const resource =
            item.resource;

          const title =
            normalize(resource.title);

          const course =
            normalize(resource.course);

          return (
            title.includes(
              "financial accounting"
            ) ||
            course.includes(
              "financial accounting"
            )
          );
        }
      );

    if (
      exactMatches.length > 0
    ) {
      return exactMatches
        .slice(0, 8)
        .map(
          (item) =>
            item.resource
        );
    }

    /*
     * No exact Financial Accounting
     * resources found.
     *
     * Do NOT falsely return Academic
     * Writing resources.
     */

    return [];
  }

  return scored
    .slice(0, 8)
    .map(
      (item) =>
        item.resource
    );
}

/**
 * Download and extract the actual contents
 * of a library resource.
 *
 * Currently supported:
 *
 * PDF
 * DOCX
 *
 * Other file types are returned with empty
 * extracted text.
 */
export async function extractLT7ResourceText(
  resource: LT7Resource
): Promise<string> {
  if (!resource.file_url) {
    return "";
  }

  const fileName =
    resource.file_name ?? "";

  const fileType =
    normalize(resource.file_type);

  const lowerFileName =
    fileName.toLowerCase();

  const isPdf =
    fileType.includes(
      "application/pdf"
    ) ||
    lowerFileName.endsWith(".pdf");

  const isDocx =
    fileType.includes(
      "wordprocessingml.document"
    ) ||
    lowerFileName.endsWith(".docx");

  if (!isPdf && !isDocx) {
    console.log(
      "LT7 DOCUMENT READER: Unsupported file type:",
      fileName
    );

    return "";
  }

  try {
    console.log(
      "LT7 DOCUMENT READER: Downloading:",
      fileName
    );

    const response = await fetch(
      resource.file_url,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "LT7 DOCUMENT DOWNLOAD FAILED:",
        response.status,
        response.statusText,
        fileName
      );

      return "";
    }

    const contentLength =
      response.headers.get(
        "content-length"
      );

    /*
     * Protect the server from accidentally
     * downloading extremely large resources.
     */

    const MAX_FILE_SIZE =
      12 * 1024 * 1024;

    if (
      contentLength &&
      Number(contentLength) >
        MAX_FILE_SIZE
    ) {
      console.warn(
        "LT7 DOCUMENT TOO LARGE:",
        fileName
      );

      return "";
    }

    const arrayBuffer =
      await response.arrayBuffer();

    if (
      arrayBuffer.byteLength >
      MAX_FILE_SIZE
    ) {
      console.warn(
        "LT7 DOCUMENT TOO LARGE AFTER DOWNLOAD:",
        fileName
      );

      return "";
    }

    const buffer =
      Buffer.from(arrayBuffer);

    /*
     * PDF
     */

    if (isPdf) {
      console.log(
        "LT7 DOCUMENT READER: Extracting PDF:",
        fileName
      );

      const parser =
        new PDFParse({
          data: buffer,
        });

      try {
        const result =
          await parser.getText();

        return cleanExtractedText(
          result.text
        );
      } finally {
        await parser.destroy();
      }
    }

    /*
     * DOCX
     */

    if (isDocx) {
      console.log(
        "LT7 DOCUMENT READER: Extracting DOCX:",
        fileName
      );

      const result =
        await mammoth.extractRawText({
          buffer,
        });

      return cleanExtractedText(
        result.value
      );
    }

    return "";
  } catch (error) {
    console.error(
      "LT7 DOCUMENT EXTRACTION ERROR:",
      fileName,
      error
    );

    return "";
  }
}

/**
 * Clean extracted text before sending it
 * to Gemini.
 */
function cleanExtractedText(
  text: string
): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Read the contents of multiple resources.
 *
 * We deliberately limit the number of resources
 * and amount of text sent to Gemini.
 */
export async function readLT7Resources(
  resources: LT7Resource[]
): Promise<LT7ResourceWithContent[]> {
  const MAX_RESOURCES_TO_READ = 4;

  const selectedResources =
    resources.slice(
      0,
      MAX_RESOURCES_TO_READ
    );

  const results: LT7ResourceWithContent[] =
    [];

  for (const resource of selectedResources) {
    const extractedText =
      await extractLT7ResourceText(
        resource
      );

    if (!extractedText) {
      continue;
    }

    results.push({
      ...resource,
      extracted_text:
        extractedText,
    });
  }

  return results;
}