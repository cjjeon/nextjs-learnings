import React, {Suspense} from 'react';
import Pagination from "@/app/loading-streaming/loading-suspense/pagination";
import utils from "@/utils";
import {SearchParamProvider} from "@/app/loading-streaming/loading-suspense/SearchParamsContext";
import Test from "@/app/loading-streaming/loading-suspense/Test";

const FETCH_LIMIT = 10

type Response = {
    count: number; results: { name: string, url: string }[]
}

async function getPokemons(limit: number, offset: number): Promise<Response> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    await utils.sleep(1000)
    return res.json()
}

async function Pokemons(props: { currentPage: number }) {
    const data = await getPokemons(FETCH_LIMIT, props.currentPage * FETCH_LIMIT)

    return data.results.map(r => (<div key={r.name}>
        <div>{r.name}</div>
    </div>))
}

async function ServerPagination(props: { currentPage: number }) {
    const data = await getPokemons(FETCH_LIMIT, props.currentPage * FETCH_LIMIT)
    const totalPage = Math.floor(data.count / FETCH_LIMIT)
    return <Pagination currentPage={props.currentPage} totalPage={totalPage}/>
}

async function Page(props: { searchParams: { page: string } }) {
    const currentPage = Number(props.searchParams.page) || 1
    return (
        <SearchParamProvider initialValue={props.searchParams}>
            <div>Suspense loading and additional loading on change</div>
            <div>List of pokemons</div>
            <div className="p-5 border rounded">
                <Suspense fallback={<>Suspense Loading...</>}>
                    <Test>
                        <Pokemons currentPage={currentPage}/>
                    </Test>
                </Suspense>
            </div>
            <div className="py-2"/>
            <Suspense fallback={<></>}>
                <ServerPagination currentPage={currentPage}/>
            </Suspense>
        </SearchParamProvider>
    );
}

export default Page;