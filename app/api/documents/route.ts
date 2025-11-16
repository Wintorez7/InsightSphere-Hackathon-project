export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });

  // console.log("SUPABASE ERROR:", error);
  // console.log("SUPABASE DATA:", data);
  // console.log("ENV_URL:", process.env.SUPABASE_URL);
  // console.log(
  //   "ENV_SERVICE_ROLE:",
  //   process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20)
  // );

  return NextResponse.json(data || []);
}
