import type { ChainStep } from "@/lib/sheet-schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faVolumeHigh,
  faMagnifyingGlass,
  faGaugeHigh,
  faSliders,
  faWaveSquare,
  faCloud,
  faChartColumn
} from "@fortawesome/free-solid-svg-icons";

interface ChainSectionProps {
  title: string;
  steps: ChainStep[];
}

function getStepIcon(stepName: string) {
  const normalized = stepName.toLowerCase();

  if (normalized.includes("gain")) return faVolumeHigh;
  if (normalized.includes("surgical") || normalized.includes("eq")) return faMagnifyingGlass;
  if (normalized.includes("compression")) return faGaugeHigh;
  if (normalized.includes("tone")) return faSliders;
  if (normalized.includes("saturation")) return faWaveSquare;
  if (normalized.includes("reverb") || normalized.includes("space")) return faCloud;
  if (normalized.includes("limit")) return faChartColumn;

  return faSliders;
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
              <FontAwesomeIcon icon={getStepIcon(step.name)} />
            </div>
            <h3>{step.name}</h3>
            <p>{step.goal}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
