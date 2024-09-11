
'use client'
import { useUsers } from "@/hooks/users/useUsers";

export default function UserList({ initialData }: any) {
    const { data, error, isLoading } = useUsers();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-black" >Error: {error.message}</div>;

    return (
        <ul>
            {initialData?.data?.users && initialData?.data?.users.map((user: any) => <li className="text-black" key={user._id}>{user.name}</li>)}
        </ul>
    );
}
