export type PublicationStatus = "draft" | "scheduled" | "published" | "archived";
export type JapaneseMode = { professional: string; beginner: string };
export type DashboardPlan = "free" | "lms" | "sensei";
export type RouteDestinationKey = keyof typeof routeDestinations;

export const routeDestinations = {
  dashboard: "/dashboard",
  journey: "/journey",
  library: "/library",
  practice: "/practice",
  tryout: "/tryout",
  flashcards: "/flashcards",
  schedule: "/schedule",
  replay: "/replay",
  askSensei: "/ask-sensei",
  community: "/community",
  affiliate: "/affiliate",
} as const;

export type DashboardCard = {
  id: string;
  heading: string;
  description: string;
  cta: { label: string; destination: RouteDestinationKey };
};

export type DashboardPresentation = {
  plan: DashboardPlan;
  heading: string;
  description: string;
  announcement: string;
  cards: readonly DashboardCard[];
};

export type LevelCode = "N5" | "N4" | "N3" | "N2" | "N1";

export type LevelContent = {
  id: string;
  level: LevelCode;
  title: string;
  description: string;
  tags: readonly string[];
  order: number;
  visible: boolean;
  status: PublicationStatus;
};

export type LessonBlock =
  | { type: "video"; src: string; title?: string }
  | { type: "document"; body: string }
  | ({ type: "japanese" } & JapaneseMode)
  | { type: "image"; src: string; alt: string }
  | { type: "callout"; heading?: string; body: string }
  | { type: "exerciseReference"; exerciseId: string };

export type LessonContent = {
  id: string;
  level: LevelCode;
  chapter: string;
  title: string;
  description: string;
  order: number;
  status: PublicationStatus;
  blocks: readonly LessonBlock[];
};

export type FlashcardContent = {
  id: string;
  term: string;
  reading: string;
  meaning: string;
  example: {
    before: string;
    focus: string;
    focusReading: string;
    after: string;
    translation: string;
  };
  level: LevelCode;
  chapter: string;
  order: number;
  status: PublicationStatus;
};

export const defaultDashboardPresentations: readonly DashboardPresentation[] = [];
export const defaultLevels: readonly LevelContent[] = [];
export const defaultLessons: readonly LessonContent[] = [];
export const defaultFlashcards: readonly FlashcardContent[] = [];

export interface ContentRepository {
  listDashboardPresentations(): readonly DashboardPresentation[];
  getDashboardPresentation(plan: DashboardPlan): DashboardPresentation | undefined;
  listLevels(): readonly LevelContent[];
  getLevel(level: LevelCode): LevelContent | undefined;
  listLessons(level?: LevelCode, chapter?: string): readonly LessonContent[];
  getLesson(id: string): LessonContent | undefined;
  listFlashcards(level?: LevelCode, chapter?: string): readonly FlashcardContent[];
  getFlashcard(id: string): FlashcardContent | undefined;
}

export const fixtureContentRepository: ContentRepository = {
  listDashboardPresentations: () => defaultDashboardPresentations,
  getDashboardPresentation: (plan) => defaultDashboardPresentations.find((item) => item.plan === plan),
  listLevels: () => defaultLevels,
  getLevel: (level) => defaultLevels.find((item) => item.level === level),
  listLessons: (level, chapter) => defaultLessons.filter((item) => (!level || item.level === level) && (!chapter || item.chapter === chapter)),
  getLesson: (id) => defaultLessons.find((item) => item.id === id),
  listFlashcards: (level, chapter) => defaultFlashcards.filter((item) => (!level || item.level === level) && (!chapter || item.chapter === chapter)),
  getFlashcard: (id) => defaultFlashcards.find((item) => item.id === id),
};
