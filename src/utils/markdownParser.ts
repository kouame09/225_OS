import hljs from 'highlight.js';

export const parseMarkdownToHtml = (markdown: string): string => {
  if (!markdown) return '';

  const lines = markdown.split(/\r?\n/);
  let html = '';
  let inList = false;
  let listType: 'ul' | 'ol' | null = null;
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let codeLang = '';

  const closeListIfNeeded = () => {
    if (inList) {
      html += listType === 'ol' ? '</ol>' : '</ul>';
      inList = false;
      listType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const trimmed = line.trim();

    // 1. Code Blocks (```lang)
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const rawCode = codeBlockLines.join('\n');
        let highlightedCode: string;
        let displayLang = codeLang;

        try {
          if (codeLang) {
            const result = hljs.highlight(rawCode, { language: codeLang });
            highlightedCode = result.value;
          } else {
            const result = hljs.highlightAuto(rawCode);
            highlightedCode = result.value;
            displayLang = result.language || '';
          }
        } catch {
          highlightedCode = escapeHtml(rawCode);
        }

        html += `
          <div class="my-6 rounded-2xl overflow-hidden bg-slate-950 text-slate-100 shadow-lg font-mono text-sm leading-relaxed relative group border border-slate-800/50">
            <div class="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800/80 text-xs font-bold text-slate-400">
              <span>${displayLang.toUpperCase() || 'CODE'}</span>
              <button 
                onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.innerText); const el = this; el.innerText = 'Copi\u00e9 !'; setTimeout(() => el.innerText = 'Copier', 2000);"
                class="hover:text-white transition-colors cursor-pointer"
              >
                Copier
              </button>
            </div>
            <pre class="p-4 overflow-x-auto whitespace-pre"><code class="hljs language-${displayLang}">${highlightedCode}</code></pre>
          </div>
        `;
        codeBlockLines = [];
        codeLang = '';
      } else {
        closeListIfNeeded();
        inCodeBlock = true;
        codeLang = trimmed.substring(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // 2. Blank Lines
    if (trimmed === '') {
      closeListIfNeeded();
      continue;
    }

    // 3. Tables (| ... |)
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.includes('|', 1) && lines.length > i + 1) {
      const nextTrimmed = lines[i + 1].trim();
      if (nextTrimmed.startsWith('|') && nextTrimmed.includes('---')) {
        closeListIfNeeded();
        const tableRows: string[] = [trimmed];
        let j = i + 1;
        while (j < lines.length) {
          const rt = lines[j].trim();
          if (rt.startsWith('|') && rt.endsWith('|') && rt.includes('|', 1)) {
            tableRows.push(rt);
            j++;
          } else {
            break;
          }
        }
        html += parseTable(tableRows);
        i = j - 1;
        continue;
      }
    }

    // 4. Horizontal Rules
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      closeListIfNeeded();
      html += '<hr class="my-8 border-slate-200 dark:border-slate-800" />';
      continue;
    }

    // 5. Headers (# Title)
    const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      closeListIfNeeded();
      const level = headerMatch[1].length;
      const titleText = parseInlineMarkdown(headerMatch[2]);
      
      if (level === 1) {
        html += `<h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-8 mb-4">${titleText}</h1>`;
      } else if (level === 2) {
        html += `<h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-8 mb-4 border-b border-slate-100 dark:border-slate-900 pb-2">${titleText}</h2>`;
      } else if (level === 3) {
        html += `<h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-3">${titleText}</h3>`;
      } else {
        html += `<h4 class="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">${titleText}</h4>`;
      }
      continue;
    }

    // 6. Blockquotes (> Text)
    if (trimmed.startsWith('>')) {
      closeListIfNeeded();
      const quoteText = parseInlineMarkdown(line.substring(line.indexOf('>') + 1).trim());
      html += `
        <blockquote class="border-l-4 border-emerald-500 pl-4 py-2 my-6 italic bg-emerald-500/[0.03] text-slate-700 dark:text-slate-300 rounded-r-2xl">
          ${quoteText}
        </blockquote>
      `;
      continue;
    }

    // 7. Lists (Unordered & Ordered)
    const ulMatch = line.match(/^([*\-+])\s+(.*)$/);
    const olMatch = line.match(/^(\d+)\.\s+(.*)$/);

    if (ulMatch) {
      const itemContent = parseInlineMarkdown(ulMatch[2]);
      if (!inList || listType !== 'ul') {
        closeListIfNeeded();
        html += '<ul class="list-disc list-inside pl-6 my-4 space-y-2 text-slate-700 dark:text-slate-300 text-base leading-relaxed">';
        inList = true;
        listType = 'ul';
      }
      html += `<li>${itemContent}</li>`;
      continue;
    }

    if (olMatch) {
      const itemContent = parseInlineMarkdown(olMatch[2]);
      if (!inList || listType !== 'ol') {
        closeListIfNeeded();
        html += '<ol class="list-decimal list-inside pl-6 my-4 space-y-2 text-slate-700 dark:text-slate-300 text-base leading-relaxed">';
        inList = true;
        listType = 'ol';
      }
      html += `<li>${itemContent}</li>`;
      continue;
    }

    // 8. Regular Paragraphs
    closeListIfNeeded();
    const parsedLine = parseInlineMarkdown(line);
    html += `<p class="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-5 font-normal tracking-wide">${parsedLine}</p>`;
  }

  closeListIfNeeded();
  return html;
};

function parseTable(rows: string[]): string {
  if (rows.length < 2) return '';

  const headerCells = splitRow(rows[0]);
  const dataRows = rows.slice(2);
  let alignments: string[] = [];

  const sepRow = splitRow(rows[1]);
  alignments = sepRow.map(cell => {
    const t = cell.trim();
    if (t.startsWith(':') && t.endsWith(':')) return 'text-center';
    if (t.startsWith(':')) return 'text-left';
    if (t.endsWith(':')) return 'text-right';
    return 'text-left';
  });

  let thead = '';
  if (headerCells.some(c => c.trim())) {
    thead = `<thead><tr class="bg-slate-100 dark:bg-slate-900">${headerCells.map((cell, i) =>
      `<th scope="col" class="${alignments[i] || 'text-left'} px-4 py-3.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">${parseInlineMarkdown(cell.trim())}</th>`
    ).join('')}</tr></thead>`;
  }

  const tbody = dataRows.length > 0
    ? `<tbody class="divide-y divide-slate-100 dark:divide-slate-800">${dataRows.map(row =>
        `<tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">${splitRow(row).map((cell, i) =>
          `<td class="${alignments[i] || 'text-left'} px-4 py-3.5 text-sm text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800/50">${parseInlineMarkdown(cell.trim()) || '\u00A0'}</td>`
        ).join('')}</tr>`
      ).join('')}</tbody>`
    : '';

  return `<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"><table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left">${thead}${tbody}</table></div>`;
}

function splitRow(row: string): string[] {
  const r = row.trim();
  if (r.startsWith('|')) {
    if (r.length > 1 && r.endsWith('|')) {
      return r.slice(1, -1).split('|');
    }
    return r.slice(1).split('|');
  }
  if (r.endsWith('|')) {
    return r.slice(0, -1).split('|');
  }
  return r.split('|');
}

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const parseInlineMarkdown = (text: string): string => {
  let result = text;

  result = escapeHtml(result);

  result = result.replace(/!\[(.*?)\]\((.*?)\)/g, (_, alt, url) => {
    const decodedUrl = url.replace(/&amp;/g, '&');
    return `<img src="${decodedUrl}" alt="${alt}" class="my-6 rounded-2xl max-w-full h-auto border border-slate-200 dark:border-slate-800 shadow-md mx-auto hover:opacity-95 transition-opacity" />`;
  });

  result = result.replace(/\[(.*?)\]\((.*?)\)/g, (_, label, url) => {
    const decodedUrl = url.replace(/&amp;/g, '&');
    return `<a href="${decodedUrl}" target="_blank" rel="noopener noreferrer" class="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">${label}</a>`;
  });

  result = result.replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-slate-900 dark:text-white">$1</strong>');
  result = result.replace(/__(.*?)__/g, '<strong class="font-extrabold text-slate-900 dark:text-white">$1</strong>');

  result = result.replace(/\*(.*?)\*/g, '<em class="italic text-slate-800 dark:text-slate-200">$1</em>');
  result = result.replace(/_(.*?)_/g, '<em class="italic text-slate-800 dark:text-slate-200">$1</em>');

  result = result.replace(/~~(.*?)~~/g, '<del class="line-through text-slate-400 dark:text-slate-500">$1</del>');

  result = result.replace(/`(.*?)`/g, '<code class="bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>');

  return result;
};
