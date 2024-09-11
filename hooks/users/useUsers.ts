'use client';
import { useClientApi } from '@/utils/clientApi';
import useSWR from 'swr';
import { BaseUser } from '@/lib/types/user';

export function useUsers() {
    const clientApi = useClientApi();

    const fetchUsers = async () => {
        const response = await clientApi({
            endpoint: '/api/users',
            requiresAuth: true
        });

        return response as BaseUser[];
    };

    return useSWR<BaseUser[]>('users', fetchUsers);
}
