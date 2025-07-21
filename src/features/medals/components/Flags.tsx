import React from 'react';
import styles from '../styles.module.css';
import {countryCodes, FLAG_HEIGHT} from "@/features/medals/consts";
import {flagsPngUrl} from "@/api/consts";

export const Flag = ({ code }: { code: string}) => {
 const sortedCountryCodes = countryCodes.sort((a, b) => a.localeCompare(b));
    const index = sortedCountryCodes.indexOf(code.toUpperCase())
    const yOffset = -index * FLAG_HEIGHT;
console.log(flagsPngUrl);
    return (
        <div
            className={styles.flag}
            style={{
                backgroundPosition: `0px ${yOffset}px`,
                backgroundImage: `url(${flagsPngUrl})`,
            }}
            aria-label={`Flag of ${code}`}
        />
    );
}
