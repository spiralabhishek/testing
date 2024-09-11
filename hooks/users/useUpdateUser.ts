'use client';
import { useClientApi } from '@/utils/clientApi';
import { useSWRConfig } from 'swr';
import { BaseUser } from '@/lib/types/user';

export function useUpdateUser() {
    const clientApi = useClientApi();
    const { mutate } = useSWRConfig();

    const updateUser = async (userId: string, updatedData: Partial<BaseUser>): Promise<BaseUser> => {
        const updatedUser = await clientApi({
            endpoint: `/users/${userId}`,
            method: 'PUT',
            data: updatedData,
            requiresAuth: true,
        }) as BaseUser;

        mutate('users', (users: BaseUser[] = []) =>
            users.map(user => (user._id.toString() === userId ? updatedUser : user)), false);

        return updatedUser;
    };

    return updateUser;
}
