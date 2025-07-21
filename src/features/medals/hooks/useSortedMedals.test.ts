import { renderHook } from '@testing-library/react';
import * as medalsService from '@/services/medals/medalsService';
import { useSortedMedals } from './useSortedMedals';
import { sortMedals } from '@/features/medals/utils';
import {CountryMedals, SortType} from '@/services/medals/types';

vi.mock('@/services/medals/medalsService');

describe('useSortedMedals', () => {
    const mockData: CountryMedals[] = [
        { gold: 2, silver: 3, bronze: 1, code: 'USA' },
        { gold: 5, silver: 1, bronze: 0, code: 'GER' },
        { gold: 1, silver: 4, bronze: 2, code: 'RUS' },
    ];

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('returns empty medals array if no data', () => {
        (medalsService.useGetMedalsQuery as unknown as vi.Mock).mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: false,
        });

        const { result } = renderHook(() => useSortedMedals());

        expect(result.current.medals).toEqual([]);
        expect(result.current.error).toBeUndefined();
        expect(result.current.isLoading).toBe(false);
    });

    it('returns sorted medals limited to 10 items', () => {
        (medalsService.useGetMedalsQuery as unknown as vi.Mock).mockReturnValue({
            data: mockData,
            error: undefined,
            isLoading: false,
        });

        const { result } = renderHook(() => useSortedMedals(SortType.GOLD));

        const expected = sortMedals(mockData, SortType.GOLD).slice(0, 10);

        expect(result.current.medals).toEqual(expected);
        expect(result.current.medals.length).toBeLessThanOrEqual(10);
        expect(result.current.error).toBeUndefined();
        expect(result.current.isLoading).toBe(false);
    });

    it('passes error and loading state correctly', () => {
        (medalsService.useGetMedalsQuery as unknown as vi.Mock).mockReturnValue({
            data: undefined,
            error: 'some error',
            isLoading: true,
        });

        const { result } = renderHook(() => useSortedMedals());

        expect(result.current.error).toBe('some error');
        expect(result.current.isLoading).toBe(true);
        expect(result.current.medals).toEqual([]);
    });
});
