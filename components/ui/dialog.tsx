"use client";

import * as React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => onOpenChange?.(false)} // fecha clicando no fundo
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()} // evita fechar ao clicar no conteúdo
      >
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-bold text-green-800">{children}</h3>;
}
