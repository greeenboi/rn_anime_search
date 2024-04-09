import { ActivityIndicator, Pressable, StyleSheet, ToastAndroid } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useColorScheme } from "@/components/useColorScheme";
export default function IconButton({
    onPress,
    name,
    loading,
    disabled,
    label
} : {
    onPress: () => void,
    name: React.ComponentProps<typeof FontAwesome>['name'],
    loading?: boolean,
    disabled?: boolean,
    label: string
}) {

    const colorScheme = useColorScheme();

    function handleLongPress({ message } : { message: string }) {
        ToastAndroid.showWithGravity(`Successfully Chosen ${message}`, ToastAndroid.LONG, ToastAndroid.TOP);
    }

    return (
        <Pressable style={{flex: 1, display: 'flex', alignItems:'center', opacity: disabled ? 0.5 : 1 }} onPress={onPress} disabled={disabled} onLongPress={() => handleLongPress({ message: label })}>
            {({ pressed }) => (
             loading ?
                <ActivityIndicator size="small" color="#ffffff80" />
                :
                
                <FontAwesome size={28} style={{ marginBottom: -3, opacity: pressed ? 0.5 : 1, }} name={name} color={Colors[colorScheme ?? 'dark'].text} />
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        // backgroundColor: Colors.dark.text,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    spin: {
        marginBottom: -3,
        transform: [{ rotate: '180deg' }],
        
    }
});