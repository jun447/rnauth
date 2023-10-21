import { 
   ID,Account,Client
} from 'appwrite';
import {Alert} from 'react-native';

const client = new Client();


// client
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('6532b113174986c76ed9') // Your project ID
// ;
const AppWrite_Endpoint:string  = 'https://cloud.appwrite.io/v1';
const AppWrite_ProjectID:string  = '6532b113174986c76ed9';



type CreateUser = {
    name: string,
    email: string,
    password: string
}
type LoginUser = {
    email: string,
    password: string
}

class AppwriteService{
    account;
    
    constructor(){
        client
        .setEndpoint(AppWrite_Endpoint) // Your API Endpoint
        .setProject(AppWrite_ProjectID) // Your project ID
        ;
        this.account = new Account(client);
    }


     
    async createUser(user: CreateUser){
        try {
            const response_userAccount = await this.account.create(ID.unique(),user.email, user.password, user.name);
            // return response_userAccount;
            if (response_userAccount){
                // login that user
                return await this.loginUser(user);
            }else{
                return response_userAccount;
            }
        } catch (error) {
            console.log(error);
            return Alert.alert('Error', String(error),[
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        }
    }
    async loginUser(user: LoginUser){
        try {
            
            const response_loginUser = await this.account.createEmailSession(user.email, user.password);
            return response_loginUser;
        
        } catch (error) {
            console.log(error);
            return Alert.alert('Error', String(error),[
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        }
    }

    // get user details
    async getUserDetails(){
        try {
            const response_userDetails = await this.account.get();
            return response_userDetails;
        } catch (error) {
            console.log(error);
            return Alert.alert('Error', String(error),[
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        }
    }
    // logout user
    async logoutUser(){
        try {
            const response_logoutUser = await this.account.deleteSession('current');
            return response_logoutUser;
        } catch (error) {
            console.log(error);
            return Alert.alert('Error', String(error),[
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        }
    }
}

export default AppwriteService