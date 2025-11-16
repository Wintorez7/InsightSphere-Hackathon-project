"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/app/upload/components/sidebar";
import { ArrowLeft, FileText, Tag } from "lucide-react";

// Format date
function formatDate(date?: string) {
  if (!date) return "-";
  return new Date(date).toLocaleString();
}

export default function DocumentPreviewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch document by ID
  useEffect(() => {
    async function loadDocument() {
      try {
        const res = await fetch(`/api/documents/${id}`);
        const data = await res.json();

        setDoc(data || null);
      } catch (err) {
        console.error("Failed to load document:", err);
      }
      setLoading(false);
    }

    loadDocument();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-black text-white">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Loading document...
        </div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="flex min-h-screen bg-black text-white">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Document not found.
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">

        {/* Back Button */}
        <button
          onClick={() => router.push("/documents")}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Documents
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 text-transparent bg-clip-text mb-2">
          {doc.file_name}
        </h1>

        <p className="text-gray-400 mb-8">
          Uploaded on {formatDate(doc.created_at)}
        </p>

        {/* Document Metadata */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl p-6 mb-10 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Document Details</h2>

          <div className="space-y-2 text-gray-300">
            <p><strong>Type:</strong> {doc.file_type}</p>

            <p className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-purple-300" />
              <strong>Category:</strong> {doc.category}
            </p>
          </div>
        </div>

        {/* Document Content Preview */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-300" />
            Extracted Content
          </h2>

          {doc.content ? (
            <div className="bg-black/40 p-5 rounded-lg border border-white/5 max-h-[500px] overflow-y-auto text-gray-300 leading-relaxed whitespace-pre-wrap">
              {doc.content}
            </div>
          ) : (
            <p className="text-gray-500">No content extracted.</p>
          )}

          {/* Download/Open File */}
          <a
            href={doc.file_url}
            target="_blank"
            className="mt-6 inline-block bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Open / Download File
          </a>
        </div>
      </main>
    </div>
  );
}
