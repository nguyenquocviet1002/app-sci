import { useQuery } from "@tanstack/react-query";
import { createUserFn, getAllUserFn, getUserFn, updateActiveUserFn, updatePasswordUserFn } from "@/api/userApi";

export function useGetUser(token) {
    const { data: dataUser, isLoading: isLoadingUser, isSuccess: isSuccessUser, refetch: refetchUser } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUserFn(token),
    });
    return { dataUser, isLoadingUser, isSuccessUser, refetchUser }
}

export function useGetAllUser(body) {
    const { data: dataAllUser, isLoading: isLoadingAllUser, isSuccess: isSuccessAllUser, isFetching: isFetchingAllUser, refetch: refetchAllUser } = useQuery({
        queryKey: ['userAll'],
        queryFn: () => getAllUserFn(body),
    });
    return { dataAllUser, isLoadingAllUser, isSuccessAllUser, isFetchingAllUser, refetchAllUser }
}

export function useGetAllUserCode(body) {
    const { data: dataAllUserCode, isSuccess: isSuccessAllUserCode } = useQuery({
        queryKey: ['userAll', body.code_user],
        queryFn: () => getAllUserFn(body),
    });
    return { dataAllUserCode, isSuccessAllUserCode }
}

export function useCreateUser(body) {
    const { data: dataCreateUser, isLoading: isLoadingCreateUser, isSuccess: isSuccessCreateUser, refetch: refetchCreateUser } = useQuery({
        queryKey: ['userCreate'],
        queryFn: () => createUserFn(body),
        enabled: false,
    });
    return { dataCreateUser, isLoadingCreateUser, isSuccessCreateUser, refetchCreateUser }
}

export function useUpdateActiveUser(body) {
    const { data: dataUpdateActiveUser, isLoading: isLoadingUpdateActiveUser, isSuccess: isSuccessUpdateActiveUser, refetch: refetchUpdateActiveUser } = useQuery({
        queryKey: ['userUpdateActive'],
        queryFn: () => updateActiveUserFn(body),
        enabled: false,
    });
    return { dataUpdateActiveUser, isLoadingUpdateActiveUser, isSuccessUpdateActiveUser, refetchUpdateActiveUser }
}

export function useUpdatePasswordUser(body) {
    const { data: dataUpdatePasswordUser, isLoading: isLoadingUpdatePasswordUser, isSuccess: isSuccessUpdatePasswordUser, refetch: refetchUpdatePasswordUser } = useQuery({
        queryKey: ['userUpdatePassword'],
        queryFn: () => updatePasswordUserFn(body),
        enabled: false,
    });
    return { dataUpdatePasswordUser, isLoadingUpdatePasswordUser, isSuccessUpdatePasswordUser, refetchUpdatePasswordUser }
}