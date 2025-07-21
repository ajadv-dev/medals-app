import { SortType } from '@/services/medals/types';
import { sortMedals, total } from "@/features/medals/utils";

describe('utils', () => {
    describe('utils: total', () => {
        it('calculates total medals correctly', () => {
            const country = { code: 'USA', gold: 3, silver: 5, bronze: 2 };
            expect(total(country)).toBe(10);
        });

        it('handles zero medals', () => {
            const country = { code: 'GER', gold: 0, silver: 0, bronze: 0 };
            expect(total(country)).toBe(0);
        });
    });

    describe('utils: sortMedals', () => {
        const countries = [
            { code: 'USA', gold: 3, silver: 2, bronze: 1 },
            { code: 'NOR', gold: 2, silver: 3, bronze: 4 },
            { code: 'RUS', gold: 3, silver: 2, bronze: 1 },
        ];

        it('sorts by TOTAL descending with gold tie-breaker', () => {
            const sorted = sortMedals(countries, SortType.TOTAL);
            // totals: USA=6, NOR=9, RUS=6
            expect(sorted[0].code).toBe('NOR');
            expect([sorted[1].code, sorted[2].code]).toContain('USA');
            expect([sorted[1].code, sorted[2].code]).toContain('RUS');
        });

        it('sorts by GOLD descending with silver tie-breaker', () => {
            const sorted = sortMedals(countries, SortType.GOLD);
            // gold: USA=3, NOR=2, RUS=3
            expect(sorted[0].code).toBe('USA');
            expect(sorted[1].code).toBe('RUS');
            expect(sorted[2].code).toBe('NOR');
        });

        it('sorts by SILVER descending with gold tie-breaker', () => {
            const sorted = sortMedals(countries, SortType.SILVER);
            // silver: USA=2, NOR=3, RUS=2
            expect(sorted[0].code).toBe('NOR');
            expect([sorted[1].code, sorted[2].code]).toContain('USA');
            expect([sorted[1].code, sorted[2].code]).toContain('RUS');
        });

        it('sorts by BRONZE descending with gold tie-breaker', () => {
            const sorted = sortMedals(countries, SortType.BRONZE);
            // bronze: USA=1, NOR=4, RUS=1
            expect(sorted[0].code).toBe('NOR');
            expect([sorted[1].code, sorted[2].code]).toContain('USA');
            expect([sorted[1].code, sorted[2].code]).toContain('RUS');
        });
    });
});
