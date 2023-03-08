import ItemsRenderer from "@/components/itemsRenderer";
import SearchBox from "@/components/searchBox";
import useItems from "@/customHooks/useItems";
import { Item } from "@/typescript/types";
import { useCallback, useEffect, useState } from "react";

type Props = {
    data: Item[];
}

const Items = ({ data }: Props) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchValueFinal, setSearchValueFinal] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Item[]>([]);

    useItems(searchValueFinal, setFilteredData);
    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            
        if (event.key === 'Enter') {
            event.preventDefault();
            setSearchValueFinal(searchValue);
            console.log('User pressed: ', event.key, searchValue);
          }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
    }, [searchValue]);


    if (!data) {
        return <div>Nothing loaded yet</div>
    }

    const onFilterItems = useCallback(() => {
        setSearchValueFinal(searchValue);
    }, [searchValue]);

    return (
        <div>
            <SearchBox
                searchValue={searchValue}
                onFilterItems={onFilterItems}
                setSearchValue={setSearchValue}
            />
            <ol>
                <ItemsRenderer
                    data={!!filteredData.length ? filteredData : data}
                />
            </ol>
        </div>
    )
};


export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/products')
    const data: Item[] = await res.json()
  
    return { props: { data } }
}

export default Items;
