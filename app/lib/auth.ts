import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth/jwt" {
    interface JWT {
        idToken?: string;
        accessToken?: string;
        guest?: {
            _id: string;
            fullName: string;
            email: string;
            nationalID: string;
            nationality: string;
            countryFlag: string;
        };
    }
}

declare module "next-auth" {
    interface Session {
        idToken?: string;
        accessToken?: string;
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
        guest?: {
            _id: string;
            fullName: string;
            email: string;
            nationalID: string;
            nationality: string;
            countryFlag: string;
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async jwt({ token, account, user }) {
            console.log("JWT callback triggered, hasAccount:", !!account, "hasUser:", !!user);
            if (account) {
                token.idToken = account.id_token;

                try {
                    const res = await fetch(
                        "https://the-wild-oasis-api.vercel.app/api/auth/guest/google",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                idToken: account.id_token,
                                email: user?.email,
                                fullName: user?.name,
                            }),
                        }
                    );

                    const data = await res.json();
                    console.log(data, 'datadata')
                    if (res.ok) {
                        // Tách phẳng dữ liệu
                        token.accessToken = data.access_token;
                        token.guest = data.guest;
                    }
                } catch (err) {
                    console.error(err);
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (session && token) {
                session.idToken = token.idToken;
                session.accessToken = token.accessToken;
                session.guest = token.guest;
            }
            return session;
        },
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
};

export const GetServerSession = () => getServerSession(authOptions);
