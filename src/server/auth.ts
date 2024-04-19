import {
    getServerSession, type NextAuthOptions,
} from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {userService} from "./services/userService";

export const authOptions : NextAuthOptions = {
    session: {
        strategy: "jwt", //the default strategy is jwt when no adapter is defined, we redefined it here to make it obvious what strategy to use
    },
    callbacks:{
        async jwt({token, account, profile}) {
            //this is where you want to store the userid in the user object. the id is coming from the authorize callback and is available in the account parameter when the type is "credentials". this is where you can also add additional information from the database or external api call to the token, like user preferences, access levels, etc.
            // console.log("----------------------------JWT--------------------")
            // console.log({token}, {account}, {profile});
            if(account && account.type === 'credentials') {
                token.userId = account.providerAccountId;
                //this id is coming from the authorize() callback
            }
            return token
        },
        async session({session,token}) {
            //after the token is created in the jwt callback, we need to pass the userID to the user.id so it will be available to the ui
            //because the User type only consists of name, email ...etc we will create a type definition to add id in the user object later
            session.user.id = token.userId
                        console.log("---------------Session--------------------")
            console.log({session},{token});
            return session;
        }
    },
    pages:{
        signIn: "/login", //custom sign in path
        /*
        signOut: "/path",
        error: "/error",
        verifyRequest: "/requestVerification",
        newUser: "/newUser"
        */
    },
    providers:[
        Credentials({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type:"text", placeholder: "username"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                const {username, password} = credentials as {
                    username: string,
                    password: string
                }
                console.log(userService.authenticate(username, password))
                return userService.authenticate(username, password)
            },
        })
    ]
}

export const getServerAuthSession = () => {
    getServerSession(authOptions);
}