import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { frequentlyAskedQuestionsArticle } from "@/data/articles/frequently-asked-questions";

export const metadata: Metadata = {
  title: frequentlyAskedQuestionsArticle.title,
  description: frequentlyAskedQuestionsArticle.description
};

const article = frequentlyAskedQuestionsArticle;

export default function FrequentlyAskedQuestionsArticlePage() {
  return (
    <main className="articleMain">
      <article className="articleContent">
        <header className="articleHeader">
          <Link href="/" className="articleBackLink">
            &larr; Back to Home
          </Link>
          <h1>{article.title}</h1>
          <p className="articleMeta">
            Logic Pro recording, mixing, export, and session-management answers &bull; {article.updatedLabel}
          </p>
          <p>
            These answers cover the questions that stop beginners in the middle of a real session: where to save
            projects, how to use external drives, when to change the buffer, whether stock plugins are enough, how to
            export a finished song, what healthy waveforms look like, how take folders work, what bouncing does, why
            mono checks matter, and how to enlarge waveforms without changing level.
          </p>
        </header>

        <section className="articleSection" aria-labelledby="faq-table-of-contents">
          <h2 id="faq-table-of-contents">Quick Navigation</h2>
          <ol>
            {article.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.question}</a>
              </li>
            ))}
          </ol>
        </section>

        {article.sections.map((section, sectionIndex) => (
          <section key={section.id} id={section.id} className="articleSection">
            <h2>
              {sectionIndex + 1}. {section.question}
            </h2>
            <p>
              <strong>Short answer:</strong> {section.answer}
            </p>

            {section.blocks.map((block) => (
              <div key={block.title}>
                <h3>{block.title}</h3>
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <ul>
                  {block.takeaways.map((takeaway) => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ul>
                <div className="articleImageWrapper">
                  <Image
                    src={block.image.src}
                    alt={block.image.alt}
                    width={1200}
                    height={700}
                    className="articleImage"
                  />
                  <p className="articleImageCaption">{block.image.caption}</p>
                </div>
              </div>
            ))}
          </section>
        ))}

        <footer className="articleFooter">
          <p>
            Keep this FAQ open while tracking and mixing, then return to the handbook chapters for deeper instrument,
            plugin, routing, and mastering references.
          </p>
          <Link href="/sheets/tracking-band">Continue with the Tracking a Band chapter</Link>
        </footer>
      </article>
    </main>
  );
}
