import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { cert } from "firebase-admin/app";
// import { FirestoreAdapter } from "@auth/firebase-adapter";
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({
  providers: [
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: "Credentials",
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     // Add logic here to look up the user from the credentials supplied
    //     const res = await fetch("http://localhost:3000/api/signin", {
    //       method: "POST",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         username: credentials?.username,
    //         password: credentials?.password,
    //       }),
    //     });

    //     const user = await res.json();

    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user;
    //     } else {
    //       // If you return null or false then the credentials will be rejected
    //       return null;
    //       // You can also Reject this callback with an Error or with a URL:
    //       // throw new Error('error message') // Redirect to error page
    //       // throw '/path/to/redirect'        // Redirect to a URL
    //     }
    //   },
    // }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  // adapter: FirestoreAdapter({
  //   credential: cert({
  //     projectId: process.env.FIREBASE_PROJECT_ID,
  //     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  //     privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  //   }),
  // }) as Adapter,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
