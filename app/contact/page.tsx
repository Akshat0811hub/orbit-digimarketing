import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import { PageHeading } from "@/components/page-heading";
export const metadata: Metadata = {
  title: "Let’s talk",
  description:
    "Have an ambition, a challenge or a wild idea? Start a conversation with OFFSCRIPT.",
};
export default function Page() {
  return (
    <>
      <PageHeading
        label="BIG IDEAS START WITH A HELLO"
        title="You bring the what if."
        accent="We’ll bring the why not."
      />
      <section className="contact-layout section-pad">
        <aside>
          <span className="eyebrow">LET’S CONNECT</span>
          <h2>
            Good things
            <br />
            start here.
          </h2>
          <p>
            Tell us what you have in mind.
            <br />
            We’ll figure out the next move together.
          </p>
          <div className="location-block">
            <div className="map-art">
              <i />
              <span>MUMBAI ↗</span>
              <b>
                19.0760° N<br />
                72.8777° E
              </b>
            </div>
            <h3>Mumbai, India</h3>
            <p>
              Local roots. Global curiosity.
              <br />
              Remote collaborations welcome.
            </p>
            <a
              className="text-link"
              href="https://www.google.com/maps/search/?api=1&query=Mumbai%2CIndia"
              target="_blank"
              rel="noreferrer"
            >
              Explore the city ↗
            </a>
          </div>
        </aside>
        <ContactForm />
      </section>
    </>
  );
}
