'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type SearchParamValues = string | string[] | undefined
type SearchParams = {
    [key: string]: SearchParamValues
}

type ContextProps = {
    params: SearchParams;
    isLoading: boolean;
    update: (key: string, value: SearchParamValues) => void;
}

const SearchParamContext = React.createContext<ContextProps | undefined>(undefined);


export function SearchParamProvider(props: {
    initialValue: SearchParams
    children: React.ReactNode
}) {
    const [params, setParams] = useState(props.initialValue)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter();

    const urlParams = useMemo(() => {
        const p: SearchParams = {}
        for (const [key, value] of Object.entries(params)) {
            p[key] = value as SearchParamValues
        }
        return p
    }, [searchParams])

    useEffect(() => {
        setParams(urlParams);
    }, [urlParams]);

    useEffect(() => {
        setIsLoading(params !== urlParams)
    }, [params, urlParams])

    useEffect(() => {
        // @ts-ignore
        const urlParams = new URLSearchParams(params)
        router.replace(pathname + '?' + urlParams.toString(), {scroll: false})
    }, [params])

    const update = (key: string, value: SearchParamValues) => {
        setParams(prev => ({...prev, [key]: value}))
    }

    return (
        <SearchParamContext.Provider value={{
            params,
            update,
            isLoading
        }}>
            {props.children}
        </SearchParamContext.Provider>
    );
}

export function useSearchParamContext() {
    const context = React.useContext(SearchParamContext);
    if (context === undefined) {
        throw new Error('useSearchParamContext must be used within a CounterProvider');
    }
    return context;
}