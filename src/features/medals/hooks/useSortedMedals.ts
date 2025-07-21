import {SortType} from "@/services/medals/types";
import {useGetMedalsQuery} from "@/services/medals/medalsService";
import {useMemo} from "react";
import {sortMedals} from "@/features/medals/utils";

export const useSortedMedals = (sort: SortType = SortType.GOLD) => {
    const { data, error, isLoading } = useGetMedalsQuery();

    const sortedMedals = useMemo(() => {
        if (!data) return [];
        return sortMedals(data, sort).slice(0, 10);
    }, [data, sort]);

    return { medals: sortedMedals, error, isLoading };

}
