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
  layout?: "standard" | "compact" | "detailCards";
}

export interface PluginChooserEntry {
  name: string;
  type: string;
  popularity: number;
  emulation: string;
  bestOn: string;
  knownFor: string;
}

export interface ArticleBlock {
  heading: string;
  paragraphs: string[];
}

export interface ArticleVisualReference {
  title: string;
  src: string;
  alt: string;
  caption: string;
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
    }
  | {
      type: "article";
      title: string;
      dek?: string;
      blocks: ArticleBlock[];
      visualReferences?: ArticleVisualReference[];
    };

export interface CheatSheet {
  id: string;
  header: SheetHeader;
  summary: string;
  sections: SheetSection[];
}

export interface ContentNavItem {
  id: string;
  href: string;
  label: string;
  title: string;
  icon: string;
}

export interface TrainingLessonStep {
  number: number;
  title: string;
  concept: string;
  actions: string[];
  body: string;
  symbolName: string;
  visualTitle: string;
  visualCaption: string;
  settings?: Record<string, string> | null;
  proTip?: string | null;
  avoidThis?: string | null;
  checkYourWork: string;
  stepScreenshot?: string | null;
}

export interface TrainingLesson {
  id: string;
  title: string;
  series: string;
  summary: string;
  duration: string;
  symbolName: string;
  badges: string[];
  isFeatured: boolean;
  steps: TrainingLessonStep[];
  checklist: string[];
}

export interface TrainingContent {
  lessons: TrainingLesson[];
}

export interface ContentBundle {
  schemaVersion: number;
  contentVersion: string;
  generatedAt: string;
  minAppVersion: string;
  navItems: ContentNavItem[];
  cheatSheets: CheatSheet[];
  training: TrainingContent;
}

export interface ContentManifest {
  schemaVersion: number;
  contentVersion: string;
  generatedAt: string;
  minAppVersion: string;
  bundle: {
    url: string;
    sha256: string;
    bytes: number;
  };
}
