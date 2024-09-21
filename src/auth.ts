// library imports
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// types imports
import type { NextAuthConfig, Session } from 'next-auth';
import { CredentialsType } from '@/types/login';
import { JWT } from 'next-auth/jwt';
import { UserType } from './types/user';

declare module 'next-auth' {
  interface User extends UserType {
    accessToken?: string;
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessTokenExpires?: number;
  }
}

const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      authorize: async (credentials) => {
        try {
          const user = await fetchUser(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email:
                typeof credentials.email === 'string' ? credentials.email : '',
              password:
                typeof credentials.password === 'string'
                  ? credentials.password
                  : '',
            },
          );
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Añadir propiedades del usuario al token después de iniciar sesión
      if (user) {
        token.id = user.user?.id as string;
        token.name = `${user.user?.firstName} ${user.user?.lastName}`;
        token.email = user.user?.email;
        token.accessToken = user.accessToken;
      }

      // Manejo de la expiración del token
      if (account && user) {
        token.accessTokenExpires = Date.now() + 12 * 60 * 60 * 1000; // Establecer la expiración a 12 horas
      }

      // Verificar si el token está por expirar y, en caso necesario, renovarlo
      if (Date.now() > (token.accessTokenExpires ?? 0)) {
        // Aquí deberías añadir la lógica para renovar el token y asignar el nuevo token y tiempo de expiración
        // Por ejemplo: token.accessToken = await refreshAccessToken(token.accessToken);
        token.accessTokenExpires = Date.now() + 12 * 60 * 60 * 1000;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Asegura que token tiene los campos esperados y no son undefined
      if (token) {
        session.user = {
          id: token.sub || '', // Asegurarse de que 'sub' no sea undefined
          firstName: token.name || '', // Divide el nombre para obtener el primer nombre
          lastName: token.name || '', // Intenta obtener el apellido si existe
          email: token.email || '',
          role: token.role as string, // Asegura que el tipo es 'string'
          accessToken: token.accessToken as string, // Asegura que el tipo es 'string'
        };
      }

      // Retorna la sesión modificada
      return session;
    },
  },
  pages: {
    signIn: '/auth/login', // Custom sign-in page
    error: '/auth/error', // Custom error page
  },
  session: {
    strategy: 'jwt',
    maxAge: 12 * 60 * 60, // 12 horas en segundos
  },
} satisfies NextAuthConfig;

// Function to authenticate and fetch user details
async function fetchUser(url: string, body: CredentialsType) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const user = await res.json();

    if (res.ok && user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
