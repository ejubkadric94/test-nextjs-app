import { Item } from "@/typescript/types";
import { useEffect } from "react";

const useItems = (searchValue: string, setFilteredData: (data: Item[]) => void) => {
    useEffect(() => {
        if (!searchValue) {
            return;
        }
        
        fetch(`http://localhost:3000/api/products?searchValue=${searchValue}`)
            .then(response => response.json())
            .then(data => setFilteredData(data))
    }, [searchValue]);
};

export default useItems;
