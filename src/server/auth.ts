import {
    getServerSession, type NextAuthOptions,
} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { userService } from './services/userService'

export const authOptions: NextAuthOptions = {
    session:{
        strategy: 'jwt',//The default strategy is JWT when no adapter is defined, we redifined it here to make it obvious what strategy to use
    },
    callbacks:{
        async jwt({token, account, profile}){
            //This is where you want to store the userID in the User object . The id is coming from the authorize callback and is available in the account parameter when the type is 'credentials'. This is where you can also add additional information from database or external API to the token like user preferences access levels...etc
            console.log("-------------------JWT--------------------")
            
            console.log({token}, {account}, {profile})
            if(account && account.type === 'credentials'){
                token.userId = account.providerAccountId;
                //This Id that is coming form authorize() callback
            }
            console.log({token}, {account}, {profile})
            return token
        },
        async session({session,token}){
            //After the token is created in JWT call back we need to apps the userID to tue user.id so it will be available to the UI
            //Because the User type only consists of name, email ..etc  we will create a type definition to add id in the User object later
            console.log("---------------Session---------------")
            session.user.id = token.userId
            console.log({session},{token})
            return session
        },
    },
    pages:{
        signIn: '/login', //custom sign in path
        /*
        signOut: '/path',
        error: '/error',
        verifyRequest: '/requestVerification'
        newUser: '/newUser'
        */
    },
    providers: [
        Credentials({
          name: "Credentials",
          credentials: {
            username: { label: "Username", type: "text", placeholder: "username" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
             const { username, password } = credentials as {
              username: string,
              password: string
             };
    
            return userService.authenticate(username, password); 
            // Here we authenticate the username and password using the  userService that we created earlier
          }
        })
      ],
    
}

export const getServerAuthSession = () => getServerSession(authOptions)