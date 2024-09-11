# Pro Card Web App

## Project Documentation

### Specification Documents
- [System Architecture](https://view.monday.com/1572563598-a09b46913154faa6c02e345e12fd5e28?r=euc1)
- [Global Protocols](https://view.monday.com/1582936037-6c16d948a4b35e0de5d9fa44d5d95907?r=euc1)
- [Backend Protocols](https://view.monday.com/1582947573-2a343540c8b5d3c0e5ef08ab0c8fa44e?r=euc1)
- [Frontend Protocols](https://view.monday.com/1582947455-d29266b0363bc0bef873c03428f2e1c2?r=euc1)
- [Multi-Language Implementation](https://view.monday.com/1581506285-e682328d3303beb9d671a8427e65df4f?r=euc1)
- [Authentication Implementation Documentation](https://view.monday.com/1581396694-7903b8abf6cc09cfe919c84b5f1c8cf9?r=euc1)
- [CI / CD Protocols](https://view.monday.com/1581501048-16f0c1901416ff303c66a984da87b03f?r=euc1)
- [Entity Relations](https://view.monday.com/1575297492-3f0f0aa1b691f9add9dfe3f0f40e5cfd?r=euc1)
- [DB Models](https://view.monday.com/1575216158-1d5353e2af0686437903475d88fa2ff2?r=euc1)
- [Statistics Tracking System](https://view.monday.com/1574949761-7e13beb2a1ebc964292c181fb210f361?r=euc1)
- [Image and Video Handling Specification](https://view.monday.com/1579365980-e7b0bab42bf60cf4fc9390938a890e3c?r=euc1)

### Types, Interfaces, and Enums
- [Type Definitions](https://view.monday.com/1585788819-59d4c5040216d0d6b99782a093bf7afa?r=euc1)

## Zustand Store Implementation

### Overview
The Pro Card Web App uses Zustand for state management, providing a lightweight and flexible solution that works seamlessly with Next.js 14, TypeScript, and supports both client-side and server-side rendering. Our implementation is specifically designed to be compatible with Next.js 14 server components.

### Store Structure
The Zustand store implementation is split into two main files:

1. `src/store/zustandStore.tsx`: Contains the client-side store logic.
2. `src/store/serverInitializeStore.tsx`: Handles server-side store initialization.

Key components:

1. `AppState`: Defines the shape of the application state.
2. `AppActions`: Defines the actions that can modify the state.
3. `createAppStore`: A function that creates the Zustand store with initial state and actions.
4. `AppStoreProvider`: A React component that provides the store to the application.
5. `useAppStore`: A custom hook for accessing the store in client components.
6. `initializeStore`: A server-side function for initializing the store.

### Usage

#### Client Components
To use the Zustand store in client components:

1. Wrap your app with the `AppStoreProvider`:

```tsx
import { AppStoreProvider } from '../src/store/zustandStore';

function MyApp({ Component, pageProps }) {
  return (
    <AppStoreProvider initialState={pageProps.initialState}>
      <Component {...pageProps} />
    </AppStoreProvider>
  );
}
```

2. Use the `useAppStore` hook in your components:

```tsx
import { useAppStore } from '../src/store/zustandStore';
import { useUser } from '@clerk/nextjs';

function UserProfile() {
  const { user: clerkUser } = useUser();
  const user = useAppStore((state) => state.user);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const syncWithClerk = useAppStore((state) => state.syncWithClerk);

  React.useEffect(() => {
    if (clerkUser) {
      syncWithClerk(clerkUser);
    }
  }, [clerkUser, syncWithClerk]);

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>User Type: {user.type}</p>
    </div>
  );
}
```

#### Server Components
For server components or server-side rendering, use the `initializeStore` function:

```tsx
import { initializeStore } from '../src/store/serverInitializeStore';
import { auth } from '@clerk/nextjs';

export async function getServerSideProps(context) {
  const { userId } = auth();
  const { initialState, store } = await initializeStore();

  if (userId) {
    // Fetch user data from your database using the Clerk userId
    const userData = await fetchUserFromDatabase(userId);

    // Update the store with the fetched user data
    store.getState().setUser(userData);
    store.getState().setIsAuthenticated(true);
  }

  return {
    props: {
      initialState: store.getState(),
    },
  };
}
```

Then, pass the `initialState` to the `AppStoreProvider` in your client-side code as shown in the client components example.

### Integration with Clerk Authentication

The Zustand store is designed to work seamlessly with Clerk authentication. Here's how to integrate them:

1. In client components, use the `useUser` hook from Clerk alongside the Zustand store:

```tsx
import { useUser } from '@clerk/nextjs';
import { useAppStore } from '../src/store/zustandStore';

function AuthenticatedComponent() {
  const { user: clerkUser, isLoaded } = useUser();
  const syncWithClerk = useAppStore((state) => state.syncWithClerk);
  const user = useAppStore((state) => state.user);

  React.useEffect(() => {
    if (isLoaded && clerkUser) {
      syncWithClerk(clerkUser);
    }
  }, [isLoaded, clerkUser, syncWithClerk]);

  if (!isLoaded || !user) {
    return <div>Loading...</div>;
  }

  return <div>Welcome, {user.name}!</div>;
}
```

2. In server components or API routes, use Clerk's `auth()` function to get the user ID, then fetch the user data from your database and update the store:

```tsx
import { auth } from '@clerk/nextjs';
import { initializeStore } from '../src/store/serverInitializeStore';

export async function getServerSideProps(context) {
  const { userId } = auth();
  const { initialState, store } = await initializeStore();

  if (userId) {
    const userData = await fetchUserFromDatabase(userId);
    store.getState().setUser(userData);
    store.getState().setIsAuthenticated(true);
  }

  return {
    props: {
      initialState: store.getState(),
    },
  };
}
```

### Use Cases

1. User Authentication Flow:
   - On login, use Clerk's `useUser` hook to get the user data.
   - Call `syncWithClerk` to update the Zustand store with the user information.
   - Use the store's `isAuthenticated` state to conditionally render components.

2. User Profile Management:
   - Fetch user profile data on the server and initialize the store.
   - Use the store to display and update user profile information.
   - Sync changes back to the server and Clerk when the user updates their profile.

3. Role-based Access Control:
   - Store the user's role or permissions in the Zustand store.
   - Use the stored role to conditionally render components or enable/disable features.

4. Real-time User State:
   - Update the store in real-time using WebSockets or Server-Sent Events.
   - Reflect changes immediately in the UI without full page reloads.

### Server Component Compatibility
Our Zustand store implementation is designed to work seamlessly with Next.js 14 server components:

1. Server-side initialization: The `initializeStore` function in `serverInitializeStore.tsx` allows for server-side state initialization without conflicting with client-side state.

2. Hydration: The `AppStoreProvider` accepts an `initialState` prop, allowing for smooth hydration of server-initialized state on the client side.

3. Type safety: The store is fully typed, ensuring consistency between server and client usage.

4. Separation of concerns: Client-specific logic (like the `useAppStore` hook) is isolated in the client-side file, preventing server-side errors.

### Benefits
- Lightweight and performant state management
- Full TypeScript support
- Seamless integration with Next.js 14, App Router, and Clerk authentication
- Support for both client and server-side state management
- Simplified API compared to other state management solutions
- Enhanced SEO capabilities through server-side rendering of state-dependent components
- Centralized user state management across the application

By leveraging this Zustand implementation in the Pro Card Web App, we achieve a flexible and efficient state management solution that integrates well with our tech stack, supports our application's needs for both client and server-side rendering, and maintains compatibility with Next.js 14 server components and Clerk authentication.
