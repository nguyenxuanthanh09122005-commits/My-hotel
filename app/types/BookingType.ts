export type BookingRequest = {
    cabinId: string | number,
    startDate: Date,
    endDate: Date,
    numGuests: number,
    observations: string
}
export type BookingRessponse = {
    cabinPrice: number,
    cabins: string,
    createdAt: Date,
    endDate: Date,
    extrasPrice: number
    guests: string
    hasBreakfast: false,
    id: string,
    isPaid: false,
    numGuests: number,
    numNights: number,
    observations: string,
    startDate: Date,
    status: string,
    totalPrice: number,
    updatedAt: Date
}