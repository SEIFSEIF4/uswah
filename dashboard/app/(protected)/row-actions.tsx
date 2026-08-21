"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteSituationAction, setPublishedAction } from "./actions";

export function RowActions({ slug, published }: { slug: string; published: boolean }) {
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, start] = useTransition();
  const router = useRouter();

  const run = (fn: () => Promise<{ errors?: string[] }>) =>
    start(async () => {
      const res = await fn();
      setErrors(res.errors ?? []);
      if (!res.errors) router.refresh();
    });

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="xs"
          disabled={pending}
          onClick={() => run(() => setPublishedAction(slug, !published))}
        >
          {published ? "Unpublish" : "Publish"}
        </Button>
        <Button
          variant="destructive"
          size="xs"
          disabled={pending}
          onClick={() => {
            if (window.confirm(`Delete "${slug}" and its entries? Saves go with it.`))
              run(() => deleteSituationAction(slug));
          }}
        >
          Delete
        </Button>
      </div>
      {errors.length > 0 && (
        <p className="max-w-72 text-end text-xs text-destructive">{errors.join(" · ")}</p>
      )}
    </div>
  );
}
