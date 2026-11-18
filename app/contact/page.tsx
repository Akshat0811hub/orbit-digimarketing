import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import { PageHeading } from "@/components/page-heading";
export const metadata: Metadata = {
  title: "Discuss your digital marketing goals",
  description:
    "Talk to OFFSCRIPT about SEO, website redesign, paid advertising and social media. Share your website and business goals to start the conversation.",
};
export default function Page() {
  return (
    <>
      <PageHeading
        label="LET’S TALK ABOUT YOUR BUSINESS"
        title="Your next chapter."
        accent="Starts right here."
      />
      <section className="contact-layout section-pad">
        <aside>
          <span className="eyebrow">A CLEAR STARTING POINT</span>
          <h2>
            What’s holding
            <br />
            growth back?
          </h2>
          <p>
            Share your website and the goals you’re working towards.
            <br />
            We’ll discuss where SEO, a redesign or better campaigns could help.
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
              Digital marketing, wherever you work.
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
