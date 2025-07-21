'use client';

import { useSearchParams } from 'next/navigation';
import { SortType } from '@/services/medals/types';
import { MedalsTable } from './MedalsTable';

export const Leaderboard = () => {
    const searchParams = useSearchParams();
    const sortParam = searchParams.get('sort');
    const sort = sortParam as SortType ?? SortType.GOLD;

    return <MedalsTable sort={sort} />;
}
