import Link from "next/link";

const APP_STORE_URL = "https://apps.apple.com/app/id0000000000";

const SUPPORT_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Support" },
  { href: "/terms", label: "Terms" }
];

export function SiteFooter() {
  return (
    <footer className="siteFooter" aria-label="Site support and legal links">
      <p>Logic Pro.Guru is published by Levensailor, LLC.</p>
      <nav className="siteFooterActions" aria-label="Legal, support, and app download links">
        {SUPPORT_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <a className="appStoreLink" href={APP_STORE_URL}>
          Download iOS App
        </a>
      </nav>
    </footer>
  );
}
