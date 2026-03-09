import React from "react";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title = "Check calories of what you eat. Instantly.",
  subtitle = "10,000+ Indian foods with full nutrition info. Just search.",
}) => {
  return (
    <>
      <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-tight text-balance">
        {title}
      </h1>
      <h2 className="leading-3 [&:not(:first-child)]:mt-7 m-15">
        {subtitle}
      </h2>
    </>
  );
};
