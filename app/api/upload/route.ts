export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import mammoth from "mammoth";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ----------------------------
// Gemini: Upload file + OCR
// ----------------------------

function bufferToArrayBuffer(buffer: Buffer): ArrayBuffer {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; i++) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
}


async function geminiExtractFileText(
  buffer: Buffer,
  fileName: string,
  mime: string
) {
  // Upload the file to Gemini
  const uploadRes = await fetch(
    `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": mime,
        "X-Goog-Upload-File-Name": fileName,
        "X-Goog-Upload-Protocol": "raw",
      },
      body: new Uint8Array(buffer), // Convert Buffer → Uint8Array
    }
  );

  const uploadJson = await uploadRes.json();
  const fileUri = uploadJson?.file?.uri;

  if (!fileUri) throw new Error("Gemini upload failed");

  // Extract text using Flash model (free)
  const extractRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { fileData: { fileUri } },
              { text: "Extract all readable text from this document." },
            ],
          },
        ],
      }),
    }
  );

  const extractJson = await extractRes.json();
  return extractJson?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

// ----------------------------
// Gemini: Embeddings
// ----------------------------

// async function geminiEmbed(text: string) {
//   const url = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${process.env.GEMINI_API_KEY}`;

//   const res = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       model: "models/text-embedding-004",
//       content: {
//         parts: [{ text }]
//       }
//     }),
//   });

//   const json = await res.json();

//   console.log("GEMINI RAW EMBEDDING:", json);

//   // Correct embedding path:
//   const vector =
//     json?.embedding?.values ||
//     json?.content?.embedding?.values ||
//     json?.embeddings?.[0]?.values ||
//     [];

//   if (!Array.isArray(vector) || vector.length === 0) {
//     throw new Error("❌ Gemini returned EMPTY embedding!");
//   }

//   // Ensure 768-dim
//   const REQUIRED = 768;
//   if (vector.length < REQUIRED) {
//     return [...vector, ...Array(REQUIRED - vector.length).fill(0)];
//   }
//   if (vector.length > REQUIRED) {
//     return vector.slice(0, REQUIRED);
//   }

//   return vector;
// }

async function geminiEmbed(text: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${process.env.GEMINI_API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "models/text-embedding-004",
      content: {
        parts: [{ text }]
      }
    }),
  });

  const json = await res.json();
  console.log("GEMINI RAW EMBEDDING:", json);

  // Extract correct embedding
  let vector =
    json?.embedding?.values ||
    json?.content?.embedding?.values ||
    json?.embeddings?.[0]?.values ||
    [];

  if (!vector || vector.length === 0) {
    console.error("❌ GEMINI DID NOT RETURN EMBEDDINGS");
    throw new Error("Gemini returned empty embedding!");
  }

  // Ensure 768D
  if (vector.length < 768) {
    vector = [...vector, ...Array(768 - vector.length).fill(0)];
  } else if (vector.length > 768) {
    vector = vector.slice(0, 768);
  }

  return vector;
}




// ----------------------------
// Gemini: Categorize document
// ----------------------------



// ----------------------------
// Gemini: Categorize document with JSON Schema
// ----------------------------

async function geminiCategorize(text: string) {
  console.log("🔍 Starting Two-Stage Classification...");

  // ==========================================
  // STAGE 1: Document Analysis
  // ==========================================
  const analysisPrompt = `You are a document analysis expert. Analyze this document and extract key information.

INSTRUCTIONS:
1. Identify the document type (e.g., "Coding Assessment", "FNF Certificate", "Invoice", "Contract", "Resume", etc.)
2. List 3-5 key topics or subjects mentioned in the document
3. Describe the primary purpose of this document in one sentence

Be specific and accurate. Look for indicators like:
- Document title/header
- Structural elements (forms, tables, signatures)
- Technical terminology
- Business context
- Official stamps or letterheads

DOCUMENT CONTENT:
${text.slice(0, 2500)}

---

Respond with your analysis.`;

  const analysisRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: analysisPrompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              documentType: { 
                type: "string",
                description: "The specific type of document"
              },
              keyTopics: {
                type: "array",
                items: { type: "string" },
                description: "3-5 main topics or subjects covered"
              },
              primaryPurpose: { 
                type: "string",
                description: "The main purpose of this document"
              }
            },
            required: ["documentType", "keyTopics", "primaryPurpose"]
          }
        }
      }),
    }
  );

  const analysisJson = await analysisRes.json();
  let analysis;

  try {
    const analysisText = analysisJson?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    analysis = JSON.parse(analysisText);
    
    console.log("📊 Stage 1 Analysis:");
    console.log("   Type:", analysis.documentType);
    console.log("   Topics:", analysis.keyTopics?.join(", "));
    console.log("   Purpose:", analysis.primaryPurpose);
  } catch (err) {
    console.error("⚠️ Stage 1 failed, using defaults", err);
    analysis = {
      documentType: "Unknown Document",
      keyTopics: ["general"],
      primaryPurpose: "Not determined"
    };
  }

  // ==========================================
  // STAGE 2: Category Selection
  // ==========================================
  const categoryPrompt = `You are a document classification expert. Based on the analysis below, choose the MOST APPROPRIATE category.

📋 DOCUMENT ANALYSIS:
• Type: ${analysis.documentType}
• Topics: ${analysis.keyTopics?.join(", ") || "None identified"}
• Purpose: ${analysis.primaryPurpose}

---

📂 AVAILABLE CATEGORIES (Choose ONE):

1. **HR & Recruitment**
   ✓ Job descriptions, postings, applications
   ✓ Coding assessments, technical tests, interview feedback
   ✓ Offer letters, appointment letters, employment contracts
   ✓ FNF certificates, relieving letters, experience letters
   ✓ Resignation letters, termination notices
   ✓ Performance reviews, appraisals, feedback forms
   ✓ Employee onboarding/offboarding documents
   ✓ Training materials, skill assessments

2. **Finance & Accounting**
   ✓ Invoices, receipts, bills, payment confirmations
   ✓ Budget reports, financial statements, P&L, balance sheets
   ✓ Expense reports, reimbursement claims
   ✓ Tax documents, GST filings, payroll records
   ✓ Purchase orders, vendor payments
   ✓ Audit reports, financial analysis

3. **Marketing & Sales**
   ✓ Marketing campaigns, ad copy, promotional materials
   ✓ Sales proposals, pitch decks, presentations
   ✓ Brochures, flyers, catalogs
   ✓ Email campaigns, newsletters
   ✓ Brand guidelines, style guides
   ✓ Market research, customer surveys
   ✓ Social media content calendars

4. **Product & Development**
   ✓ Product requirements documents (PRDs)
   ✓ Feature specifications, user stories
   ✓ Product roadmaps, release plans
   ✓ Wireframes, mockups, design specs
   ✓ A/B test results, product analytics
   ✓ Product launch plans

5. **Legal & Compliance**
   ✓ Contracts, agreements, MOUs, NDAs
   ✓ Legal notices, court documents
   ✓ Compliance reports, audit findings
   ✓ Terms of service, privacy policies
   ✓ Regulatory filings, certifications
   ✓ Intellectual property documents

6. **Operations & Admin**
   ✓ Company policies, employee handbooks
   ✓ Meeting notes, minutes, agendas
   ✓ Standard operating procedures (SOPs)
   ✓ Office memos, internal announcements
   ✓ Vendor/supplier agreements
   ✓ Facility management documents

7. **Project Management**
   ✓ Project plans, charters, proposals
   ✓ Timeline documents, Gantt charts
   ✓ Sprint planning, backlog grooming
   ✓ Status reports, progress updates
   ✓ Risk assessments, mitigation plans
   ✓ Project closure reports

8. **Technical & Engineering**
   ✓ Technical documentation, API docs
   ✓ Architecture diagrams, system designs
   ✓ Code documentation, README files
   ✓ Infrastructure documentation
   ✓ Bug reports, incident reports
   ✓ DevOps configurations, deployment guides
   ✓ Database schemas, data models

9. **Customer Support**
   ✓ Support tickets, customer issues
   ✓ Knowledge base articles, FAQs
   ✓ Customer feedback, complaints
   ✓ User guides, help documentation
   ✓ Support escalation procedures
   ✓ Customer satisfaction surveys

10. **Other**
    ✓ Documents that don't fit any above category
    ✓ Personal documents, miscellaneous files

---

🎯 CLASSIFICATION RULES:
• Choose the category that BEST matches the document's PRIMARY purpose
• If document serves multiple purposes, choose the DOMINANT one
• Be specific: "Coding Assessment" → HR & Recruitment (NOT Technical)
• FNF/Experience letters → HR & Recruitment (NOT Finance)
• Consider the document's business context and intended audience
• Only use "Other" if truly no category fits

Choose the category name EXACTLY as written above.`;

  const categoryRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: categoryPrompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                enum: [
                  "HR & Recruitment",
                  "Finance & Accounting",
                  "Marketing & Sales",
                  "Product & Development",
                  "Legal & Compliance",
                  "Operations & Admin",
                  "Project Management",
                  "Technical & Engineering",
                  "Customer Support",
                  "Other"
                ]
              },
              reasoning: {
                type: "string",
                description: "Brief explanation of why this category was chosen"
              },
              confidence: {
                type: "string",
                enum: ["high", "medium", "low"],
                description: "Confidence level in this classification"
              }
            },
            required: ["category", "reasoning", "confidence"]
          }
        }
      }),
    }
  );

  const categoryJson = await categoryRes.json();

  try {
    const categoryText = categoryJson?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const result = JSON.parse(categoryText);

    console.log("   Stage 2 Classification:");
    console.log("   Category:", result.category);
    console.log("   Reasoning:", result.reasoning);
    console.log("   Confidence:", result.confidence);

    return result.category || "Other";
  } catch (err) {
    console.error("⚠️ Stage 2 failed, defaulting to Other", err);
    return "Other";
  }
}

// ----------------------------
// Alternative: Aggressive text extraction (Fallback)
// ----------------------------
async function geminiCategorizeSimple(text: string) {
  const prompt = `Classify this document into ONE category: Marketing, Finance, Product, Team, Project, or Other.

Reply with ONLY the category name, nothing else.

Document:
${text.slice(0, 1500)}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const json = await res.json();
  let raw = json?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Other";

  // Valid categories
  const categories = ["Marketing", "Finance", "Product", "Team", "Project", "Other"];

  // Find the FIRST occurrence of any category in the response
  for (const cat of categories) {
    if (raw.toLowerCase().includes(cat.toLowerCase())) {
      return cat;
    }
  }

  return "Other";
}


// ----------------------------
// Supabase
// ----------------------------
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ----------------------------
// POST Handler
// ----------------------------
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;

    // Upload file to Supabase
    const { error: uploadError } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET!)
      .upload(fileName, fileBuffer, {
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) throw uploadError;

    const publicURL = supabase.storage
      .from(process.env.SUPABASE_BUCKET!)
      .getPublicUrl(fileName).data.publicUrl;

    // --- Extract Text WITH Gemini ---
   let extractedText = "";

    // 1️⃣ DOCX Extraction (LOCAL)
    if (file.name.endsWith(".docx")) {
      try {
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        extractedText = result.value;
        console.log("DOCX extracted using Mammoth");
      } catch (err) {
        console.error("Mammoth DOCX extraction failed → fallback to Gemini", err);
      }
    }

    // 2️⃣ PDF, TXT, or failed DOCX → Gemini OCR fallback
    if (!extractedText.trim()) {
      extractedText = await geminiExtractFileText(
        fileBuffer,
        file.name,
        file.type
      );
    }

    if (!extractedText.trim()) throw new Error("Text extraction failed");

    if (!extractedText.trim()) throw new Error("Text extraction failed");

    // --- Embeddings ---
    const embedding = await geminiEmbed(extractedText);

    // --- Categorize ---
    const category = await geminiCategorize(extractedText);

    // --- Save to Database ---
    const { data: doc, error: dbError } = await supabase
      .from("documents")
      .insert({
        file_name: file.name,
        file_type: file.type,
        file_url: publicURL,
        content: extractedText,
        embedding,
        category,
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return NextResponse.json(doc);
  } catch (err: any) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
