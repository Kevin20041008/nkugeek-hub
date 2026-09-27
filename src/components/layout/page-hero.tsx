import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: PageHeroProps) {
  return (
    <section className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-[#7a1731]">{eyebrow}</p>

          <h1 className="mt-4 text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
            {description}
          </p>

          {actions ? (
            <div className="mt-7 flex flex-wrap gap-3">{actions}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
