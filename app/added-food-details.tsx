import { Burger } from "@/assets/images";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/themed-text";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveHeight, responsiveLineHeight } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function AddedFoodDetails() {
    return (
        <SafeAreaView style={{ flex:1 }}>
            <ScrollView 
            indicatorStyle='black'
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.innerScroll}>

    
            <View style={styles.rowJustifyBetween}>
                <ThemedText style={styles.details}>
                    Details
                </ThemedText>

                <Pressable onPress={()=>router.back()}>
                    <Ionicons color={'#CACACA'} name='close' size={20} />
                </Pressable>
            </View>

            <Spacer marginTop={10} marginBottom={10} />
            <Image
                source={Burger}
                contentFit="cover"
                style={styles.imgStyle} />

            <Spacer marginTop={10} />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>

                <ThemedText style={styles.caloriText}>
                    🔥 225 Kcal
                </ThemedText>


                <ThemedText style={styles.caloriText}>
                    🌾 22g
                </ThemedText>


                <ThemedText style={styles.caloriText}>
                    🐟 25g
                </ThemedText>


                <ThemedText style={styles.caloriText}>
                    🧀 22g
                </ThemedText>




            </View>
            <Spacer marginTop={10} />

            <ThemedText style={styles.dish}>
                Bread with chilli gralic sauce...
            </ThemedText>

            <Spacer marginTop={16} />

            <ThemedText style={styles.description}>
                Lorem ipsum dolor sit amet consectetur. Porttitor non donec venenatis porttitor pretium dignissim auctor.Lorem ipsum dolor sit amet consectetur. Porttitor non donec venenatis porttitor pretium dignissim auctor.Lorem ipsum dolor sit amet consectetur. Porttitor non donec venenatis porttitor pretium dignissim auctor. Lorem ipsum dolor sit amet consectetur. Porttitor non donec venenatis porttitor pretium dignissim auctor.Lorem ipsum dolor sit amet consectetur. Porttitor non donec venenatis porttitor pretium dignissim auctor.Lorem ipsum dolor sit amet consectetur. Porttitor non donec venenatis porttitor pretium dignissim auctor.
            </ThemedText>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    innerScroll:{
        flexGrow:1,padding: 20, paddingBottom:20,
    },
    rowJustifyBetween: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    details: {
        color: '#000000',
        fontSize: responsiveFontSize(22),
        fontFamily: fonts.primary.primaryBold,
        lineHeight: responsiveLineHeight(22, 26)
    },
    imgStyle: {
        borderRadius: 30,
        height: responsiveHeight(380),
        width: '100%'
    },
    caloriText: {
        fontSize: responsiveFontSize(16),
        lineHeight: responsiveLineHeight(16, 22),
        fontFamily: fonts.secondary.secondaryRegular,
        color: '#696767'
    },
    dish: {
        fontSize: responsiveFontSize(22),
        lineHeight: responsiveLineHeight(22, 28),
        fontFamily: fonts.primary.primaryBold,
        color: '#000000'
    },
    description: {
        color: '#696767',
        fontSize: responsiveFontSize(16),
        fontFamily: fonts.secondary.secondaryRegular,
        lineHeight: responsiveLineHeight(16, 22)
    }
})