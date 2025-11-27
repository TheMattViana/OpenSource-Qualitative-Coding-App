import { Selection, Code } from '../types';

export const stripHighlights = (htmlContent: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const segments = doc.querySelectorAll('.coded-segment');
  segments.forEach(span => {
    const text = span.textContent || '';
    span.replaceWith(text);
  });
  return doc.body.innerHTML;
};

export const updateHighlightsInContent = (
  content: string,
  codes: Code[],
  selections: Selection[]
): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const segments = doc.querySelectorAll('.coded-segment');

  segments.forEach((span) => {
    const codeId = (span as HTMLElement).dataset.codeId;
    const code = codes.find(c => c.id === codeId);

    if (!code) {
      const text = document.createTextNode(span.textContent || '');
      span.parentNode?.replaceChild(text, span);
    } else {
      (span as HTMLElement).style.backgroundColor = `${code.color}40`; // 25% opacity
      (span as HTMLElement).style.textDecoration = 'underline';
      (span as HTMLElement).style.textDecorationColor = code.color;
      // Removing thickness/offset to rely on defaults first to ensure stability
      (span as HTMLElement).title = code.name;
    }
  });

  return doc.body.innerHTML;
};

export const removeHighlightsForCode = (content: string, codeId: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const segments = doc.querySelectorAll(`.coded-segment[data-code-id="${codeId}"]`);

  segments.forEach(span => {
    const text = document.createTextNode(span.textContent || '');
    span.parentNode?.replaceChild(text, span);
  });

  return doc.body.innerHTML;
};