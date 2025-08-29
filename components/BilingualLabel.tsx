import React from 'react';

interface BilingualLabelProps {
  label: string;
  layout?: 'inline' | 'block';
  primaryClassName?: string;
  secondaryClassName?: string;
}

const BilingualLabel: React.FC<BilingualLabelProps> = ({
  label,
  layout = 'inline',
  primaryClassName = '',
  secondaryClassName = '',
}) => {
  if (!label) return null;
  const match = label.match(/(.+?)\s*\((.+)\)/);

  if (match) {
    const [_, primary, secondary] = match;
    
    if (layout === 'block') {
      return (
        <div className="flex flex-col leading-tight">
          <span className={`font-medium ${primaryClassName}`.trim()}>{primary}</span>
          <span className={`text-xs text-matrix-dark/80 mt-0.5 ${secondaryClassName}`.trim()}>{secondary}</span>
        </div>
      );
    }

    // Default to inline
    return (
      <span className={`font-medium ${primaryClassName}`.trim()}>
        {primary}
        <span className={`text-xs text-matrix-dark ml-1.5 ${secondaryClassName}`.trim()}>({secondary})</span>
      </span>
    );
  }

  return <span className={`font-medium ${primaryClassName}`.trim()}>{label}</span>;
};

export default BilingualLabel;