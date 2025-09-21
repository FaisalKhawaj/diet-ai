import { GreenCheckMark } from "@/assets/images";
import { CircularProgress } from "@/components/circularprogress";
import { LabelButton } from "@/components/LabelButton";
import { SafeAreaWrapper } from "@/components/SafeAreaWrapper";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/themed-text";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveHeight, responsiveLineHeight, responsiveWidth } from "@/utils";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Platform, ScrollView, StyleSheet, View } from "react-native";



type MacroTileProps = {
    title?: string;
    emoji?: string;
    valueText: string;           // center text in the ring (e.g., "256g")
    value: number;               // for progress calc
    max: number;                 // for progress calc
    color: string;               // ring color
};


function MacroTile({ title, emoji, valueText, value, max, color }: MacroTileProps) {
    return (
        <View style={styles.tile}>
            {!!title && (
                <ThemedText style={styles.tileTitle}>
                    {title} {emoji ? emoji : ""}
                </ThemedText>
            )}
            <CircularProgress
                value={value}
                max={max}
                color={color}
                trackColor="#EDEDED"
                text={valueText}
                size={86}
                stroke={8}
            />
        </View>
    );
}

function MacrosCard() {
    return (
        <View style={styles.card}>
            <ThemedText style={styles.cardTitle}>Calculated Daily Macros</ThemedText>

            <View style={styles.grid}>
                {/* Calories (top-left) */}
                <MacroTile
                    title="Calories"
                    emoji="🔥"
                    value={2256}
                    max={3000}
                    valueText="2256"
                    color="#F7C54A" // warm yellow like screenshot
                />

                {/* Protein (top-right) */}
                <MacroTile
                    title="Protein"
                    emoji="🐟"
                    value={256}
                    max={1000}
                    valueText="256g"
                    color="#34C75A" // green
                />

                {/* Carbs (bottom-left) */}
                <MacroTile
                    title="Carbs"
                    emoji="🌾"
                    value={256}
                    max={350}
                    valueText="256g"
                    color="#65BEFD" // light blue-gray (choose to your palette)
                />

                {/* Fats (bottom-right) */}
                <MacroTile
                    title="Fats"
                    emoji="🧀"
                    value={69}
                    max={100}
                    valueText="69g"
                    color="#C73448" // red
                />
            </View>

            {/* Health score row */}
            <View style={styles.healthRow}>
                <View style={styles.heartOuterBadge}>
                    <View style={styles.heartBadge}>
                        <ThemedText style={styles.heartIcon}>❤️</ThemedText>
                    </View>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <ThemedText style={styles.heartScoresText}>5.5/10</ThemedText>
                    <ThemedText style={styles.healthLabel}>Health Score</ThemedText>
                </View>
            </View>
        </View>
    );
}




export default function Results() {
    return (
        <SafeAreaWrapper>
<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>


            <Image source={GreenCheckMark} style={styles.checkCircle} />

            <Spacer marginTop={22} />

            <ThemedText style={styles.screenTitle}>
                Congratulations. Your Personalization plan is ready
            </ThemedText>

            <Spacer marginTop={19} />

            <ThemedText style={styles.description}>
                Our goal is to lose 2kg till 30 November 2025
            </ThemedText>
            <Spacer marginTop={30} />

            <MacrosCard />
            <Spacer marginTop={30} />
            <LabelButton
        title={`Let’s start the journey`}
        onPress={()=>router.push('/paywall')}
        // onPress={handleGetStarted}
        style={{ marginTop: 24 }}
      />
      </ScrollView>
        </SafeAreaWrapper>
    )
}

const styles = StyleSheet.create({
    checkCircle: {
        width: responsiveWidth(55),
        alignSelf: 'center',
        height: responsiveHeight(55)
    },
    screenTitle: {
        fontSize: responsiveFontSize(30), fontFamily: fonts.primary.primaryBold,
        lineHeight: responsiveLineHeight(30, 40),
        textAlign: 'center'
    },
    description: {
        fontSize: responsiveFontSize(16), lineHeight: responsiveLineHeight(16, 21),
        fontFamily: fonts.secondary.secondaryRegular,
        textAlign: 'center'
    },

    card: {
        backgroundColor: "#FFF",
        borderRadius: 18,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginHorizontal:2,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOpacity: 0.12,
                shadowOffset: { width: 0, height: 10 },
                shadowRadius: 20,
            },
            android: { elevation: 4 },
        }),
    },
    cardTitle: {
        fontSize: responsiveFontSize(20),
        lineHeight: responsiveLineHeight(20, 25),
        fontFamily: fonts.primary.primaryBold,
        color: "#1A1A1A",
        marginBottom: 12,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    tile: {
        width: "48%",
        backgroundColor: "#FFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#F1F1F1",
        paddingVertical: 12,
        alignItems: "center",
    },
    tileTitle: {
        fontSize: responsiveFontSize(16),
        lineHeight:responsiveLineHeight(16,22),
        color: "#696767",
        fontFamily:fonts.secondary.secondaryRegular,
        marginBottom: 8,
    },
    healthRow: {
        marginTop: 14,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
    },
    heartOuterBadge: {
        padding: 10,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffefef'
    },

    heartBadge: {
        // width: 36,
        // height: 36,
        borderRadius: 18,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffe3e4", // soft red halo (screenshot vibe)
    },
    heartIcon: {
        fontSize: 18,
    },
    heartScoresText: {
        fontFamily: fonts.primary.primaryBold,
        fontSize: responsiveFontSize(20),
        lineHeight: responsiveLineHeight(20, 24),
        color: "#111"
    },
    healthScore: {
        fontSize: 16,
    },
    healthLabel: {
        fontSize: responsiveFontSize(16),
        lineHeight: responsiveLineHeight(16, 22),
        fontFamily: fonts.secondary.secondaryRegular,
        color: "#696767",
        marginTop: 2,
    },
})