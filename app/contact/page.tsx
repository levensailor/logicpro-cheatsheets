import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact and Support",
  description: "Contact Levensailor, LLC for Logic Pro.Guru app support, feedback, and feature requests."
};

export default function ContactPage() {
  return (
    <main className="legalMain">
      <section className="legalHero">
        <p className="introEyebrow">Support</p>
        <h1>Contact and Support</h1>
        <p>
          Need help with the Logic Pro.Guru website or iOS reader app? Contact Levensailor, LLC for support, feedback,
          and feature requests.
        </p>
      </section>

      <section className="legalCard contactGrid">
        <div>
          <h2>Email Support</h2>
          <p>
            Send app issues, content corrections, and feature requests to{" "}
            <a href="mailto:support@pyrmid.pro">support@pyrmid.pro</a>.
          </p>
        </div>
        <div>
          <h2>Publisher</h2>
          <address>
            Levensailor, LLC
            <br />
            2206 Klein Rd
            <br />
            Wilmington, NC 28405
          </address>
        </div>
      </section>

      <section className="legalCard">
        <h2>Helpful Support Details</h2>
        <p>
          If you are reporting an app issue, include your device model, iOS version, app version, the chapter or page
          where the issue happened, and a short description of what you expected to happen.
        </p>
      </section>

      <section className="legalCard">
        <h2>Legal Links</h2>
        <div className="legalLinkList">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms and Conditions</Link>
        </div>
      </section>

      <div className="legalBackLink">
        <Link href="/">Back to Logic Pro.Guru</Link>
      </div>
    </main>
  );
}
