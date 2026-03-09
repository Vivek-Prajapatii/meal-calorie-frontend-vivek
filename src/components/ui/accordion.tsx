"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ 
  title, 
  children, 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border rounded-lg ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-3 border-t">
          {children}
        </div>
      )}
    </div>
  );
};
