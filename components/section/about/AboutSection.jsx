import { Container } from "@/components/common/index";

export function AboutSection() {
  return (
    <Container>
      <div className="mx-4 md:mx-0 flex flex-col xl:flex-row">
        <div className="flex items-center justify-center">
          <iframe
            className="responsive-iframe"
            src="https://www.youtube.com/embed/R9UZ7-zKLT4"
            title="DMD Footwear AMFD All Day Video Ad"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex flex-col mt-4 xl:mx-16 md:justify-between xl:mt-0 font-Rokkitt">
          <h2 className="text-4xl mb-4">
            Footwear the leading eCommerce Store around the Globe
          </h2>
          <p className="text-base text-secondary mb-4">
            The Big Oxmox advised her not to do so, because there were thousands
            of bad Commas, wild Question Marks and devious Semikoli, but the
            Little Blind Text didn’t listen. She packed her seven versalia, put
            her initial into the belt and made herself on the way.
          </p>
          <p className="text-base text-secondary">
            When she reached the first hills of the Italic Mountains, she had a
            last view back on the skyline of her hometown Bookmarksgrove, the
            headline of Alphabet Village and the subline of her own road, the
            Line Lane. Pityful a rethoric question ran over her cheek, then she
            continued her way.
          </p>
        </div>
      </div>
    </Container>
  );
}
