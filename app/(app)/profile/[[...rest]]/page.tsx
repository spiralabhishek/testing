import { UserProfile } from "@clerk/nextjs";

const page = () => {
    return (
        <div className="flex items-center justify-center">
            <UserProfile routing="hash" />
        </div>
    );
};

export default page;
