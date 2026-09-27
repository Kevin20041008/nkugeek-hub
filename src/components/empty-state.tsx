import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500">
        <Inbox className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-zinc-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-zinc-600">
        {description}
      </p>
      {actionLabel ? (
        <Button
          type="button"
          variant="outline"
          className="mt-5 border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
