import { ContextId, createComponent, useStateStore } from "statestorejs";
import * as Animatable from 'react-native-animatable';
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "@/constants/Theme";
import { User } from "@/stores/types";
import { SCREEN_WIDTH } from "@/constants/Screen";
import { ProfileHeadSizeWithMargin, StatusHead } from "./status";
import { memo } from "react";


const widthWithNoHead = SCREEN_WIDTH-ProfileHeadSizeWithMargin
export const Row = memo(({propsSource}: {propsSource:string|ContextId})=>{
    const {white, divider, primary} = useTheme().colors;
    const {name, contact, last, profileImage, id} = useStateStore<User>('users', propsSource as string)||{}

    return (
        <Pressable style={[styles.displayRow, styles.row, {backgroundColor: white, borderTopColor: divider,}]}>
            <StatusHead propsSource={propsSource} size={60} />
            <View style={{width: widthWithNoHead, paddingRight: 10}}>
                <View style={styles.displayRow}>
                    <Text style={{fontWeight: '700', fontSize: 16}}>{name||contact||'Unknown'}</Text>
                    <Text style={{fontSize: 13}}>{last.date||'05/24'}</Text>
                </View>
                <View style={styles.displayRow}>
                    <Text style={{}}>
                        {last.messagePreview?.slice(0,32)||'Some message here'}
                        {last.messagePreview?.length>32?'...': ''}
                    </Text>
                    <View>
                        <Text>Y</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
})




const styles = StyleSheet.create({
    round: {
        borderRadius: 9999,
        width: 60, height: 60,
        marginHorizontal: 15
    },
    displayRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row:{
        borderTopWidth: 1,
        paddingVertical: 8,
        // paddingLeft: 7,
        // paddingRight: 15,
    }
})


