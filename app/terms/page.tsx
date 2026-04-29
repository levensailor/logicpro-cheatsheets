import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using the Logic Pro.Guru website and iOS reference app."
};

export default function TermsPage() {
  return (
    <main className="legalMain">
      <section className="legalHero">
        <p className="introEyebrow">Usage terms</p>
        <h1>Terms and Conditions</h1>
        <p>
          These terms govern your use of Logic Pro.Guru, including the website, shared handbook content, and iOS
          reference app published by Levensailor, LLC.
        </p>
        <span>Last updated: April 29, 2026</span>
      </section>

      <section className="legalCard">
        <h2>Educational Reference Only</h2>
        <p>
          Logic Pro.Guru provides music production guidance, cheat sheets, plugin references, and workflow reminders for
          recording, mixing, and mastering. The content is educational and informational. It does not guarantee any
          particular creative, technical, commercial, or audio quality outcome.
        </p>
      </section>

      <section className="legalCard">
        <h2>No Apple Affiliation</h2>
        <p>
          Logic Pro.Guru is an independent reference product. It is not affiliated with, endorsed by, sponsored by, or
          approved by Apple Inc. Logic Pro, Apple, iPhone, iPad, and related marks are trademarks of Apple Inc.
        </p>
      </section>

      <section className="legalCard">
        <h2>Acceptable Use</h2>
        <ul>
          <li>Use the app and website for lawful personal, educational, and studio reference purposes.</li>
          <li>Do not attempt to disrupt, scrape at abusive scale, reverse engineer, or misuse the service.</li>
          <li>Do not copy, republish, or sell the handbook content as a competing product without permission.</li>
        </ul>
      </section>

      <section className="legalCard">
        <h2>Content Accuracy</h2>
        <p>
          Music production recommendations depend on source material, monitoring environment, taste, and workflow. We
          aim to keep the handbook useful and current, but settings, plugin availability, prices, platform compatibility,
          and best practices can change.
        </p>
      </section>

      <section className="legalCard">
        <h2>Purchases and App Store Terms</h2>
        <p>
          If Logic Pro.Guru is distributed through the Apple App Store, downloads, purchases, refunds, and app delivery
          are also governed by Apple&apos;s applicable App Store terms and policies.
        </p>
      </section>

      <section className="legalCard">
        <h2>Disclaimer and Limitation of Liability</h2>
        <p>
          Logic Pro.Guru is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. To the maximum extent
          permitted by law, Levensailor, LLC is not liable for indirect, incidental, special, consequential, or punitive
          damages arising from your use of the app, website, or handbook content.
        </p>
      </section>

      <section className="legalCard">
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to <a href="mailto:support@pyrmid.pro">support@pyrmid.pro</a>.
        </p>
        <address>
          Levensailor, LLC
          <br />
          2206 Klein Rd
          <br />
          Wilmington, NC 28405
        </address>
      </section>

      <div className="legalBackLink">
        <Link href="/">Back to Logic Pro.Guru</Link>
      </div>
    </main>
  );
}
