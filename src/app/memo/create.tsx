import { 
    View, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import Header from "../../components/header";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/icon";

const Create = () => {
    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <Header />
            <View style={styles.inputContainer}>
                <TextInput multiline style={styles.input} value='' />
            </View>
            <CircleButton>
                <Icon name='check' size={40} color='#ffffff'/>
            </CircleButton>
        
        
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    inputContainer: {
        paddingVertical: 32,
        paddingHorizontal: 27,
        flex: 1
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24
    }
})

export default Create