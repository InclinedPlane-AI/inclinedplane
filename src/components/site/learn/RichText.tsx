/**
 * Renders learn content (src/content/learn.ts). Inline markup:
 * [text](/path) → link (internal via react-router), **text** → strong.
 */
import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { LearnBlock } from "@/content/learn";
import { TwoAnswers } from "../TwoAnswers";
import { ContextLayers } from "./ContextLayers";
import { OntologyExplorer } from "./OntologyExplorer";
import { ReadinessSim } from "./ReadinessSim";

const widgets = {
  "ontology-explorer": OntologyExplorer,
  "readiness-sim": ReadinessSim,
  "two-answers": TwoAnswers,
  "context-layers": ContextLayers,
} as const;

const TOKEN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;

export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          return href.startsWith("/") ? (
            <Link key={i} to={href}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener">
              {label}
            </a>
          );
        }
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i}>{bold[1]}</strong>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

export function Blocks({ blocks }: { blocks: LearnBlock[] }) {
  return <>{blocks.map((b, i): ReactNode => {
    switch (b.type) {
      case "p":
        return (
          <p key={i}>
            <Inline text={b.text} />
          </p>
        );
      case "h3":
        return <h3 key={i}>{b.text}</h3>;
      case "ul":
        return (
          <ul key={i}>
            {b.items.map((it) => (
              <li key={it}>
                <Inline text={it} />
              </li>
            ))}
          </ul>
        );
      case "ol":
        return (
          <ol key={i}>
            {b.items.map((it) => (
              <li key={it}>
                <Inline text={it} />
              </li>
            ))}
          </ol>
        );
      case "quote":
        return (
          <blockquote key={i}>
            <Inline text={b.text} />
            {b.source && <span className="mt-2 block text-[15px] font-normal text-ip-muted">{b.source}</span>}
          </blockquote>
        );
      case "widget": {
        const Widget = widgets[b.name];
        // Widgets use the full article column (wider than the 720px text measure).
        return (
          <figure key={i} className="not-prose !my-8 xl:w-[calc(100%+156px)]">
            <Widget />
            <figcaption className="mt-2.5 text-[14px] leading-[1.5] text-ip-muted">{b.caption}</figcaption>
          </figure>
        );
      }
      case "table":
        return (
          <div key={i} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="min-w-[560px] border-t-2 border-black">
              <caption className="sr-only">{b.caption}</caption>
              <thead>
                <tr>
                  {b.head.map((h, j) => (
                    <th key={j} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) =>
                      c === 0 ? (
                        <th key={c} scope="row">
                          <Inline text={cell} />
                        </th>
                      ) : (
                        <td key={c}>
                          <Inline text={cell} />
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
  })}</>;
}
