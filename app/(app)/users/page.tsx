
import { serverApi } from '@/utils/serverApi';
import UserList from './UserList';

export default async function UsersPage() {
    const initialUsers = await serverApi({ endpoint: '/api/users', requiresAuth: true });
    return <UserList initialData={initialUsers} />;
}
