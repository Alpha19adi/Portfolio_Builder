"use client";

interface PortfolioFooterProps {
  name?:  string;
}

export function PortfolioFooter({ name }: PortfolioFooterProps) {
  return (
    <footer className="py-8 px-6 border-t border-gray-800/50">
      <div className=" mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} {name || "Portfolio"}.  All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}