import React from 'react';
import { Project } from '../types';
import { X, Download, StickyNote, FileText } from 'lucide-react';

interface Props {
  project: Project;
  onClose: () => void;
  onExport: () => void;
  onUpdateProject: (p: Project) => void;
}

export const MemoManager: React.FC<Props> = ({ project, onClose, onExport, onUpdateProject }) => {

  const handleProjectMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateProject({
        ...project,
        projectMemo: e.target.value
    });
  };

  const handleTranscriptMemoChange = (transcriptId: string, newText: string) => {
    onUpdateProject({
        ...project,
        transcripts: project.transcripts.map(t => 
            t.id === transcriptId ? { ...t, memo: newText } : t
        )
    });
  };

  return (
    <div className="absolute inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
        
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-amber-50">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-lg mr-3 text-amber-600">
                <StickyNote size={24} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-800">Project Memos</h2>
                <p className="text-xs text-slate-500 mt-1">Research journal & document annotations</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
                onClick={onExport}
                className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-bold transition-colors shadow-sm"
            >
                <Download size={16} />
                <span>Export Memos</span>
            </button>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <X size={24} className="text-slate-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50">
            
            {/* Project Level Memo */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-400 rounded-l-xl"></div>
                <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-3 flex items-center">
                    <StickyNote size={14} className="mr-2"/> Main Project Memo
                </h3>
                <textarea
                    className="w-full p-4 border border-slate-200 rounded-lg text-slate-800 text-sm leading-relaxed focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all min-h-[120px]"
                    placeholder="Write your research questions, hypothesis, or general notes here..."
                    value={project.projectMemo || ''}
                    onChange={handleProjectMemoChange}
                />
            </div>

            {/* Transcript Memos */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-2">Transcript Memos</h3>
                {project.transcripts.length === 0 && (
                    <p className="text-slate-400 italic text-sm ml-2">No transcripts added yet.</p>
                )}
                {project.transcripts.map(t => (
                    <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center mb-3 pb-3 border-b border-slate-100">
                            <FileText size={16} className="mr-2 text-blue-500"/> 
                            <span className="font-bold text-slate-700">{t.name}</span>
                        </div>
                        <textarea
                            className="w-full p-3 border border-slate-200 rounded-lg text-slate-600 text-sm leading-relaxed focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all min-h-[80px]"
                            placeholder={`Notes for ${t.name}...`}
                            value={t.memo || ''}
                            onChange={(e) => handleTranscriptMemoChange(t.id, e.target.value)}
                        />
                    </div>
                ))}
            </div>

        </div>
      </div>
    </div>
  );
};