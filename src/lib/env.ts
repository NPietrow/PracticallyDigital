// Build-time switches. Both are off unless set to the exact string "true",
// so a missing or mistyped value can never publish drafts or allow indexing.

export function showDrafts(): boolean {
  return import.meta.env.PUBLIC_SHOW_DRAFTS === 'true';
}

export function allowIndexing(): boolean {
  return import.meta.env.PUBLIC_ALLOW_INDEXING === 'true';
}
