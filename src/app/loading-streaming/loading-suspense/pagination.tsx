'use client'
import React from 'react';
import {useSearchParamContext} from "@/app/loading-streaming/loading-suspense/SearchParamsContext";

function Pagination(props: { currentPage: number, totalPage: number }) {
    const {update} = useSearchParamContext()

    const updatePage = (move: 'inc' | 'dec') => {
        if (move === 'dec') {
            update('page', (props.currentPage - 1).toString())
        } else {
            update('page', (props.currentPage + 1).toString())
        }

    }

    return (
        <div className="flex items-center">
            <button disabled={props.currentPage === 1}
                    className="border border-r-0 rounded-l h-10 px-4 disabled:bg-slate-900"
                    onClick={() => updatePage('dec')}>
                Previous Page
            </button>
            <div className="border w-10 h-10 flex items-center justify-center">
                {props.currentPage}
            </div>
            <button disabled={props.currentPage >= props.totalPage}
                    className="border border-l-0 rounded-r h-10 px-4 disabled:bg-slate-900"
                    onClick={() => updatePage('inc')}>
                Next Page
            </button>
        </div>
    )
}

export default Pagination;