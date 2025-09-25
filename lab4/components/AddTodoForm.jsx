"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function AddTodoForm({ onAdd }) {
  const [task, setTask] = useState("");
  const MAX = 100;
  const len = task.trim().length;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (len === 0) {
      toast.error("Завдання не може бути порожнім");
      return;
    }
    if (len > MAX) {
      toast.error(`Текст занадто довгий (максимум ${MAX} символів)`);
      return;
    }

    onAdd(task.trim());
    setTask("");
  };

  return (
      <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center"
      >
        <div className="flex-1">
          <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Нове завдання..."
              className="w-full border p-2 rounded"
          />
          {/* лічильник символів */}
          <p
              className={`text-sm mt-1 ${
                  len > MAX ? "text-red-500" : "text-gray-500"
              }`}
          >
            {len}/{MAX}
          </p>
        </div>

        <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={len === 0 || len > MAX}
        >
          Додати
        </button>
      </form>
  );
}
