import { cabin } from "../lib/cabin";
import { CabinResponse } from "../types/CabinType";
import CabinCard from "./CabinCard";

type CabinsListProps = {
    filter?: string;
};

export async function CabinsList({ filter = "all" }: CabinsListProps) {
    const res = await cabin();
    console.log(res, "cabins");

    let displayCabins = res;
    switch (filter) {
        case "sm":
            displayCabins = res.filter((item: CabinResponse) => item.maxCapacity <= 3);
            break;
        case "md":
            displayCabins = res.filter((item: CabinResponse) => item.maxCapacity >= 4 && item.maxCapacity <= 7);
            break;
        case "lg":
            displayCabins = res.filter((item: CabinResponse) => item.maxCapacity >= 4 && item.maxCapacity >= 8);
            break;
        default:
            break;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-[47px] gap-x-[51px]">
            {displayCabins.map((item: CabinResponse) => {
                return (<CabinCard key={item.id} item={item} />)
            })}
        </div>
    )
}
