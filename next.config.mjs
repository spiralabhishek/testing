/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI: "mongodb+srv://dev:iAWdJV7QXxPSoK32@pro-card-dev.15ue9hq.mongodb.net/?retryWrites=true&w=majority&appName=pro-card-dev",
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_YW11c2luZy1zY3VscGluLTEuY2xlcmsuYWNjb3VudHMuZGV2JA",
        CLERK_SECRET_KEY: "sk_test_kkwUH600IR0GNK6pBSISfNMGDZmW2UbL19YfYO6I1V",
        CLERK_ENCRYPTION_KEY: "sk_test_kkwUH600IR0GNK6pBSISfNMGDZmW2UbL19YfYO6I1V",
        WEBHOOK_SECRET: "whsec_t75LmE2qZ8tRjmOyZ0uHK9Z+sWK3zZK9",
    }
};

export default nextConfig;
