import React, { useState, useRef } from 'react';
import { Bold, Italic, Strikethrough, Code, Terminal, Heading2, Heading3, List, ListOrdered, Quote, Link, Image, Eye, Edit3 } from 'lucide-react';
import { parseMarkdownToHtml } from '../utils/markdownParser';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = "Écrivez le contenu de votre article ici en utilisant du Markdown..."
}) => {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormat = (type: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selection = textarea.value.substring(startPos, endPos);
    
    let before = textarea.value.substring(0, startPos);
    let after = textarea.value.substring(endPos);
    let replacement = '';
    let cursorOffset = 0;

    switch (type) {
      case 'bold':
        replacement = `**${selection || 'texte'}**`;
        cursorOffset = selection ? 0 : -2;
        break;
      case 'italic':
        replacement = `*${selection || 'texte'}*`;
        cursorOffset = selection ? 0 : -1;
        break;
      case 'strikethrough':
        replacement = `~~${selection || 'texte'}~~`;
        cursorOffset = selection ? 0 : -2;
        break;
      case 'code-inline':
        replacement = `\`${selection || 'code'}\``;
        cursorOffset = selection ? 0 : -1;
        break;
      case 'code-block':
        replacement = `\n\`\`\`javascript\n${selection || '// Votre code ici'}\n\`\`\`\n`;
        cursorOffset = selection ? 0 : -4;
        break;
      case 'h2':
        replacement = `\n## ${selection || 'Titre H2'}\n`;
        cursorOffset = 0;
        break;
      case 'h3':
        replacement = `\n### ${selection || 'Sous-titre H3'}\n`;
        cursorOffset = 0;
        break;
      case 'list-bullet':
        replacement = selection
          ? selection.split('\n').map(line => `- ${line}`).join('\n')
          : '\n- Élément de la liste';
        cursorOffset = 0;
        break;
      case 'list-number':
        replacement = selection
          ? selection.split('\n').map((line, idx) => `${idx + 1}. ${line}`).join('\n')
          : '\n1. Premier élément';
        cursorOffset = 0;
        break;
      case 'quote':
        replacement = selection
          ? selection.split('\n').map(line => `> ${line}`).join('\n')
          : '\n> Citation importante';
        cursorOffset = 0;
        break;
      case 'link':
        replacement = `[${selection || 'texte du lien'}](https://example.com)`;
        cursorOffset = selection ? 0 : -21;
        break;
      case 'image':
        replacement = `![${selection || 'description de l\'image'}](https://images.unsplash.com/photo-1555066931-4365d14bab8c)`;
        cursorOffset = selection ? 0 : -57;
        break;
      default:
        return;
    }

    const newValue = before + replacement + after;
    onChange(newValue);

    // Refocus and place cursor
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = startPos + replacement.length + cursorOffset;
      textarea.setSelectionRange(
        selection ? startPos : newCursorPos,
        selection ? startPos + replacement.length : newCursorPos
      );
    }, 50);
  };

  const previewHtml = parseMarkdownToHtml(value);

  return (
    <div className="flex flex-col w-full h-[500px] border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all duration-300">
      {/* Editor Header / Tab switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2 gap-2">
        <div className="flex bg-slate-200/55 dark:bg-slate-800/60 p-1 rounded-xl w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'write'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md shadow-slate-200/50 dark:shadow-none'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Edit3 size={14} />
            <span>Écrire</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'preview'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md shadow-slate-200/50 dark:shadow-none'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Eye size={14} />
            <span>Aperçu en direct</span>
          </button>
        </div>

        {/* Formatting Toolbar */}
        {activeTab === 'write' && (
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            <button
              type="button"
              onClick={() => insertFormat('bold')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
              title="Gras"
            >
              <Bold size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('italic')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
              title="Italique"
            >
              <Italic size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('strikethrough')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
              title="Barré"
            >
              <Strikethrough size={16} />
            </button>
            
            <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

            <button
              type="button"
              onClick={() => insertFormat('h2')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
              title="Titre H2"
            >
              <Heading2 size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('h3')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
              title="Sous-titre H3"
            >
              <Heading3 size={16} />
            </button>

            <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

            <button
              type="button"
              onClick={() => insertFormat('code-inline')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
              title="Code en ligne"
            >
              <Code size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('code-block')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
              title="Bloc de code"
            >
              <Terminal size={16} />
            </button>

            <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

            <button
              type="button"
              onClick={() => insertFormat('list-bullet')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
              title="Liste à puces"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('list-number')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
              title="Liste numérotée"
            >
              <ListOrdered size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('quote')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
              title="Citation"
            >
              <Quote size={16} />
            </button>

            <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

            <button
              type="button"
              onClick={() => insertFormat('link')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
              title="Lien"
            >
              <Link size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('image')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
              title="Image"
            >
              <Image size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 w-full overflow-hidden bg-white dark:bg-slate-900 relative">
        {activeTab === 'write' ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full p-6 bg-transparent outline-none resize-none dark:text-white font-normal text-base leading-relaxed overflow-y-auto"
          />
        ) : (
          <div className="w-full h-full p-6 overflow-y-auto bg-slate-50 dark:bg-slate-950/20">
            {value.trim() ? (
              <div 
                className="max-w-4xl mx-auto break-words text-left"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-600 italic">
                Rien à prévisualiser pour le moment...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editor Footer / Info */}
      {activeTab === 'write' && (
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 text-[10px] font-medium text-slate-400 dark:text-slate-500 flex justify-between">
          <span>Formatage Markdown supporté</span>
          <span>{value.length} caractères • {value.split(/\s+/).filter(Boolean).length} mots</span>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
