import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { useThemeColors } from '@/constants/Colors';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Contacts from 'expo-contacts';
import { AppThemeProvider, useTheme } from '../constants/Theme';
import { User, type AccountUser } from "@/stores/types";
import {configureForReact, createStore, deleteStore, updateStore} from 'statestorejs'
import { FakeUser } from '@/stores';
configureForReact(React);


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  // After real user info is available
  // Fake user is used for now
  return <RootLayoutNav />;
}

const getPrimaryPhone = (phoneData: any,index: number)=>phoneData.isPrimary
function RootLayoutNav() {
  const [ready, setReady] = useState(false);
  createStore<AccountUser>('account', 'main', {id: FakeUser.id, settings: FakeUser.settings, contactList: []} );
  createStore('ui', 'latestStories',{scroll: 0, activate: false})
  
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName, Contacts.Fields.ID, Contacts.Fields.PhoneNumbers, Contacts.Fields.PhoneticFirstName],
        });

        const userIds: string[] = [];

        if (data.length > 0) {
          // const contact = data[0];
          data.forEach((contact, index)=>{
            if(!contact.phoneNumbers||contact.phoneNumbers.length<1) return;
            let primary = contact.phoneNumbers.find(getPrimaryPhone);
            if(!primary){
              primary = contact.phoneNumbers[0];
            }
            const id = `${primary.countryCode}-${primary.digits}`;
            createStore<User>('users', id, {contact: primary.number, id: id, name: contact.name, last: {failed: false, date: '05/12', messagePreview: 'Some message here'} });
            userIds.push(id);
          })
          // console.log(data.slice(0, 6));
          console.log(data[0]);
          
        }
        updateStore<AccountUser>('account', 'main', {actors: ['contactList'], store: {contactList: userIds}});
        setReady(true);
      }
    })();

    // return ()=>deleteStore('account', 'main');

  }, []);
  
  
  if(!ready) return null;
  return (
    <SafeAreaProvider>
          <AppThemeProvider >
            <StatusBar style='light' />
            <App />
          </AppThemeProvider>
    </SafeAreaProvider>
  );
}



const App = ()=>{
  const {background, white} = useTheme().colors
  return (
    <View style={{backgroundColor: background,flex: 1}}>
      <Stack>
        {/* <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="category/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="user/[id]" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="singles/[id]" options={{ headerShown: false, animation: 'fade' }} /> */}
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  )
}