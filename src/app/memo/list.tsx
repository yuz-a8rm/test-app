import { View, StyleSheet, FlatList } from "react-native";
import MemoListItem from "../../components/MemoListItem";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/icon";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import LogOutButton from "../../components/LogOutButton";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, auth } from "../../config";
import { type Memo } from "../../../types/memo";

const hadlePress = ():void => {
    router.push('/memo/create')
}

const List = (): JSX.Element => {
    const [memos, setMemos] = useState<Memo[]>([])
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => { return <LogOutButton /> }
        })
        }, [])

        useEffect(() => {
            if (auth.currentUser === null) { return }
            const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
            const q = query(ref, orderBy('updatedAt', 'desc'))
            const unsubScribe = onSnapshot(q, (snapshot) => {
                const remoteMemos: Memo[] = []
                snapshot.forEach((doc) => {
                    console.log('memo', doc.data())
                    const { bodyText, updatedAt } = doc.data()
                    remoteMemos.push({
                        id: doc.id,
                        bodyText,
                        updatedAt
                        })
                })
                setMemos(remoteMemos)
            })
            return unsubScribe
        }, [])

    return (
        <View style={styles.container}>
            <FlatList 
                data={memos}
                renderItem={({ item }) => <MemoListItem memo = {item} />}
                />
        <CircleButton onPress={hadlePress}>
            <Icon name='plus' size={40} color='#ffffff' />
        </CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
})

export default List
