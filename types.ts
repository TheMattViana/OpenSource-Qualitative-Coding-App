export interface Code {
  id: string;
  name: string;
  color: string;
  parentId?: string;
  description?: string;
  inclusionCriteria?: string;
  exclusionCriteria?: string;
  examples?: string;
}

export interface Selection {
  id: string;
  codeId: string;
  transcriptId: string;
  text: string;
  startIndex: number;
  endIndex: number;
  timestamp: number;
}

export interface Transcript {
  id: string;
  name: string;
  content: string;
  dateAdded: number;
  memo?: string;
}

export interface Project {
  id: string;
  name: string;
  created: number;
  lastModified: number;
  codes: Code[];
  transcripts: Transcript[];
  selections: Selection[];
  projectMemo?: string;
}

export type AppTheme = 'default' | 'hobbit' | 'dark' | 'bluedark' | 'corporate';

export interface AppSettings {
  fontFamily: 'sans' | 'serif' | 'mono' | 'dyslexic';
  fontSize: number;
  lineHeight: number;
  zebraStriping: boolean;
  charSpacing: number;
  theme: AppTheme;
  sidebarWidth?: number;
}