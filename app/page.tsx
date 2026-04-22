import { redirect } from "next/navigation";
import { defaultSheetId } from "@/data/sheets";

export default function HomePage() {
  redirect(`/sheets/${defaultSheetId}`);
}
