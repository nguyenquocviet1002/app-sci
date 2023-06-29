import { getBrandFn, getCheckDataFn, getReportFn } from "@/api/report";
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

export const useGetCheckData = (body) => {
    const { data: dataCheck, isLoading: isLoadingCheck, isSuccess: isSuccessCheck, refetch: refetchCheck, isFetching: isFetchingCheck } = useQuery({
        queryKey: ['check-data'],
        queryFn: () => getCheckDataFn(body),
    })
    return { dataCheck, isLoadingCheck, isSuccessCheck, refetchCheck, isFetchingCheck }
}

