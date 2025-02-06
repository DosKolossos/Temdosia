export interface EvolutionTreeEntry {
  stage: number;
  number: number;
  name: string;
  level?: number; // Optional, falls nicht bei jeder Stufe vorhanden
  type: string;
  trading: boolean;
  traits: string[];
  traitMapping: Record<string, string>;
  description?: string; // Beschreibung für spezielle Evolutionen
}


export interface Evolution {
  evolves?: boolean;
  stage?: number;
  evolutionTree?: EvolutionTreeEntry[];
  to?: string[];
}

export interface Temtem {
  number: number;
  name: string;
  types: string[];
  icon: string;
  portraitWikiUrl: string;
  type1icon: string;
  type2icon: string;
  traits: {name: string, effect: string}[];
  locations?: Locations[];
  hasLocation?: boolean;
  stats: { statName: string; statValue: number }[];
  tvYields: { statName: string; statValue: number }[];
  techniques: Technique[];
  evolution?: Evolution;
  gameDescription?: string;
  trivia?: string[];
  matchUps: { [key: string]: string[] }; // MatchUps als Objekt mit Schlüssel und Array
}
export interface Locations {
  location: string;
  island: string;
}

export interface getImage {
  evoURL?: string;
}

export interface Technique {
  name: string;
  source: string;
  levels: number;
  number: number;
  type: string;
  class: string;
  classIcon: string;
  damage: number;
  staminaCost: number;
  hold: number;
  priority: string;
  priorityIcon: string;
  targets: string;
  synergy: string;
  description: string;
  effectText: string;
  wikiUrl: string;
}
