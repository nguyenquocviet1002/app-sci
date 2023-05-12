import { useQuery } from "@tanstack/react-query";
import { getCompanyFn, getLeadFn, getUserFn } from "@/utils/api";


export const useGetUser = (token) => {
    const { data: dataUser, isSuccess: isSuccessUser } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUserFn(token),
        staleTime: Infinity,
        cacheTime: Infinity
    })

    return { dataUser, isSuccessUser }
}

export const useGetLeads = (info) => {
    const { data: dataLead, isLoading: isLoadingLead, isSuccess: isSuccessLead, refetch: refetchLead } = useQuery({
        queryKey: ['leads'],
        queryFn: () => getLeadFn(info),
        staleTime: Infinity
    })

    return { dataLead, isLoadingLead, isSuccessLead, refetchLead }
}

export const useGetCompany = (token) => {
    const { data: dataCompany, isSuccess: isSuccessCompany } = useQuery({
        queryKey: ['company'],
        queryFn: () => getCompanyFn(token),
        staleTime: Infinity,
        cacheTime: Infinity,
    })

    return { dataCompany, isSuccessCompany }
}