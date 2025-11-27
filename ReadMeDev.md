# **QualCode Vibed \- Developer Documentation**

## **Overview**

**QualCode Vibed** is a desktop application for qualitative data analysis (QDA), built using modern web technologies wrapped in Electron. It allows researchers to import transcripts, define hierarchical coding systems, code text segments, and analyze data patterns visually.

## **Technology Stack**

* **Framework:** [React](https://react.dev/) (v18) with TypeScript  
* **Build Tool:** [Vite](https://vitejs.dev/)  
* **Desktop Wrapper:** [Electron](https://www.electronjs.org/) (v28)  
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)  
* **Charts:** [Recharts](https://recharts.org/)  
* **Icons:** [Lucide React](https://lucide.dev/)  
* **File Handling:**  
  * mammoth: .docx import  
  * xlsx: Codebook import/export  
  * html2canvas: (Optional) Export visualizations

## **Project Structure**

qualilab-distributed/  
├── electron/  
│   └── main.js            \# Electron main process entry point  
├── src/                   \# (Note: Source files currently in root/components for this proto)  
├── components/            \# UI Components  
│   ├── AnalysisView.tsx   \# Dashboard for charts/matrices  
│   ├── Codebook.tsx       \# Code definition management  
│   ├── CodeTree.tsx       \# Sidebar hierarchical code list  
│   ├── Editor.tsx         \# The main text coding interface (Core logic here)  
│   ├── MemoSidebar.tsx    \# Right-side panel for notes  
│   ├── ProjectLauncher.tsx\# Initial screen (New/Open Project)  
│   └── VisualSettings.tsx \# Appearance controls  
├── utils/  
│   ├── colorUtils.ts      \# Color generation and manipulation  
│   ├── dataUtils.ts       \# Import/Export logic (CSV, JSON, PDF)  
│   ├── highlightUtils.ts  \# DOM manipulation for text highlighting  
│   └── themeUtils.ts      \# CSS variable injection for themes  
├── types.ts               \# TypeScript interfaces (Project, Code, Transcript, etc.)  
├── App.tsx                \# Main application controller/router  
├── index.html             \# Entry HTML file  
└── package.json           \# Dependencies and scripts

## **Key Functional Concepts**

### **1\. Data Model (types.ts)**

The application state is centralized in the Project object.

* **Codes:** Flat array with parentId for hierarchy.  
* **Selections:** Flat array storing startIndex, endIndex, and text for every coded segment.  
* **Transcripts:** Store HTML content. **Crucial:** The HTML string is the "source of truth" for rendering, but selections are the source of truth for data integrity.

### **2\. The Editor (Editor.tsx)**

The core component. It uses a contentEditable-like approach but is read-only for the user text.

* **Rendering:** Renders HTML strings stored in Transcript.  
* **Highlighting:** Uses a custom highlightSafe function (DOM TreeWalker) to split text nodes and wrap them in \<span\> tags with styles (underlines).  
* **Gutter:** Automatically scans line elements (.transcript-line) to render brackets { in the left margin.
* **Interactions:**
  * **Drag & Drop:** CodeTree supports dragging codes to nest or merge.
  * **"In Your Hand":** Custom cursor logic in Editor.tsx to indicate active coding mode.
  * **Global Search:** Debounced search across all transcripts.

### **3\. Data Persistence**

* **Saving:** Serializes the entire Project object to a .qlab (JSON) file.  
* **Exports:** Generates CSVs for external analysis using standard browser Blob APIs.

## **Setup & Running**

1. **Install Dependencies:**  
   npm install

2. Run in Development Mode:  
   To handle the dual process (React Server \+ Electron Window):  
   npm run electron:dev

   *If port 5173 is busy:*  
   \# Terminal 1  
   npm run dev  
   \# Terminal 2  
   npx electron .

3. **Build for Production:**  
   npm run electron:build
   
   This will generate a `release` folder containing:
   * .dmg (Mac)
   * .exe (Windows)

## **Troubleshooting**

* **"Port in use":** Kill the process on port 5173 (npx kill-port 5173\) or run processes manually.  
* **"npm audit" errors:** Safe to ignore high severity warnings for xlsx or electron in this local desktop context; do NOT run npm audit fix \--force.