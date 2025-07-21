export interface CountryMedals {
    code: string,
    gold: number,
    silver: number,
    bronze: number,
}

export enum SortType {
    GOLD = 'gold',
    SILVER = 'silver',
    BRONZE = 'bronze',
    TOTAL = 'total',
}
