export type BookingRequest = {
    cabinId: string | number,
    startDate: Date,
    endDate: Date,
    numGuests: number,
    observations: string
}