'use client';

import { UploadCloud } from 'lucide-react';

export function UploadDropzone({ onSelect }: any) {
  return (
    <div
      className="border-2 border-dashed border-gray-300 p-12 rounded-lg text-center cursor-pointer hover:border-blue-500 transition"
      onClick={() => document.getElementById("fileInput")?.click()}
    >
      <UploadCloud className="w-12 h-12 mx-auto text-gray-400" />
      <p className="text-gray-600 mt-4">
        Drop your documents here, or <span className="text-blue-600 underline">click to browse</span>
      </p>
      <input 
        id="fileInput"
        type="file"
        className="hidden"
        accept=".pdf,.txt,.doc,.docx"
        onChange={(e) => onSelect(e.target.files?.[0])}
      />
    </div>
  );
}
