export function getPageRange(page?: number, limit?: number) {
  if (!page || !limit) return { start: 0, end: 0 };

  const start = (page - 1) * limit;
  const end = page * limit;

  return { start, end };
}
