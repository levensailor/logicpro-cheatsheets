import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface ImageSectionProps {
  title: string;
  src: string;
  alt: string;
  caption?: string;
}

export function ImageSection({ title, src, alt, caption }: ImageSectionProps) {
  return (
    <section className="sheetSection">
      <h2 className="sectionHeading">
        <FontAwesomeIcon icon={faImage} className="sectionHeadingIcon" />
        {title}
      </h2>
      <figure className="embeddedFigure">
        <Image src={src} alt={alt} width={1200} height={700} className="embeddedImage" />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    </section>
  );
}
