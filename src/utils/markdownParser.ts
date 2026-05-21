/**
 * A robust, lightweight Markdown to HTML parser tailored for tech articles.
 * Applies beautiful modern styles compatible with Tailwind CSS.
 */
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
        // Close code block
        inCodeBlock = false;
        const codeContent = escapeHtml(codeBlockLines.join('\n'));
        html += `
          <div class="my-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 shadow-lg font-mono text-sm leading-relaxed relative group">
            <div class="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800/80 text-xs font-bold text-slate-400">
              <span>${codeLang.toUpperCase() || 'CODE'}</span>
              <button 
                onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.innerText); const el = this; el.innerText = 'Copié !'; setTimeout(() => el.innerText = 'Copier', 2000);"
                class="hover:text-white transition-colors cursor-pointer"
              >
                Copier
              </button>
            </div>
            <pre class="p-4 overflow-x-auto whitespace-pre"><code class="language-${codeLang}">${codeContent}</code></pre>
          </div>
        `;
        codeBlockLines = [];
        codeLang = '';
      } else {
        // Open code block
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

    // 3. Horizontal Rules
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      closeListIfNeeded();
      html += '<hr class="my-8 border-slate-200 dark:border-slate-800" />';
      continue;
    }

    // 4. Headers (# Title)
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

    // 5. Blockquotes (> Text)
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

    // 6. Lists (Unordered & Ordered)
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

    // 7. Regular Paragraphs
    closeListIfNeeded();
    const parsedLine = parseInlineMarkdown(line);
    html += `<p class="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-5 font-normal tracking-wide">${parsedLine}</p>`;
  }

  closeListIfNeeded();
  return html;
};

/**
 * Escapes HTML tag characters to prevent XSS.
 */
const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Parses inline elements like Bold, Italic, Strikethrough, Code, Links, Images.
 */
const parseInlineMarkdown = (text: string): string => {
  let result = text;

  // 1. Escape HTML of regular inline content, except we keep our generated html
  result = escapeHtml(result);

  // 2. Images: ![alt](url)
  result = result.replace(/!\[(.*?)\]\((.*?)\)/g, (_, alt, url) => {
    // Decode escaped characters for URL
    const decodedUrl = url.replace(/&amp;/g, '&');
    return `<img src="${decodedUrl}" alt="${alt}" class="my-6 rounded-2xl max-w-full h-auto border border-slate-200 dark:border-slate-800 shadow-md mx-auto hover:opacity-95 transition-opacity" />`;
  });

  // 3. Links: [text](url)
  result = result.replace(/\[(.*?)\]\((.*?)\)/g, (_, label, url) => {
    const decodedUrl = url.replace(/&amp;/g, '&');
    return `<a href="${decodedUrl}" target="_blank" rel="noopener noreferrer" class="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">${label}</a>`;
  });

  // 4. Bold: **text** or __text__
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-slate-900 dark:text-white">$1</strong>');
  result = result.replace(/__(.*?)__/g, '<strong class="font-extrabold text-slate-900 dark:text-white">$1</strong>');

  // 5. Italics: *text* or _text_
  result = result.replace(/\*(.*?)\*/g, '<em class="italic text-slate-800 dark:text-slate-200">$1</em>');
  result = result.replace(/_(.*?)_/g, '<em class="italic text-slate-800 dark:text-slate-200">$1</em>');

  // 6. Strikethrough: ~~text~~
  result = result.replace(/~~(.*?)~~/g, '<del class="line-through text-slate-400 dark:text-slate-500">$1</del>');

  // 7. Inline code: `code`
  result = result.replace(/`(.*?)`/g, '<code class="bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>');

  return result;
};
