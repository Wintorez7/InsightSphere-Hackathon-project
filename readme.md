
📘 InsightSphere – Smart Knowledge Discovery & Internal Search

A powerful AI-driven internal search engine that helps marketing, HR, admin, and operations teams instantly find documents, extract insights, and organize information — all in one place.

InsightSphere transforms unstructured PDFs, DOCX files, and other internal assets into fully searchable, categorized knowledge using Gemini AI + Supabase vector search.

🚀 Features
✅ 1. Upload & Index Documents

Supports PDF and DOCX files

Extracts text using Mammoth + Gemini OCR

Generates 768-dimensional embeddings using Gemini

Stores file, metadata, content & vectors in Supabase



✅ 2. Smart Semantic Search (AI Search Engine)

Search by any keyword or concept

Powered by Supabase pgvector + Gemini embeddings

Returns highly relevant results

Highlights matched terms

Shows similarity score



✅ 3. Automatic Categorization

Each document is intelligently assigned to a category like:

Marketing

Finance

Product

Team

Project

Operations & Admin

HR & Recruitment

Other

Gemini classifies based on document content.



✅ 4. Document Preview

View extracted text

Snippet preview in search results

Open full file via public URL

View original PDF/DOCX



✅ 5. Clean, Modern UI

Beautiful gradient design

Sidebar navigation

Separate sections for Upload, Search, Documents

Fully responsive

🧠 Tech Stack
Frontend

Next.js (App Router)

React + TailwindCSS

ShadCN UI

Backend

Next.js API Routes (Server-Side)

Supabase (Database + Storage + pgvector)

Gemini AI

text-embedding-004


🏗️ Architecture Overview
User Uploads File
      ↓
Gemini OCR (PDF/DOCX → Text)
      ↓
Gemini Embeddings (Text → Vector)
      ↓
Supabase:
   • Documents table
   • 768-D vector column
   • Public storage URL
      ↓
Smart Search (Semantic + Keyword)




📦 Project Setup
1️⃣ Install Dependencies
npm install

2️⃣ Create .env.local
SUPABASE_URL=your_url
SUPABASE_SERVICE_ROLE_KEY=your_key
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_BUCKET=documents
GEMINI_API_KEY=your_gemini_key



3️⃣ Enable pgvector in Supabase

Run:

create extension if not exists vector;

4️⃣ Create Database Table
create table documents (
  id uuid primary key default gen_random_uuid(),
  file_name text,
  file_type text,
  file_url text,
  content text,
  category text,
  embedding vector(768),
  created_at timestamptz default now()
);

5️⃣ Add Vector Index
create index on documents
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

6️⃣ Create Search RPC Function
create or replace function match_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  file_name text,
  file_type text,
  file_url text,
  content text,
  category text,
  created_at timestamptz,
  similarity float
)
language sql stable
as $$
  select
    id,
    file_name,
    file_type,
    file_url,
    content,
    category,
    created_at,
    1 - (embedding <=> query_embedding) as similarity
  from documents
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;



🧪 How to Use
1. Upload Documents

Go to /upload

Upload PDF or DOCX

System automatically:

Extracts text

Generates embeddings

Categorizes

Saves to DB


2. Search

Go to /search

Type anything:

keywords

concepts

job titles

document names

AI returns relevant results with snippet preview.


3. View Documents

Click:

View Document → see extracted text

Open File → open original file


👨‍💻 Developed By

Mohan kumhar
Hackathon Submission – 2025