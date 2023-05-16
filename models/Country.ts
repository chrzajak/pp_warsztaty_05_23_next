export interface Country {
    name: NameDetails
    area: number
    population: number
}

export interface NameDetails {
    common: string
    official: string
}