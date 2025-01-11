
// export interface Evolution {
//   stage: number;
//   number: number;
//   name: string;
//   level: number | null; // Level für die nächste Entwicklung (null, wenn keine weitere Entwicklung)
//   type: string; // Typ der Evolution (z. B. "levels" oder andere)
//   trading: boolean; // Gibt an, ob die Entwicklung durch Handel erfolgt
//   traits: string[]; // Eigenschaften für diese Stufe
//   traitMapping: Record<string, string>;
// }

// export interface Temtem {
//   number: number;
//   name: string;
//   types: string[];
//   portraitWikiUrl: string;
//   typeIcons?: string[];
//   traits: string[];
//   locations?: { location: string }[];
//   hasLocation?: boolean;
//   stats: { statName: string; statValue: number }[];
//   evolutionTree?: Evolution[]; // EvolutionTree als Array von Evolution-Objekten
//   evolves?: boolean; // Gibt an, ob das Temtem sich überhaupt entwickelt
// }

export interface EvolutionTreeEntry {
  stage: number;
  number: number;
  name: string;
  level: number;
  type: string;
  trading: boolean;
  traits: string[];
  traitMapping: Record<string, string>;
}

export interface Evolution {
  evolves: boolean;
  stage?: number;
  evolutionTree?: EvolutionTreeEntry[];
}

export interface Temtem {
  number: number;
  name: string;
  types: string[];
  portraitWikiUrl: string;
  typeIcons?: string[];
  traits: string[];
  locations?: { location: string }[];
  hasLocation?: boolean;
  stats: { statName: string; statValue: number }[];
  evolution?: Evolution; // Neue Eigenschaft
}
