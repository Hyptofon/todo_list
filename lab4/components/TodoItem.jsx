"use client";
import { Check, Trash2 } from "lucide-react";

export default function TodoItem({ id, task, completed, onToggle, onDelete }) {
    return (
        <li className="flex items-center justify-between p-2 border-b border-gray-200">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onToggle(id)}
                    className={`p-1 rounded-full border ${
                        completed ? "bg-green-500 border-green-500" : "border-gray-400"
                    }`}
                >
                    {completed && <Check className="text-white w-4 h-4" />}
                </button>

                <span
                    className={`select-none ${
                        completed ? "line-through text-gray-400" : ""
                    }`}
                >
          {task}
        </span>
            </div>

            <button
                onClick={() => onDelete(id)}
                className="text-red-500 hover:text-red-700"
            >
                <Trash2 size={18} />
            </button>
        </li>
    );
}
