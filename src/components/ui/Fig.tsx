import type { ReactNode } from "react";

/** Marco de figura: papel cuadriculado y pie de foto, como en la guía. */
export function Fig({
  children,
  pie,
  maxW = "30rem",
}: {
  children: ReactNode;
  pie?: ReactNode;
  maxW?: string;
}) {
  return (
    <figure className="m-0 rounded-piece border-[1.5px] border-line paper-grid px-2.5 pt-3 pb-2">
      <div className="mx-auto" style={{ maxWidth: maxW }}>
        {children}
      </div>
      {pie ? (
        <figcaption className="mt-2 rounded px-2 pt-2 text-[0.92rem] leading-snug text-ink-soft">
          {pie}
        </figcaption>
      ) : null}
    </figure>
  );
}
