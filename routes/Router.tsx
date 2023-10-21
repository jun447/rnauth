import { View, Text } from 'react-native'
import React , {useState,useContext,useEffect} from 'react'

import {NavigationContainer} from '@react-navigation/native'
import {AppwriteContext} from '../appwrite/AppwriteContext'

import AuthStack from './AuthStack'
import AppStack from './AppStack'
import Loading from '../components/Loading'

const Router = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { appwrite,isLoggedIn,setIsLoggedIn } = useContext(AppwriteContext)
    
    useEffect(() => {
        appwrite.getUserDetails().then((res) => {
            setIsLoading(false)
            if (res) {
                setIsLoggedIn(true)

            }
        }).catch((err) => {
           setIsLoading(false)
           setIsLoggedIn(false)
        })
    }, [appwrite, setIsLoggedIn]);
   
    if (isLoading) {
        return <Loading />
    }
    // if (!isLoggedIn) {
    //     return (
    //         <NavigationContainer>
    //             <AuthStack />
    //         </NavigationContainer>
    //     )
    // }
    
return (
        <NavigationContainer>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
)
}

export default Router