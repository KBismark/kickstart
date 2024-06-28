import { Dimensions, Platform } from "react-native";

export const {width: ScreenWidth, height: ScreenHeight } = Dimensions.get('screen');
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const serverURL = 'https://somehostserverurl';

export const NonTriggerData = {
    posts: {
        count: 0
    },
    user: {
        current: {
            index: 0,
            username: '',
            image: ''
        },

    },
    singles: {
        title: '',
        image: ''
    },
    category: {
        '': {
            count: 0
        }
    }
}


