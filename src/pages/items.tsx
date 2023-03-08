import { Item } from "@/typescript/types";

type Props = {
    data: Item[];
}

const Items = ({ data }: Props) => {
    if (!data) {
        return <div>Nothing loaded yet</div>
    }

    return (
        <ol>
            {data.map(item => (
                <li key={item.id}>
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                    <div>{item.description}</div>
                </li>
            ))}
        </ol>
    )
};


export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/products')
    const data: Item[] = await res.json()
  
    return { props: { data } }
}

export default Items;
