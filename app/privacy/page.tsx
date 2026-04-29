import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Logic Pro.Guru website and iOS reference app."
};

export default function PrivacyPage() {
  return (
    <main className="legalMain">
      <section className="legalHero">
        <p className="introEyebrow">App Store readiness</p>
        <h1>Privacy Policy</h1>
        <p>
          This policy explains how Levensailor, LLC handles information for Logic Pro.Guru, a public Logic Pro
          reference handbook available on the web and as an iOS reader app.
        </p>
        <span>Last updated: April 29, 2026</span>
      </section>

      <section className="legalCard">
        <h2>Information We Collect</h2>
        <p>
          Logic Pro.Guru is designed as a read-only educational and reference app. The app does not require an account,
          login, or user profile, and Levensailor, LLC does not intentionally collect personal information from the app
          experience.
        </p>
        <p>
          If you contact support by email, we receive the information you choose to send, such as your email address,
          message, device details, screenshots, or feedback. We use that information only to respond to your request,
          improve the app, and maintain support records.
        </p>
      </section>

      <section className="legalCard">
        <h2>App Content and Updates</h2>
        <p>
          The iOS app can check the public Logic Pro.Guru website for updated handbook content. Those requests retrieve
          static content files and do not require a user account.
        </p>
        <p>
          Hosting providers may process standard technical information, such as IP address, browser or device type,
          request time, and requested URL, as part of normal web delivery, security, and reliability operations.
        </p>
      </section>

      <section className="legalCard">
        <h2>Third-Party Services</h2>
        <p>
          Logic Pro.Guru is hosted on public web infrastructure and may rely on platform services from Apple and hosting
          providers to distribute the app and website. The app does not include advertising, user tracking, or a
          third-party account system.
        </p>
      </section>

      <section className="legalCard">
        <h2>How We Use Information</h2>
        <ul>
          <li>To provide the website and iOS reference app.</li>
          <li>To deliver app content updates and maintain offline reference content.</li>
          <li>To respond to support requests, feedback, and feature suggestions.</li>
          <li>To protect the site and app from abuse, errors, and reliability issues.</li>
        </ul>
      </section>

      <section className="legalCard">
        <h2>Contact and Privacy Requests</h2>
        <p>
          For questions about this policy or your privacy choices, contact Levensailor, LLC at{" "}
          <a href="mailto:support@pyrmid.pro">support@pyrmid.pro</a>.
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
