import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-300 via-stone-200 to-slate-400 dark:from-gray-900 dark:via-stone-800 dark:to-gray-950 min-h-screen px-4 ${className}`}>
      {children}
    </div>
  );
};
