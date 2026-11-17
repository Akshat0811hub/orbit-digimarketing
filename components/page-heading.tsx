import { Reveal } from "./animations";
export function PageHeading({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent: string;
  description?: string;
}) {
  return (
    <section className="page-heading">
      <span className="eyebrow">{label}</span>
      <Reveal>
        <h1>
          {title}
          <br />
          <em>{accent}</em>
        </h1>
      </Reveal>
      {description && <p>{description}</p>}
    </section>
  );
}
