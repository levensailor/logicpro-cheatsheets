import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import type { ArticleBlock, ArticleVisualReference } from "@/lib/sheet-schema";

interface ArticleSectionProps {
  id?: string;
  title: string;
  dek?: string;
  blocks: ArticleBlock[];
  visualReferences?: ArticleVisualReference[];
}

export function ArticleSection({ id, title, dek, blocks, visualReferences = [] }: ArticleSectionProps) {
  return (
    <section id={id} className="sheetSection articleSection">
      <div className="articleIntro">
        <h2 className="sectionHeading">
          <FontAwesomeIcon icon={faBookOpen} className="sectionHeadingIcon" />
          {title}
        </h2>
        {dek ? <p>{dek}</p> : null}
      </div>

      <div className={visualReferences.length > 0 ? "articleLayout" : "articleLayout singleColumn"}>
        <div className="articleBody">
          {blocks.map((block) => (
            <article key={block.heading} className="articleBlock">
              <h3>{block.heading}</h3>
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>

        {visualReferences.length > 0 ? (
          <aside className="articleVisualRail" aria-label="Visual references">
            <h3>Visual references</h3>
            <div className="articleVisualGrid">
              {visualReferences.map((reference) => (
                <figure key={reference.title} className="articleVisualCard">
                  <Image src={reference.src} alt={reference.alt} width={280} height={150} className="articleVisualImage" />
                  <figcaption>
                    <strong>{reference.title}</strong>
                    <span>{reference.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
