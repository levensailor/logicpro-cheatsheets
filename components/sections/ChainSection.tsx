import type { ChainStep } from "@/lib/sheet-schema";

interface ChainSectionProps {
  title: string;
  steps: ChainStep[];
}

export function ChainSection({ title, steps }: ChainSectionProps) {
  return (
    <section className="sheetSection">
      <h2>{title}</h2>
      <ol className="chainList">
        {steps.map((step, index) => (
          <li key={`${step.name}-${index}`} className="chainStepCard">
            <div className="chainStepNumber">{index + 1}</div>
            <h3>{step.name}</h3>
            <p>{step.goal}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
