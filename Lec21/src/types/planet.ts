export interface PlanetInfo {
  content: string;
  source: string;
}

export interface PlanetImages {
  planet: string;
  internal: string;
  geology: string;
}

export interface Planet {
  name: string;
  overview: PlanetInfo;
  structure: PlanetInfo;
  geology: PlanetInfo;
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
  images: PlanetImages;
}
