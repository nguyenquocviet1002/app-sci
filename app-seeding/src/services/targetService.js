import { useQuery } from "@tanstack/react-query";
import { getTargetFn, updateTargetFn } from "@/api/targetApi";

export function useGetTarget(body) {
    const { data: dataTarget, isLoading: isLoadingTarget, isSuccess: isSuccessTarget, refetch: refetchTarget } = useQuery({
        queryKey: ['target'],
        queryFn: () => getTargetFn(body),
        enabled: false
    });
    return { dataTarget, isLoadingTarget, isSuccessTarget, refetchTarget }
}

export function useUpdateTarget(body) {
    const { data: dataUpdateTarget, isLoading: isLoadingUpdateTarget, isSuccess: isSuccessUpdateTarget, refetch: refetchUpdateTarget } = useQuery({
        queryKey: ['updateTarget'],
        queryFn: () => updateTargetFn(body),
        enabled: false
    });
    return { dataUpdateTarget, isLoadingUpdateTarget, isSuccessUpdateTarget, refetchUpdateTarget }
}