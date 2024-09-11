'use client';
import { useClientApi } from '@/utils/clientApi';
import { useSWRConfig } from 'swr';
import { BaseUser } from '@/lib/types/user';

export function useDeleteUser() {
    const clientApi = useClientApi();
    const { mutate } = useSWRConfig();

    const deleteUser = async (userId: string) => {
        await clientApi({
            endpoint: `/users/${userId}`,
            method: 'DELETE',
            requiresAuth: true,
        });

        mutate('users', (users: BaseUser[] = []) =>
            users.filter(user => user._id.toString() !== userId), false);
    };

    return deleteUser;
}
