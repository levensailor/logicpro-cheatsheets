import { notFound } from "next/navigation";
import { SheetRenderer } from "@/components/SheetRenderer";
import { cheatSheets, sheetMap } from "@/data/sheets";

interface SheetPageProps {
  params: Promise<{ sheetId: string }>;
}

export function generateStaticParams() {
  return cheatSheets.map((sheet) => ({ sheetId: sheet.id }));
}

export default async function SheetPage({ params }: SheetPageProps) {
  const { sheetId } = await params;
  const sheet = sheetMap.get(sheetId);

  if (!sheet) {
    notFound();
  }

  return <SheetRenderer sheet={sheet} />;
}
