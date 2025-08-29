import React from 'react';

// FIX: Update CardProps to accept standard div attributes like 'id'.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, ...props }) => {
  const baseClasses = `
    bg-card-bg backdrop-blur-xl 
    border border-card-border 
    rounded-lg 
    transition-all duration-300 
    hover:border-card-border-hover hover:shadow-card-glow hover:-translate-y-1
  `;
  
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div className={`${baseClasses} ${clickableClasses} ${className}`} onClick={onClick} {...props}>
      {children}
    </div>
  );
};


interface CardHeaderProps {
    icon: React.FC<{className?: string}>;
    title: string;
    type: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ icon: Icon, title, type }) => (
    <div className="flex items-center gap-3 p-4 border-b border-matrix-cyan/20">
        <Icon className="w-6 h-6 text-matrix-cyan flex-shrink-0" />
        <div className="flex-grow overflow-hidden">
            <h3 className="text-matrix-light font-semibold truncate" title={title}>{title}</h3>
            <p className="text-xs text-matrix-dark uppercase tracking-wider">{type}</p>
        </div>
    </div>
);


interface CardBodyProps {
    children: React.ReactNode;
    className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
    <div className={`p-4 ${className}`}>
        {children}
    </div>
);


interface CardFooterProps {
    children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children }) => (
    <div className="p-4 border-t border-matrix-cyan/10">
        {children}
    </div>
);


export default Card;