"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Result = { errors?: string[] };

/** Publish/unpublish and delete for one list row. The actions come in as props
 *  so situations, sayings and intentions share this one component. */
export function RowActions({
  slug,
  published,
  publish,
  remove,
}: {
  slug: string;
  published: boolean;
  publish: (slug: string, published: boolean) => Promise<Result>;
  remove: (slug: string) => Promise<Result>;
}) {
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, start] = useTransition();
  const router = useRouter();

  const run = (fn: () => Promise<Result>) =>
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
          onClick={() => run(() => publish(slug, !published))}
        >
          {published ? "Unpublish" : "Publish"}
        </Button>
        <Button
          variant="destructive"
          size="xs"
          disabled={pending}
          onClick={() => {
            if (window.confirm(`Delete "${slug}"? This cannot be undone.`))
              run(() => remove(slug));
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
