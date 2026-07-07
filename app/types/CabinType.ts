export type CabinResponse = {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    name: string;
    description: string;
    discount: number;
    image: string;
    maxCapacity: number;
    regularPrice: number;
}
export type FiltersType = "all" | "sm" | "md" | "lg";