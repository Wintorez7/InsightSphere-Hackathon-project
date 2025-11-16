"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, CheckCircle, Eye, ExternalLink, FileType } from "lucide-react";
import { Sidebar } from "@/app/upload/components/sidebar";

type Doc = {
  id: string;
  file_name: string;
  file_type: string;
  file_url: string;
  content: string;
  category: string;
  created_at: string;
};

function formatDate(date?: string) {
  if (!date) return "-";
  return new Date(date).toLocaleString();
}

// Category badge colors
const categoryColor = {
  Marketing: "bg-pink-500/20 text-pink-300",
  Finance: "bg-green-500/20 text-green-300",
  Product: "bg-blue-500/20 text-blue-300",
  Team: "bg-yellow-500/20 text-yellow-300",
  Project: "bg-purple-500/20 text-purple-300",
  Other: "bg-gray-500/20 text-gray-300",
};

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await fetch("/api/documents");
        const data = await res.json();
        setDocs(data || []);
      } catch (err) {
        console.error("Failed to load documents:", err);
      }
      setLoading(false);
    }

    fetchDocs();
  }, []);

  async function handleDelete(id: string) {
  if (!confirm("Are you sure you want to delete this document?")) return;

  try {
    const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });

    if (!res.ok) {
      alert("Failed to delete");
      return;
    }

    // Remove from UI without refresh
    setDocs((prev) => prev.filter((doc) => doc.id !== id));
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Delete failed");
  }
}


  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 px-10 pb-10 overflow-y-auto">
        <div className="max-w-6xl mt-12 mx-auto bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl shadow-xl p-8">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Uploaded Files</h2>

            <Link
              href="/upload"
              className="text-sm bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-2 rounded-md font-medium text-white shadow"
            >
              Upload Document
            </Link>
          </div>

          {loading && (
            <div className="text-center py-10 text-gray-400">Loading documents...</div>
          )}

          {!loading && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm">
                  <th className="p-3">Document</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Uploaded</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody> 
                {docs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-12">
                      <div>No documents uploaded yet.</div>
                      <Link href="/upload" className="mt-4 inline-block text-sm text-blue-300 underline">
                        Upload your first document
                      </Link>
                    </td>
                  </tr>
                ) : (
                  docs.map((d) => (
                    <tr key={d.id} className="border-b border-white/5 hover:bg-gray-800/40 transition">
                      {/* Document name */}
                      <td className="p-3 flex items-center gap-3 max-w-[400px]">
                        <FileText className="w-5 h-5 text-purple-300" />
                        <div className="truncate">{d.file_name}</div>
                      </td>

                      {/* Type */}
                      <td className="p-3">
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                          {d.file_type?.includes("pdf") ? "PDF" : d.file_type?.includes("word") ? "DOCX" : "Other"}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            categoryColor[d.category as keyof typeof categoryColor] || categoryColor.Other
                          }`}
                        >
                          {d.category}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="p-3 text-gray-400">{formatDate(d.created_at)}</td>

                      {/* Status */}
                      <td className="p-3">
                        <span className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-4 h-4" /> Indexed
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right flex items-center justify-end gap-4">
                        <Link href={`/documents/${d.id}`} className="text-blue-300 hover:text-blue-200 flex items-center gap-2">
                          <Eye className="w-4 h-4" /> View
                        </Link>
                        
                        {/* DELETE BUTTON */}
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="text-red-400 hover:text-red-300 flex items-center gap-2"
                        >
                          Delete
                        </button>

                        <a
                          href={d.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-400 hover:text-white flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
