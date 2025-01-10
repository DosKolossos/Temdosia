export interface Temtem {
  number: number;
  name: string;
  types: string[];
  portraitWikiUrl: string;
  typeIcons?: string[];
  traits: string[];
  locations?: { location: string }[];
  hasLocation?: boolean;
  stats: { statName: string; statValue: number }[]; // Aktualisierte Struktur
}
