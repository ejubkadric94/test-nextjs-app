type Props = {
    searchValue: string;
    onFilterItems: (value: string) => void;
    setSearchValue: (value: string) => void;
}

const SearchBox = ({ searchValue, onFilterItems, setSearchValue }: Props) => {
    return (
        <div>
            <input
                value={searchValue}
                type="text"
                placeholder="Search for items"
                onChange={(e) => setSearchValue(e.currentTarget.value)}
            />
            <button onClick={() => onFilterItems(searchValue)}>Search</button>
        </div>
    );
};

export default SearchBox;
