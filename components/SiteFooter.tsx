import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="siteFooter" aria-label="Site support and legal links">
      <p>Logic Pro.Guru is published by Levensailor, LLC.</p>
      <nav aria-label="Legal and support">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </footer>
  );
}
