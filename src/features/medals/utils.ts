import {CountryMedals, SortType} from "@/services/medals/types";

export const sortMedals = (data: CountryMedals[], sortBy: SortType): CountryMedals[] => {
    return [...data].sort((countryA, countryB) => {
        const primaryA = sortBy === SortType.TOTAL ? total(countryA) : countryA[sortBy];
        const primaryB = sortBy === SortType.TOTAL ? total(countryB) : countryB[sortBy];

        if (primaryB !== primaryA) return primaryB - primaryA;

        // Tie-breaker rules
        switch (sortBy) {
            case SortType.TOTAL:
                return countryB.gold - countryA.gold;
            case SortType.GOLD:
                return countryB.silver - countryA.silver;
            case SortType.SILVER:
            case SortType.BRONZE:
                return countryB.gold - countryA.gold;
            default: return 0
        }
    });
}

export const total = (country: CountryMedals) => {
    return country.gold + country.silver + country.bronze;
}
