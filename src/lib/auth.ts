import NextAuth, { NextAuthConfig } from "next-auth";
import { DefaultSession, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { fetchByEmail } from "@/query/users/data";
import Google from "next-auth/providers/google"
import { Company } from "@/query/companies/definitions";
import { sql } from '@vercel/postgres';


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        // Validação com Zod
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("Credenciais inválidas");
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const user = await fetchByEmail(email);
        //console.log("Usuário encontrado:", user);
        if (!user) {
          //console.log("Usuário não encontrado.");
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user?.password);
        if (!passwordsMatch) {
          //console.log("Senha incorreta.");
          return null;
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }) as any,
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 2 // Atualiza o token a cada 1 hora
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7 // Expiração do token JWT
  },
  callbacks: {
    async jwt({ token, user }) {
      //console.log("Dados do usuário no JWT antes:", token); // Debug
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          role: (user as User).role
        } as JWT;
      }
      //console.log("Token final com role:", token); // Debug
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async signIn({ user, account }) {

      if (account?.provider === "google") {

        const existingUser = await fetchByEmail(user.email!)

        if (!existingUser) {
          const nameCompany = "New Company"
          const result = await sql<Company>`
            INSERT INTO public.companies (name)
            VALUES (${nameCompany})
            RETURNING id
          `;

          const idcompany = result.rows[0].id;

          await sql`
            INSERT INTO public.users ( name, email, role, idcompany, avatarurl )
            VALUES (${user.name}, ${user.email}, 'admin', ${idcompany}, ${user.image})
          `;

        }

      }

      return true
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);