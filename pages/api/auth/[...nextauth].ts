import { randomBytes, randomUUID } from "crypto";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "PS Demo App",
      credentials: {
        username: {
          label: "email",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "Password not required for demo",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        async function goAsync() {
          let userObject: any = null;

          userObject = {
            user: credentials?.username,
          };

          const attendee = await prisma.attendee.findUnique({
            where: {
              email: credentials?.username,
            },
            select: {
              email: true,
              id: true,
            },
          });
          if (attendee) {
            userObject.user = {
              email: attendee.email ?? "",
              id: attendee.id,
            };
            return userObject;
          } else {
            return null;
          }
        }
        return await goAsync();
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },

  callbacks: {
    jwt: async function ({ token, user }) {
      user && (token.email = user.email);
      return { ...token, ...user };
    },
    session: async function ({ session, token }) {
      return { ...session, ...token };
    },
  },
};

export default NextAuth(authOptions);
