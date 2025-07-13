import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      isSubscribed?: boolean
      trialEndsAt?: Date | null
      subscriptionEndsAt?: Date | null
    } & DefaultSession['user']
  }

  interface User {
    id: string
    isSubscribed?: boolean
    trialEndsAt?: Date | null
    subscriptionEndsAt?: Date | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
  }
}
