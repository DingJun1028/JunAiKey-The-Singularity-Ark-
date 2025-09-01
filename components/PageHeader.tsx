
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const PageHeaderComponent: React.FC<PageHeaderProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-4">
        <div className="text-matrix-cyan">{icon}</div>
        <div>
          <h1 className="text-3xl font-bold text-matrix-light">{title}</h1>
          <p className="text-matrix-dark">{subtitle}</p>
        </div>
      </div>
      <div className="mt-4 h-px bg-gradient-to-r from-matrix-cyan/50 to-transparent"></div>
    </div>
  );
};

const PageHeader = React.memo(PageHeaderComponent);
export default PageHeader;
