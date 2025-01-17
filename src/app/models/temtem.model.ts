export interface EvolutionTreeEntry {
  stage: number;
  number: number;
  name: string;
  level?: number; // Optional, falls nicht bei jeder Stufe vorhanden
  type: string;
  trading: boolean;
  traits: string[];
  traitMapping: Record<string, string>;
  to?: string; // Portrait hinzufügen, falls es in der API-Datenstruktur fehlt
  from?: string;
  
}

export interface Evolution {
  evolves?: boolean;
  stage?: number;
  evolutionTree?: EvolutionTreeEntry[];
}

export interface Temtem {
  number: number;
  name: string;
  types: string[];
  portraitWikiUrl: string;
  type1icon: string[];
  type2icon: string[];
  traits: string[];
  locations?: { location: string }[];
  hasLocation?: boolean;
  stats: { statName: string; statValue: number }[];
  tvYields: { statName: string; statValue: number }[];
  techniques: Technique[];
  evolution?: Evolution;
}

export interface getImage {
  evoURL?: string;
}

export interface Technique {
  name: string;
  source: string;
  number: number;
  type: string;
  class: string;
  damage: number;
  staminaCost: number;
  hold: number;
  priority: string;
  synergy: string;
  description: string;
  effectText: string;
  wikiUrl: string;
}