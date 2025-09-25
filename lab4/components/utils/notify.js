"use client";

import { toast } from "sonner";
import { CheckCircle2, Trash2, RefreshCw } from "lucide-react";

export const notify = {
    success: (message) => toast.success(
        <span className="flex items-center gap-2">
      <CheckCircle2 className="w-5 h-5 text-green-500" /> {message}
    </span>
    ),
    error: (message) => toast.error(
        <span className="flex items-center gap-2">
      <Trash2 className="w-5 h-5 text-red-500" /> {message}
    </span>
    ),
    info: (message) => toast.info(
        <span className="flex items-center gap-2">
      <RefreshCw className="w-5 h-5 text-blue-500" /> {message}
    </span>
    ),
};
