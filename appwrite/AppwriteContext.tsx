import { StyleSheet, Text, View } from 'react-native'

import React, {  FC, PropsWithChildren, createContext, useState } from 'react'

import  Appwrite  from './service'


type AppwriteContextType = {
    appwrite: Appwrite
    isLoggedIn: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const AppwriteContext = createContext<AppwriteContextType>({
    appwrite: new Appwrite(),
    isLoggedIn: false,
    setIsLoggedIn: () => {}
})

const AppwriteProvider : FC<PropsWithChildren> = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const defaultValue = {
        appwrite: new Appwrite(),
        isLoggedIn,
        setIsLoggedIn
    }
  return (
    <View>
        <AppwriteContext.Provider value={defaultValue}>
            {children}
        </AppwriteContext.Provider>
    </View>
  )
}

export default AppwriteProvider

const styles = StyleSheet.create({})