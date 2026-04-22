export function cleanSectionTitle(title: string): string {
  return title.replace(/^\s*\d+(?:\s*[-/]\s*\d+)?\s*[.)-]?\s*/u, "").trim();
}
