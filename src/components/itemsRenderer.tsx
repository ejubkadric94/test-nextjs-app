import { Item as ItemType } from "@/typescript/types";
import Item from "./item";

type Props = {
    data: ItemType[];
};

const ItemsRenderer = ({ data }: Props) => {
    return (
        <>
            {data.map(element => <Item item={element} key={element.id} />)}
        </>
    )
};

export default ItemsRenderer;
