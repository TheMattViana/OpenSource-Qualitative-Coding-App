import { Project, Code, Transcript } from '../types';
import * as XLSX from 'xlsx';

// --- Helper: Generate ID ---
export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// --- Helper: Save Blob with Name ---
const saveBlob = (blob: Blob, defaultName: string) => {
  const filename = prompt("Save file as:", defaultName);
  if (!filename) return; // User cancelled

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// --- Memo Export Logic ---
export const exportMemos = (project: Project) => {
  const lines: string[] = [];

  lines.push('--- PROJECT MEMO ---');
  lines.push(project.projectMemo || '(No content)');
  lines.push('\n');

  project.transcripts.forEach(t => {
    lines.push(`--- MEMO FOR: ${t.name} ---`);
    lines.push(t.memo || '(No content)');
    lines.push('\n');
  });

  const content = lines.join('\n');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });

  const safeName = (project.name || 'Project').replace(/[^a-z0-9]/gi, '_');
  saveBlob(blob, `${safeName}_Memos.txt`);
};

// --- PDF / Print Logic ---
export const printTranscript = (transcript: Transcript, project: Project) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return alert("Please allow popups to print.");

  const codesHtml = project.codes.map(c =>
    `<div style="display:flex; align-items:center; margin-bottom:4px;">
            <span style="width:12px; height:12px; background-color:${c.color}; margin-right:8px; display:inline-block;"></span>
            <strong>${c.name}</strong>
         </div>`
  ).join('');

  printWindow.document.write(`
        <html>
        <head>
            <title>${transcript.name} - QualCode Vibed</title>
            <style>
                body { font-family: sans-serif; line-height: 1.6; color: #333; padding: 40px; }
                h1 { border-bottom: 2px solid #eee; padding-bottom: 10px; }
                .meta { color: #666; font-size: 0.9em; margin-bottom: 30px; }
                .content { font-size: 14px; }
                .coded-segment { border-bottom: 2px solid #ccc; font-weight: bold; }
                .legend { margin-top: 50px; padding: 20px; background: #f9f9f9; page-break-inside: avoid; }
                @media print {
                    .coded-segment { -webkit-print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
            <h1>${transcript.name}</h1>
            <div class="meta">Project: ${project.name} | Date: ${new Date().toLocaleDateString()}</div>
            <div class="content">${transcript.content}</div>
            <div class="legend"><h3>Code Legend</h3>${codesHtml}</div>
            <script>
                document.querySelectorAll('.transcript-line').forEach(l => {
                    l.style.display = 'block';
                    l.style.marginBottom = '10px';
                });
                window.print();
            </script>
        </body>
        </html>
    `);
  printWindow.document.close();
};

// --- Export Logic (CSV) ---
export const exportProjectData = (project: Project) => {
  const headers = ['Code Name', 'Transcript Name', 'Coded Text', 'Code Description', 'Start Index', 'End Index'];

  const rows = project.selections.map(sel => {
    const code = project.codes.find(c => c.id === sel.codeId);
    const transcript = project.transcripts.find(t => t.id === sel.transcriptId);

    return [
      code?.name || 'Unknown Code',
      transcript?.name || 'Unknown Transcript',
      `"${(sel.text || '').replace(/"/g, '""')}"`,
      `"${(code?.description || '').replace(/"/g, '""')}"`,
      sel.startIndex,
      sel.endIndex
    ];
  });

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveBlob(blob, `${project.name.replace(/\s+/g, '_')}_Analytics.csv`);
};

// --- Export Codebook ---
export const exportCodebook = (codes: Code[]) => {
  const headers = ['Name', 'Description', 'Color', 'ParentID', 'InclusionCriteria', 'ExclusionCriteria'];
  const rows = codes.map(c => [
    `"${c.name.replace(/"/g, '""')}"`,
    `"${(c.description || '').replace(/"/g, '""')}"`,
    c.color,
    c.parentId || '',
    `"${(c.inclusionCriteria || '').replace(/"/g, '""')}"`,
    `"${(c.exclusionCriteria || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveBlob(blob, `Codebook_Export.csv`);
};

// --- Save Project File (.qlab) ---
export const saveProjectFile = (project: Project) => {
  const jsonContent = JSON.stringify(project, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const safeName = (project.name || 'project').replace(/[^a-z0-9]/gi, '_').toLowerCase();
  saveBlob(blob, `${safeName}_${new Date().toISOString().slice(0, 10)}.qlab`);
};

// --- Import Logic (CSV & XLSX) ---

const findColumnValue = (row: any, candidates: string[]): string => {
  if (!row) return '';
  const rowKeys = Object.keys(row);
  for (const candidate of candidates) {
    const foundKey = rowKeys.find(k => k.toLowerCase() === candidate.toLowerCase());
    if (foundKey && row[foundKey] !== undefined && row[foundKey] !== null) return row[foundKey].toString().trim();
  }
  return '';
};

const parseCSVToJson = (csvText: string): any[] => {
  const lines = csvText.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return [];

  const parseLine = (line: string) => {
    const result: string[] = [];
    let start = 0;
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') { inQuotes = !inQuotes; }
      else if (line[i] === ',' && !inQuotes) {
        let val = line.substring(start, i).trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1).replace(/""/g, '"');
        result.push(val);
        start = i + 1;
      }
    }
    let lastVal = line.substring(start).trim();
    if (lastVal.startsWith('"') && lastVal.endsWith('"')) lastVal = lastVal.slice(1, -1).replace(/""/g, '"');
    result.push(lastVal);
    return result;
  };

  const headers = parseLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseLine(line);
    const obj: any = {};
    headers.forEach((h, i) => {
      if (values[i] !== undefined) obj[h] = values[i];
    });
    return obj;
  });
};

export const parseCodebookFile = async (file: File): Promise<Code[]> => {
  let rawCodes: any[] = [];

  if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    rawCodes = XLSX.utils.sheet_to_json(worksheet);
  } else {
    const text = await file.text();
    rawCodes = parseCSVToJson(text);
  }

  // Pass 1: Extract Data
  const parsedCodes = rawCodes.map(row => {
    return {
      id: generateId(),
      name: findColumnValue(row, ['name', 'code', 'label', 'title', 'code name']),
      description: findColumnValue(row, ['description', 'definition', 'desc', 'meaning', 'note']),
      color: findColumnValue(row, ['color', 'colour', 'hex']) || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      rawParent: findColumnValue(row, ['parent', 'parentid', 'parent_id', 'parent name', 'parent code'])
    };
  }).filter(c => c.name);

  // Pass 2: Resolve Parent Relationships (Internal to file)
  const nameToId = new Map<string, string>();
  parsedCodes.forEach(c => nameToId.set(c.name.toLowerCase(), c.id));

  return parsedCodes.map(c => {
    let parentId = undefined;
    if (c.rawParent) {
      parentId = nameToId.get(c.rawParent.toLowerCase());
    }
    return {
      id: c.id,
      name: c.name,
      description: c.description,
      color: c.color,
      parentId: parentId
    };
  });
};

export const mergeCodesInProject = (project: Project, sourceCodeId: string, targetCodeId: string): Project => {
  if (sourceCodeId === targetCodeId) return project;
  const updatedSelections = project.selections.map(sel =>
    sel.codeId === sourceCodeId ? { ...sel, codeId: targetCodeId } : sel
  );
  const updatedCodes = project.codes.filter(c => c.id !== sourceCodeId);
  return {
    ...project,
    selections: updatedSelections,
    codes: updatedCodes
  };
};

export const smartSplitContent = (text: string): string[] => {
  if (!text) return [];
  const cleanText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const paragraphs = cleanText.split('\n');
  const finalLines: string[] = [];

  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) continue;
    // Split sentences: Punctuation (quote optionally) follow by space then Capital Letter
    // Lookbehind for common abbreviations to avoid splitting "Mr. Smith"
    const sentences = trimmed
      .replace(/((?<!Mr|Mrs|Ms|Dr|Prof|Sr|Jr)[.!?]["”']?)\s+(?=[A-Z])/g, "$1|SPLIT_SENTENCE|")
      .split("|SPLIT_SENTENCE|");

    sentences.forEach(s => {
      if (s.trim()) finalLines.push(s.trim());
    });
  }
  return finalLines;
};