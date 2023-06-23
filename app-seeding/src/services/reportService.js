import { getBrandFn, getReportFn } from "@/api/report";
import { useQuery } from "@tanstack/react-query";


export const useGetReport = (body) => {
    const { data: dataReport, isLoading: isLoadingReport, isSuccess: isSuccessReport, refetch: refetchReport, isFetching: isFetchingReport } = useQuery({
        queryKey: ['reports'],
        queryFn: () => getReportFn(body),
    })
    return { dataReport, isLoadingReport, isSuccessReport, refetchReport, isFetchingReport }
}

export const useGetBrand = (body) => {
    const { data: dataBrands, isLoading: isLoadingBrand, isSuccess: isSuccessBrand, refetch: refetchBrand, isFetching: isFetchingBrand } = useQuery({
        queryKey: ['brands'],
        queryFn: () => getBrandFn(body),
    })
    return { dataBrands, isLoadingBrand, isSuccessBrand, refetchBrand, isFetchingBrand }
}

