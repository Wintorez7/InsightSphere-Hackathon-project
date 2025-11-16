"use client";

import { UploadCloud, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import { Sidebar } from "./components/sidebar";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
  if (!selectedFile) return;
  setIsUploading(true);

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Upload failed!");
      return;
    }

    // Redirect to document preview page using Supabase ID
    router.push(`/documents/${data.id}`);

  } catch (err) {
    console.error(err);
    alert("Upload failed!");
  } finally {
    setIsUploading(false);
  }
};


  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <div className="h-full w-full ">
           {/* Title Section */}
      <div className="max-w-4xl mx-auto mt-5 text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg">
          Upload Your Documents
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Upload PDF, DOCX, and TXT files. Our AI will automatically extract text, generate embeddings, 
          and make your documents searchable instantly.
        </p>
      </div>

      {/* Upload Card */}
      <Card className="bg-[#0c0c0f]  border border-white/10 p-10 max-w-3xl mx-auto rounded-2xl shadow-[0_0_50px_-12px_rgba(128,0,255,0.4)] backdrop-blur-xl">
        <div className="flex flex-col items-center gap-8">

          <UploadCloud className="w-20 h-20 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]" />

          {/* Upload Box */}
          <label
            htmlFor="file-upload"
            className="w-full cursor-pointer border-2 border-dashed border-gray-700 p-10 rounded-xl text-center 
            hover:border-purple-500 hover:bg-gray-900/40 transition-all bg-black/40"
          >
            <p className="text-2xl text-white font-semibold mb-2">Drag & Drop File</p>
            <p className="text-gray-500 text-sm">or click to choose a document</p>

            <input
              id="file-upload"
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Selected File Preview */}
          {selectedFile && (
            <div className="w-full bg-gray-900/60 p-5 rounded-lg flex items-center gap-4 border border-gray-800 backdrop-blur">
              <FileText className="w-7 h-7 text-blue-400" />
              <div>
                <p className="text-white font-medium">{selectedFile.name}</p>
                <p className="text-gray-500 text-sm">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type}
                </p>
              </div>
            </div>
          )}

          {/* Upload Button */}
          <Button
            disabled={!selectedFile || isUploading}
            onClick={handleUpload}
            className="w-full py-6 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white shadow-lg rounded-xl"
          >
            {isUploading ? (
              <div className="flex items-center gap-3">
                <Loader2 className="animate-spin w-5 h-5" />
                Uploading...
              </div>
            ) : (
              "Upload Document"
            )}
          </Button>
        </div>
        
      </Card>
      </div>
    </div>
  );
}
