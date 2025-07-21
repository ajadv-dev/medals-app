'use client';
import { useState } from 'react';
import styles from '../styles.module.css';
import {SortType} from "@/services/medals/types";
import {useSortedMedals} from "@/features/medals/hooks/useSortedMedals";
import {Flag} from "@/features/medals/components/Flags";
import {total} from "@/features/medals/utils";

interface MedalsTableProps {
    sort: SortType
}

export const MedalsTable = ({ sort }: MedalsTableProps) => {
    const [currentSort, setCurrentSort] = useState<SortType>(sort);
    const { medals, isLoading, error } = useSortedMedals(currentSort);

    const handleSort = (newSort: SortType) => {
        setCurrentSort(newSort);
    };

    if (isLoading) return <p>Loading medals...</p>;
    if (error) return <p>Could not fetch medal data. Try again later.</p>;

    return (
        <table className={styles.table}>
            <thead>
            <tr>
                <th  className={styles.headerCell}></th>
                <th className={styles.headerCell}></th>
                <th className={`${styles.headerCell} ${currentSort === SortType.GOLD ? styles.activeSort : ''}`} onClick={() => handleSort(SortType.GOLD)}>🥇 Gold</th>
                <th className={`${styles.headerCell} ${currentSort === SortType.SILVER ? styles.activeSort : ''}`} onClick={() => handleSort(SortType.SILVER)}>🥈 Silver</th>
                <th className={`${styles.headerCell} ${currentSort === SortType.BRONZE ? styles.activeSort : ''}`} onClick={() => handleSort(SortType.BRONZE)}>🥉 Bronze</th>
                <th className={`${styles.headerCell} ${currentSort === SortType.TOTAL ? styles.activeSort : ''}`} onClick={() => handleSort(SortType.TOTAL)}>🏅 Total</th>
            </tr>
            </thead>
            <tbody>
            {medals.map((country, index) => (
                <tr key={country.code}  className={styles.row}>
                    <td  className={styles.dataCell}>{index + 1}</td>
                    <td  className={styles.dataCell}><Flag code={country.code} /> {country.code}</td>
                    <td  className={styles.dataCell}>{country.gold}</td>
                    <td  className={styles.dataCell}>{country.silver}</td>
                    <td  className={styles.dataCell}>{country.bronze}</td>
                    <td  className={styles.dataCell}>{total(country)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
