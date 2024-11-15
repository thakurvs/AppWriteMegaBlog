import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // call another method
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        }
        catch(error){
            throw error;
            // console.log(error)
        }
    }

    // After you've created your account, users can be logged in using the Create Email Session route, this will retutn an session
    async login({email, password}){
        try{
        //    return await this.account.createEmailSession(email, password);  //old method
           return await this.account.createEmailPasswordSession(email, password);    //new method to login user
        }
        catch (error){
            throw error;
        }
    }

    // Get the currently logged in user.
    async getCurrentUser(){
        try {
            // return await this.account.get().then((res)=>console.log(res));
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    // Delete all sessions from the user account and remove any sessions cookies from the end client.
    async logout(){
        try {
            const result = await this.account.deleteSessions();
            return result;
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error)
        }
    }
}

const authService = new AuthService();

export default authService