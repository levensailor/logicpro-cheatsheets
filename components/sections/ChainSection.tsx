import type { ChainStep } from "@/lib/sheet-schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faWaveSquare } from "@fortawesome/free-solid-svg-icons";

interface ChainSectionProps {
  title: string;
  steps: ChainStep[];
}

export function ChainSection({ title, steps }: ChainSectionProps) {
  return (
    <section className="sheetSection">
      <h2 className="sectionHeading">
        <FontAwesomeIcon icon={faLink} className="sectionHeadingIcon" />
        {title}
      </h2>
      <ol className="chainList">
        {steps.map((step, index) => (
          <li key={`${step.name}-${index}`} className="chainStepCard">
            <div className="chainStepIcon">
              <FontAwesomeIcon icon={faWaveSquare} />
            </div>
            <h3>{step.name}</h3>
            <p>{step.goal}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
