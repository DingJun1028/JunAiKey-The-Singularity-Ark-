import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const HeaderComponent: React.FC<HeaderProps> = ({ title, subtitle, icon }) => {
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

const Header = React.memo(HeaderComponent);
export default Header;
