export interface CountryBasicInfo {
  name: {
    common: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  population: number;
  capital: string[];
  region: string;
  subregion: string;
}

export interface CountryDomainInfo {
  tld: string[];
}

export interface CountryCurrencyInfo {
  currencies: {
    [currencyCode: string]: {
      name: string;
      symbol: string;
    };
  };
}

export interface CountryLanguageInfo {
  languages: {
    [languageCode: string]: string;
  };
}

export interface CountryBorderInfo {
  borders: string[];
  cca3: string;
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Country
  extends CountryBasicInfo,
    CountryDomainInfo,
    CountryCurrencyInfo,
    CountryLanguageInfo,
    CountryBorderInfo {
  flags: CountryFlags; 
}
