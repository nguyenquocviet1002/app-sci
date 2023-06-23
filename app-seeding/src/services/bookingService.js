import { useQuery } from "@tanstack/react-query";
import { getBookingFn } from "@/api/booking";

export const useGetBooking = (body) => {
    const { data: dataBooking, isLoading: isLoadingBooking, isFetching: isFetchingBooking, isSuccess: isSuccessBooking, refetch: refetchBooking } = useQuery({
        queryKey: ['booking'],
        queryFn: () => getBookingFn(body),
    })
    return { dataBooking, isLoadingBooking, isFetchingBooking, isSuccessBooking, refetchBooking }
}