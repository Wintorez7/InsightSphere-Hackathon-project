// app/api/search/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ----------------------------
// Generate Query Embedding
// ----------------------------
async function geminiQueryEmbed(query: string) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/embedding-gecko-001:embedText?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: query }),
    }
  );

  const json = await res.json();
  let vector = json?.embedding?.values || [];

  const REQUIRED = 768;
  if (vector.length < REQUIRED) {
    vector = [...vector, ...Array(REQUIRED - vector.length).fill(0)];
  }
  if (vector.length > REQUIRED) {
    vector = vector.slice(0, REQUIRED);
  }

  return vector;
}

// ----------------------------
// POST Handler for Search
// ----------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = (body?.query || "").toString().trim();

    // Validate query
    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    console.log("🔍 Searching for:", query);

    // Generate embedding for search query
    const queryEmbedding = await geminiQueryEmbed(query);

    // Perform vector similarity search
    const { data: results, error } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_threshold: 0.55, // Lower threshold for more results
      match_count: 3,
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      throw error;
    }

    console.log(`✅ Found ${results?.length || 0} results`);

    // Enhance results with snippets
    const enhanced = (results || []).map((doc: any) => {
      const content = (doc.content || "").toString();
      const similarity = Number(doc.similarity) || 0;

      // Find relevant snippet containing the query
      const queryLower = query.toLowerCase();
      const contentLower = content.toLowerCase();
      const idx = contentLower.indexOf(queryLower);

      let snippet = "";

      if (idx !== -1) {
        // Extract text around the matching query
        const start = Math.max(0, idx - 100);
        const end = Math.min(content.length, idx + 200);
        snippet = content.substring(start, end).trim();
        
        // Add ellipsis if truncated
        if (start > 0) snippet = "..." + snippet;
        if (end < content.length) snippet = snippet + "...";
      } else {
        // No exact match, show beginning of document
        snippet = content.substring(0, 300).trim() + "...";
      }

      // Clean up whitespace
      snippet = snippet.replace(/\s+/g, " ");

      return {
        id: doc.id,
        file_name: doc.file_name,
        file_type: doc.file_type,
        file_url: doc.file_url,
        category: doc.category,
        created_at: doc.created_at,
        snippet,
        similarity,
        content: content.substring(0, 500), // Include partial content for debugging
      };
    });

    return NextResponse.json({ 
      results: enhanced,
      count: enhanced.length,
      query 
    });

  } catch (err: any) {
    console.error("❌ SEARCH ERROR:", err);
    return NextResponse.json(
      { 
        error: err.message || "Search failed", 
        results: [] 
      },
      { status: 500 }
    );
  }
}