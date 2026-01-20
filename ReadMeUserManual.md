# **QualCode Vibed \- User Manual**

Welcome to **QualCode Vibed**, a tool designed for qualitative researchers who want a clean, visual, and flexible environment for coding transcripts.

**Live Web Version:** [https://working-futures.github.io/QualCode-Vibed/](https://working-futures.github.io/QualCode-Vibed/)

---

## **How it Works: Distributed Analysis**

QualCode Vibed runs entirely in your browser using **local files**. This means your data never leaves your computer unless you explicitly share the project file.

### **Workflow for Teams**
Since the app does not use a central cloud database, teams work by sharing the **Project File (.qlab)**.

#### **Scenario A: Single Analyst**
1. Open the app.
2. Import transcripts.
3. Code your data.
4. Click **Save** to download your work to your computer.

#### **Scenario B: Team Collaboration (Pass the Project)**
1. **Lead Researcher** creates a new project, adds the Codebook (definitions and colors), and saves the file (e.g., `Project_Start.qlab`).
2. The Lead emails this file to **Analyst A**.
3. **Analyst A** opens the link, loads `Project_Start.qlab`, and codes their assigned transcripts.
4. Analyst A clicks **Save** (e.g., `Project_AnalystA_Coding.qlab`) and sends it back to the Lead.

#### **Scenario C: Parallel Coding**
1. The Lead sends the starting file to both **Analyst A** and **Analyst B**.
2. They each work on their own files.
3. *Note: Currently, you cannot automatically merge two project files. The Lead must manually combine the results if they want a single master file, or simply analyze the exported CSVs separately.*

---

## **Key Features**

### **1. Getting Started**
1. **Launch:** Open the website.
2. **New Project:** Click "New Project" to start fresh.
3. **Open Project:** Click "Open Project" to load a .qlab file from your computer.

### **2. The Workspace**

#### **Left Sidebar (Documents & Codes)**
* **Documents:**
  * Click **+** to import transcripts (.txt or .docx).
  * Hover over a document to Rename or Delete it.
* **Codes:**
  * **Create:** Click **+** to add a code.
  * **Nest:** Drag a code onto another to make it a sub-code.
  * **Edit:** Right-click to Rename, Delete, or change Color.
  * **Import:** Load a pre-defined codebook from Excel/CSV.

#### **The Editor (Center)**
This is where you code.
1. Select a code from the Left Sidebar.
2. Highlight text in the transcript.
3. The text is underlined in that code's color.
4. **Remove:** Click the underline and select "Remove Highlight".

#### **Right Sidebar (Memos)**
* Click **Memos** (top right) to toggle.
* **Document Memo:** Notes specific to the current transcript.
* **Project Memo:** Global research journal.

### **3. Analysis Dashboard**
Click the **"Analysis"** tab at the top.
* **Charts:** Visual breakdown of code frequency.
* **Matrix:** Table showing Code usage per Document.
* **Export:** Download all data as CSV (Excel compatible) for further statistical analysis.

---

## **Saving & Security**
* **Privacy:** All data is processed **locally** in your browser. Nothing is sent to a server.
* **Saving:** Click the **Save** button (top right header).
  * This triggers a **Download** of a `.qlab` file.
  * Store this file on your computer, Google Drive, or OneDrive.
* **Backups:** We recommend creating a new save file periodically (e.g., `Project_v1.qlab`, `Project_v2.qlab`) so you can roll back if needed.

---

## **Troubleshooting**
* **White Screen?** Refresh the page. Ensure you are using a modern browser (Chrome, Edge, Firefox, Safari).
* **Lost Data?** Since the app runs locally, if you close the tab without clicking "Save", data is lost. **Save frequently!**