import { Dimensions } from "react-native";

export const {width: ScreenWidth, height: ScreenHeight } = Dimensions.get('screen');

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


