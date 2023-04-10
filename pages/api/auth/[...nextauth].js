import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      async authorize(credentials) {
        try {
          const result = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
            {
              accountName: credentials.accountName,
              password: credentials.password,
            }
          );
          if (result) return result.data;
          else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      try {
        if (account.provider != "credentials") {
          const result = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/${account.provider}`,
            {
              userId: user.id,
              fullname: user.name,
              email: user.email,
              picture: user.image,
            }
          );
          token.accessToken = result.data.token;
          token.user = result.data.newUser || result.data.userUpdated;
          token.expAccessToken = result.data.expired_at;
        } else {
          // credentials
          token.accessToken = user.tokens.accessToken;
          token.user = user.user;
          token.expAccessToken = user.expired_at;
        }
        return token;
      } catch (error) {
        return token;
      }
    },
    async session({ session, token }) {
      if (token.isError) {
        console.log("session error: ", token);
        return null;
      }
      session.accessToken = token.accessToken;
      session.user = token.user;
      session.expires = new Date(token.expAccessToken).toISOString();
      return session;
    },
  },
};
export default NextAuth(authOptions);
