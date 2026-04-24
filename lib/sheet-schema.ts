export type ThemeTone =
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "red"
  | "teal"
  | "slate";

export interface SheetHeader {
  title: string;
  subtitle: string;
  icon: string;
  accent: ThemeTone;
}

export interface ChainStep {
  name: string;
  goal: string;
}

export interface CardItem {
  title: string;
  items: (
    | string
    | {
        text: string;
        imageSrc?: string;
        imageAlt?: string;
        imagePosition?: string;
      }
  )[];
}

export interface SheetTable {
  columns: string[];
  rows: string[][];
}

export interface PluginChooserEntry {
  name: string;
  type: string;
  popularity: number;
  emulation: string;
  bestOn: string;
  knownFor: string;
}

export type SheetSection =
  | {
      type: "chain";
      title: string;
      steps: ChainStep[];
    }
  | {
      type: "cards";
      title: string;
      cards: CardItem[];
      columns?: 2 | 3 | 4;
    }
  | {
      type: "table";
      title: string;
      table: SheetTable;
    }
  | {
      type: "checklist";
      title: string;
      items: string[];
    }
  | {
      type: "image";
      title: string;
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      type: "plugin-chooser";
      title: string;
      entries: PluginChooserEntry[];
    };

export interface CheatSheet {
  id: string;
  header: SheetHeader;
  summary: string;
  sections: SheetSection[];
}
