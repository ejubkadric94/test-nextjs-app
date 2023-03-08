import { Item as ItemType } from "@/typescript/types";

type Props = {
    item: ItemType;
}

const Item = ({ item }: Props) => {
    return (
        <li key={item.id}>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <div>{item.description}</div>
        </li>
    );
};

export default Item;
