export function getInitialsFallback(name: string): string {
  if (!name || name.trim() === '') return '??';
  
  return name
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
}

export function generateFallbackSVG(name: string, bgColor: string = '#3b82f6'): string {
  const initials = getInitialsFallback(name);
  const size = 200;
  const center = size / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <circle cx="${center}" cy="${center}" r="${center * 0.9}" fill="${bgColor}" />
  <text x="${center}" y="${center}" text-anchor="middle" dominant-baseline="central" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="#ffffff">${initials}</text>
</svg>`;
}
