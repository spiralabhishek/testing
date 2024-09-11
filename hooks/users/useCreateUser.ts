'use client';
import { useClientApi } from '@/utils/clientApi';
import { useSWRConfig } from 'swr';
import { BaseUser, CustomerUser, ProfessionalUser } from '@/lib/types/user';

type UserType = BaseUser | CustomerUser | ProfessionalUser;

export function useCreateUser() {
    const clientApi = useClientApi();
    const { mutate } = useSWRConfig();

    const createUser = async (userData: UserType): Promise<UserType> => {
        const newUser = await clientApi({
            endpoint: '/users',
            method: 'POST',
            data: userData,
            requiresAuth: true,
        }) as UserType;

        mutate('users', async (users: UserType[] = []) => [...users, newUser], false);
        return newUser;
    };

    return createUser;
}
