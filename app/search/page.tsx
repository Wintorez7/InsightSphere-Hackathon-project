"use client";

import { useState } from "react";
import { Sidebar } from "@/app/upload/components/sidebar";
import { Search, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const json = await res.json();
      setResults(json.results || []);
    } catch (e: any) {
      console.error(e);
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  }

  function highlight(text: string, term: string) {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300/30 text-yellow-200 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
          Smart Search
        </h1>

        <div className="flex gap-3 mb-6 max-w-3xl">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 p-4 rounded-xl bg-gray-900 border border-white/10 text-white"
            placeholder="Search documents, topics, or keywords..."
          />
          <button
            onClick={handleSearch}
            className="px-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-semibold"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {loading && <div className="text-gray-400">Searching...</div>}
        {error && <div className="text-red-400">{error}</div>}

        <div className="space-y-5 mt-6">
          {results.length === 0 && !loading && (
            <div className="text-gray-500">No results yet. Try different keywords.</div>
          )}

          {results.map((doc) => (
            <div key={doc.id} className="bg-gray-900 p-5 rounded-xl border border-white/10 hover:bg-gray-800 transition">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-300" />
                  {doc.file_name}
                </h2>
                <span className="text-sm text-purple-300">{doc.category}</span>
              </div>

              <p className="text-gray-400 mt-3 text-sm">
                {highlight(doc.snippet || "", query)}
              </p>

              <div className="mt-3 flex items-center gap-4">
                <Link href={`/documents/${doc.id}`} className="text-blue-300 hover:text-blue-200 inline-flex items-center gap-1">
                  View Document <ArrowRight className="w-4 h-4" />
                </Link>
                <a href={doc.file_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                  Open File
                </a>
                <div className="ml-auto text-sm text-gray-400">score: {(Number(doc.similarity) || 0).toFixed(3)}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
