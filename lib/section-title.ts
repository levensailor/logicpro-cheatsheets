export function cleanSectionTitle(title: string): string {
  return title.replace(/^\s*\d+(?:\s*[-/]\s*\d+)?\s*[.)-]?\s*/u, "").trim();
}

export function slugifySectionTitle(title: string): string {
  return cleanSectionTitle(title)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
