import { useQuery } from "@tanstack/react-query";
import { getCompanyFn, getFormFn } from "@/api/form";

export const useGetForm = (body) => {
    const { data: dataForm, isLoading: isLoadingForm, isSuccess: isSuccessForm, refetch: refetchForm, isFetching: isFetchingForm } = useQuery({
        queryKey: ['forms'],
        queryFn: () => getFormFn(body),
    })
    return { dataForm, isLoadingForm, isSuccessForm, refetchForm, isFetchingForm }
}

export const useGetCompany = (token) => {
    const { data: dataCompany, isSuccess: isSuccessCompany } = useQuery({
        queryKey: ['company'],
        queryFn: () => getCompanyFn(token),
    })
    return { dataCompany, isSuccessCompany }
}