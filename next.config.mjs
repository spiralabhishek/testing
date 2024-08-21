/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI: "mongodb+srv://abhishekspiral:tZhQAJr1IMprR64V@pro-card.7ii4e.mongodb.net/?retryWrites=true&w=majority&appName=pro-card",
        // MONGODB_URI: "mongodb+srv://dev:iawdjv7qxxpsok32@pro-card-dev.15ue9hq.mongodb.net/?retryWrites=true&w=majority&appName=pro-card-dev",
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_YW11c2luZy1zY3VscGluLTEuY2xlcmsuYWNjb3VudHMuZGV2JA",
        CLERK_SECRET_KEY: "sk_test_kkwUH600IR0GNK6pBSISfNMGDZmW2UbL19YfYO6I1V",
        CLERK_ENCRYPTION_KEY: "sk_test_kkwUH600IR0GNK6pBSISfNMGDZmW2UbL19YfYO6I1V",
        WEBHOOK_SECRET: "whsec_t75LmE2qZ8tRjmOyZ0uHK9Z+sWK3zZK9",
        // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_c21hcnQtcm9kZW50LTUzLmNsZXJrLmFjY291bnRzLmRldiQ",
        // CLERK_SECRET_KEY: "sk_test_yfUsFosxREu9n2r7n5gYCvn3WZq8aWo5VNhR7mJwS0",
    }
};

export default nextConfig;
