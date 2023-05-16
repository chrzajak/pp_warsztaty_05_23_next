export interface CountryDetails {
    name: NameDetails
    capital: string[]
    subregion: string
    area: number
    population: number
}

export interface NameDetails {
    common: string
    official: string
}