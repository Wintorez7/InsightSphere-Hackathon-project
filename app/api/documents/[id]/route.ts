import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ---------------------------------------------------
// GET — Fetch single document by ID
// ---------------------------------------------------
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("DOCUMENT FETCH ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


// ---------------------------------------------------
// DELETE — Remove document from DB + Storage
// ---------------------------------------------------
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // 1. Get file_url so we can delete from Storage
    const { data: doc, error: fetchError } = await supabase
      .from("documents")
      .select("file_url")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    if (doc?.file_url) {
      // Extract file path from public URL
      const filePath = doc.file_url.split("/").pop();

      if (filePath) {
        await supabase.storage
          .from(process.env.SUPABASE_BUCKET!)
          .remove([filePath]);
      }
    }

    // 2. Delete record from DB
    const { error: deleteError } = await supabase
      .from("documents")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    return NextResponse.json({ message: "Document deleted successfully" });
  } catch (err: any) {
    console.error("DOCUMENT DELETE ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
