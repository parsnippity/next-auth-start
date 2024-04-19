export const userService = {
    authenticate,
}

function authenticate(username:string, password:string) {
    if(username !== "admin" && password !== "admin") {
        //For simplicity's sake, we just hard code the username and password
        //later, you have to change this to match your specific needs [either a database lookup or from an external API]
        return null;
        //If the user does not authenticate, we return null. We will also allow the ui to show the error and to make the user check the details without giving them a hint
    }
    const user = {
        id: "794",
        name: "Bree",
        email: "admin@example.com"
        //Pretend the user is authenticated we create the user object and fill it with the details of the user
    }
    return user;
}