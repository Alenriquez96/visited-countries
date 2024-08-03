export interface CountryCollection {
  type?: string;
  features: Feature[];
  bbox?: number[];
}

export interface Feature {
  type: string;
  properties: Properties;
  bbox: number[];
  geometry: Geometry;
}

interface Geometry {
  type: string;
  coordinates: number[][][];
}

interface Properties {
  scalerank: number;
  featurecla: string;
  LABELRANK: number;
  SOVEREIGNT: string;
  SOV_A3: string;
  ADM0_DIF: number;
  LEVEL: number;
  TYPE: string;
  ADMIN: string;
  ADM0_A3: string;
  GEOU_DIF: number;
  GEOUNIT: string;
  GU_A3: string;
  SU_DIF: number;
  SUBUNIT: string;
  SU_A3: string;
  BRK_DIFF: number;
  NAME: string;
  NAME_LONG: string;
  BRK_A3: string;
  BRK_NAME: string;
  BRK_GROUP: null;
  ABBREV: string;
  POSTAL: string;
  FORMAL_EN: string;
  FORMAL_FR: null;
  NAME_CIAWF: string;
  NOTE_ADM0: null;
  NOTE_BRK: null;
  NAME_SORT: string;
  NAME_ALT: null;
  MAPCOLOR7: number;
  MAPCOLOR8: number;
  MAPCOLOR9: number;
  MAPCOLOR13: number;
  POP_EST: number;
  POP_RANK: number;
  GDP_MD_EST: number;
  POP_YEAR: number;
  LASTCENSUS: number;
  GDP_YEAR: number;
  ECONOMY: string;
  INCOME_GRP: string;
  WIKIPEDIA: string;
  FIPS_10_: string;
  ISO_A2: string;
  ISO_A3: string;
  ISO_A3_EH: string;
  ISO_N3: number;
  UN_A3: number;
  WB_A2: string;
  WB_A3: string;
  WOE_ID: number;
  WOE_ID_EH: number;
  WOE_NOTE: string;
  ADM0_A3_IS: string;
  ADM0_A3_US: string;
  ADM0_A3_UN: number;
  ADM0_A3_WB: number;
  CONTINENT: string;
  REGION_UN: string;
  SUBREGION: string;
  REGION_WB: string;
  NAME_LEN: number;
  LONG_LEN: number;
  ABBREV_LEN: number;
  TINY: number;
  HOMEPART: number;
  MIN_ZOOM: number;
  MIN_LABEL: number;
  MAX_LABEL: number;
}
