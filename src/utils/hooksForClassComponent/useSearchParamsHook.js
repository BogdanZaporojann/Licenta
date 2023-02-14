import {useSearchParams} from "react-router-dom";
export const useSearchParamsHook = (queryParam) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return searchParams.get(queryParam)
}

export const withSearchParamsHOC = (Component) => {
    return (props) => {
        const itemsCount = useSearchParamsHook("itemsCount")
        return <Component itemsCount={itemsCount} {...props} />
    }
}