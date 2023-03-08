import { Item } from "@/typescript/types";
import { useCallback, useEffect, useState } from "react";

type Props = {
    data: Item[];
}

const Items = ({ data }: Props) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchValueFinal, setSearchValueFinal] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Item[]>([]);

    useEffect(() => {
        if (!searchValueFinal) {
            return;
        }
        
        fetch(`http://localhost:3000/api/products?searchValue=${searchValueFinal}`)
            .then(response => response.json())
            .then(data => setFilteredData(data))
    }, [searchValueFinal]);

    if (!data) {
        return <div>Nothing loaded yet</div>
    }

    const onFilterItems = useCallback(() => {
        setSearchValueFinal(searchValue);
    }, [searchValue]);

    let items;
    if (!!filteredData.length) {
        items = (
            filteredData.map(item => (
                <li key={item.id}>
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                    <div>{item.description}</div>
                </li>
            ))
        )
    } else {
        items = (
            data.map(item => (
                <li key={item.id}>
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                    <div>{item.description}</div>
                </li>
            ))
        )
    } 

    return (
        <div>
            <div>
                <input
                    value={searchValue}
                    type="text"
                    placeholder="Search for items"
                    onChange={(e) => setSearchValue(e.currentTarget.value)}
                />
                <button onClick={onFilterItems}>Search</button>
            </div>
            <ol>
                {items}
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
