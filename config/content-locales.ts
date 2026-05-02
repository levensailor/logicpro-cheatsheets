export const defaultContentLocale = "en";

// Add locales here as translated content becomes available.
export const supportedContentLocales = [defaultContentLocale] as const;

export type ContentLocale = (typeof supportedContentLocales)[number];
