import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MedalsTable } from './MedalsTable';
import { SortType } from '@/services/medals/types';
import { total } from '@/features/medals/utils';

// Mock CSS module with default export
vi.mock('../styles.module.css', () => ({
    default: {
        table: 'table',
        headerCell: 'headerCell',
        activeSort: 'activeSort',
        row: 'row',
        dataCell: 'dataCell',
    },
}));

// Mock Flag component
vi.mock('@/features/medals/components/Flags', () => ({
    Flag: ({ code }: { code: string }) => <span data-testid="flag">{code}</span>,
}));

// Mock useSortedMedals hook
vi.mock('@/features/medals/hooks/useSortedMedals', () => ({
    useSortedMedals: vi.fn(),
}));

import { useSortedMedals } from '@/features/medals/hooks/useSortedMedals';

describe('MedalsTable', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state', () => {
        (useSortedMedals as vi.Mock).mockReturnValue({
            medals: [],
            isLoading: true,
            error: null,
        });

        render(<MedalsTable sort={SortType.GOLD} />);

        expect(screen.getByText('Loading medals...')).toBeDefined();
    });

    it('renders error state', () => {
        (useSortedMedals as vi.Mock).mockReturnValue({
            medals: [],
            isLoading: false,
            error: new Error('Failed to fetch'),
        });

        render(<MedalsTable sort={SortType.GOLD} />);

        expect(screen.getByText('Could not fetch medal data. Try again later.')).toBeDefined();
    });

    it('renders medal rows with correct data and total', () => {
        const medalsMock = [
            { code: 'USA', gold: 10, silver: 5, bronze: 3 },
            { code: 'CAN', gold: 7, silver: 8, bronze: 2 },
        ];

        (useSortedMedals as vi.Mock).mockReturnValue({
            medals: medalsMock,
            isLoading: false,
            error: null,
        });

        render(<MedalsTable sort={SortType.GOLD} />);

        // Header row + 2 data rows
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(3);

        // Check first country row cells
        const firstDataRowCells = rows[1].querySelectorAll('td');

        expect(firstDataRowCells[0].textContent).toBe('1');
        expect(firstDataRowCells[1].textContent).toContain('USA');
        expect(screen.getAllByTestId('flag')[0]).toHaveTextContent('USA');
        expect(firstDataRowCells[2].textContent).toBe('10')
        expect(firstDataRowCells[3].textContent).toBe('5');
        expect(firstDataRowCells[4].textContent).toBe('3');
        expect(firstDataRowCells[5].textContent).toBe(String(total(medalsMock[0])));

        // Check second country row similarly
        const secondDataRowCells = rows[2].querySelectorAll('td');
        expect(secondDataRowCells[1].textContent).toContain('CAN');
        expect(screen.getAllByTestId('flag')[1]).toHaveTextContent('CAN');
    });

    it('changes active sort on header click', () => {
        const medalsMock = [{ code: 'USA', gold: 1, silver: 2, bronze: 3 }];

        // This mock returns the same medals regardless of currentSort,
        // so we only check className changes caused by internal state update
        (useSortedMedals as vi.Mock).mockReturnValue({
            medals: medalsMock,
            isLoading: false,
            error: null,
        });

        render(<MedalsTable sort={SortType.GOLD} />);

        const goldHeader = screen.getByText(/🥇 Gold/);
        const silverHeader = screen.getByText(/🥈 Silver/);

        // Initially GOLD header should have activeSort class
        expect(goldHeader.className).toContain('activeSort');
        expect(silverHeader.className).not.toContain('activeSort');

        // Click SILVER header to change sort
        fireEvent.click(silverHeader);

        // After click, GOLD header should lose activeSort, SILVER header should gain it
        expect(goldHeader.className).not.toContain('activeSort');
        expect(silverHeader.className).toContain('activeSort');
    });
});
