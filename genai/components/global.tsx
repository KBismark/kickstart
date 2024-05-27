/**
 * Defining global components
 */

import { useTheme } from "@/constants/Theme"
import { useMemo } from "react"
import { Dimensions, Text as NativeText, StyleProp, TextStyle, ViewStyle, type TextProps } from "react-native"



type HeadVariations = {
    type: keyof typeof Sizes.head
}
type TextVariations = {
    type: keyof typeof Sizes.text
}
const Sizes = {
   head:{
    h1: 28,
    h2: 24,
    h3: 20,
    h4: 16,
    h5: 15,
    h6: 14
   },
    text: {
        large: 16,
        normal: 15,
        medium: 14,
        small: 13,
        xsmall: 12
    }
}

export const Heading = ({children,type,...props}:TextProps&HeadVariations)=>{
    const {text} = useTheme().colors;

    const styles = useMemo(()=>{
        return [{color: text},props.style,{fontSize:Sizes.head[type],fontWeight:'bold'}]
    },[type,props.style]);

    return (
        <NativeText {...props} style={styles as any}>
            {children}
        </NativeText>
    )
}

export const Text = ({children,type,...props}:TextProps&TextVariations)=>{
    const {text} = useTheme().colors;

    const styles = useDynamicMemoStyles(()=>{
        return {
            text: [{color: text},props.style,{fontSize:Sizes.text[type]}]
        }
    },[type,props.style])

    return (
        <NativeText {...props} style={styles.text}>
            {children}
        </NativeText>
    )
}

type DStyles = {[k:string]:StyleProp<ViewStyle>|StyleProp<TextStyle>|StyleProp<ViewStyle>[]|StyleProp<TextStyle>[]}
export function useDynamicMemoStyles<R extends DStyles>(f:()=>R,deps:React.DependencyList):R{
    return useMemo(f,deps)
}

export const {width: ScreenWidth, height: ScreenHeight } = Dimensions.get('screen');

export const getScreenPercentageNumber = (percent:number)=>(percent/100)*ScreenWidth;

