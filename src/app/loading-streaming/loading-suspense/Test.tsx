'use client';
import React from 'react';
import {useSearchParamContext} from "@/app/loading-streaming/loading-suspense/SearchParamsContext";

function Test(props: { children: React.ReactNode }) {
    const {params, isLoading} = useSearchParamContext()
    return (
        <div>
            <div>{JSON.stringify(params)}</div>
            <div>{JSON.stringify(isLoading)}</div>
            <div className={isLoading ? 'bg-gray-900' : ''}>{props.children}</div>
        </div>
    );
}

export default Test;