"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  AlertCircle,
  CheckCircle,
  Info,
  X,
  TriangleAlert,
} from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  type?: AlertType;
  title: string;
  message?: string;
  className?: string;
  dismissible?: boolean;
  onClose?: () => void;
  autoDismiss?: boolean; 
  dismissAfter?: number; 
}

const iconMap: Record<AlertType, React.ReactElement> = {
  success: <CheckCircle className="w-5 h-5 text-green-600" />,
  error: <AlertCircle className="w-5 h-5 text-red-600" />,
  warning: <TriangleAlert className="w-5 h-5 text-yellow-600" />,
  info: <Info className="w-5 h-5 text-blue-600" />,
};

const typeStyles: Record<AlertType, string> = {
  success: "bg-green-50 text-green-800 border border-green-200",
  error: "bg-red-50 text-red-800 border border-red-200",
  warning: "bg-yellow-50 text-yellow-800 border border-yellow-200",
  info: "bg-blue-50 text-blue-800 border border-blue-200",
};

export default function Alert({
  type = "info",
  title,
  message,
  className,
  dismissible = true,
  onClose,
  autoDismiss = false,
  dismissAfter = 5000,
}: AlertProps) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  useEffect(() => {
    if (autoDismiss) {
      const timeout = setTimeout(() => handleClose(), dismissAfter);
      return () => clearTimeout(timeout); // limpeza
    }
  }, [autoDismiss, dismissAfter]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={clsx(
        "flex items-start justify-between gap-4 p-4 rounded-xl shadow-sm",
        typeStyles[type],
        className
      )}
    >
      <div className="flex gap-3 items-start">
        <div className="pt-0.5">{iconMap[type]}</div>
        <div>
          <h4 className="font-semibold leading-tight">{title}</h4>
          {message && <p className="text-sm mt-1 leading-relaxed">{message}</p>}
        </div>
      </div>

      {dismissible && (
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fechar alerta"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
