import { getInitialsFallback, generateFallbackSVG } from './logoFallback';

interface LogoRendererProps {
  logo?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LogoRenderer({ logo, name, size = 'md', className = '' }: LogoRendererProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const displayLogo = logo || generateFallbackSVG(name);

  return (
    <div className={`${sizeClasses[size]} ${className} flex-shrink-0`}>
      <div dangerouslySetInnerHTML={{ __html: displayLogo }} className="w-full h-full" />
    </div>
  );
}
