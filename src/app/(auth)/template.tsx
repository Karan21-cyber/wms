import React from 'react';

interface TemplateProps {
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <div
      className="
      h-screen
      justify-center"
    >
      {children}
    </div>
  );
};

export default Template;
