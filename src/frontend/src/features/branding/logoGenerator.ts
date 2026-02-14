export interface LogoConfig {
  text: string;
  shape: 'circle' | 'square' | 'hexagon' | 'triangle';
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}

export const defaultLogoConfig: LogoConfig = {
  text: '',
  shape: 'circle',
  primaryColor: '#3b82f6',
  secondaryColor: '#60a5fa',
  textColor: '#ffffff',
};

export function generateLogoSVG(config: LogoConfig): string {
  const { text, shape, primaryColor, secondaryColor, textColor } = config;
  const size = 200;
  const center = size / 2;

  let shapePath = '';
  let gradientId = `grad-${Date.now()}`;

  switch (shape) {
    case 'circle':
      shapePath = `<circle cx="${center}" cy="${center}" r="${center * 0.9}" fill="url(#${gradientId})" />`;
      break;
    case 'square':
      const squareSize = size * 0.8;
      const squareOffset = (size - squareSize) / 2;
      shapePath = `<rect x="${squareOffset}" y="${squareOffset}" width="${squareSize}" height="${squareSize}" rx="10" fill="url(#${gradientId})" />`;
      break;
    case 'hexagon':
      const hexPoints = [
        [center, center * 0.2],
        [center * 1.7, center * 0.5],
        [center * 1.7, center * 1.5],
        [center, center * 1.8],
        [center * 0.3, center * 1.5],
        [center * 0.3, center * 0.5],
      ];
      shapePath = `<polygon points="${hexPoints.map(p => p.join(',')).join(' ')}" fill="url(#${gradientId})" />`;
      break;
    case 'triangle':
      const triPoints = [
        [center, center * 0.3],
        [center * 1.7, center * 1.7],
        [center * 0.3, center * 1.7],
      ];
      shapePath = `<polygon points="${triPoints.map(p => p.join(',')).join(' ')}" fill="url(#${gradientId})" />`;
      break;
  }

  const initials = text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
    </linearGradient>
  </defs>
  ${shapePath}
  <text x="${center}" y="${center}" text-anchor="middle" dominant-baseline="central" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="${textColor}">${initials}</text>
</svg>`;
}

export function getInitials(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
}
