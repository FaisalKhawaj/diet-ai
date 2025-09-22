import { PillTabButton } from "@/components/pilltabbutton";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/themed-text";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import { FlashList } from "@shopify/flash-list";
import { Fragment, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type RecipeCard = {
    id: string;
    servingLabel: string;   // "Serving" (as in the image)
    timeAgo: string;        // e.g., "2 Hours Ago"
    title: string;
    kcal: number;
    carbsG: number;         // 🌾
    proteinG: number;       // 🐟
    fatG: number;           // 🧀
};

const recipes: RecipeCard[] = [
    {
        id: "r1",
        servingLabel: "Serving",
        timeAgo: "2 Hours Ago",
        title: "Spicy Honey Garlic Chicken Tacos",
        kcal: 225,
        carbsG: 22,
        proteinG: 25,
        fatG: 22,
    },
    {
        id: "r2",
        servingLabel: "Serving",
        timeAgo: "15 Min Ago",
        title: "Grilled Lemon Herb Chicken",
        kcal: 320,
        carbsG: 8,
        proteinG: 38,
        fatG: 14,
    },
    {
        id: "r3",
        servingLabel: "Serving",
        timeAgo: "1 Hour Ago",
        title: "Creamy Garlic Shrimp Pasta",
        kcal: 540,
        carbsG: 58,
        proteinG: 32,
        fatG: 18,
    },
    {
        id: "r4",
        servingLabel: "Serving",
        timeAgo: "Yesterday",
        title: "Quinoa Veggie Bowl",
        kcal: 410,
        carbsG: 62,
        proteinG: 16,
        fatG: 12,
    },
    {
        id: "r5",
        servingLabel: "Serving",
        timeAgo: "3 Hours Ago",
        title: "Beef Stir-Fry",
        kcal: 480,
        carbsG: 36,
        proteinG: 38,
        fatG: 20,
    },
    {
        id: "r6",
        servingLabel: "Serving",
        timeAgo: "45 Min Ago",
        title: "Avocado Egg Toast",
        kcal: 350,
        carbsG: 28,
        proteinG: 15,
        fatG: 22,
    },
    {
        id: "r7",
        servingLabel: "Serving",
        timeAgo: "5 Hours Ago",
        title: "Greek Salad with Feta",
        kcal: 260,
        carbsG: 14,
        proteinG: 10,
        fatG: 18,
    },
    {
        id: "r8",
        servingLabel: "Serving",
        timeAgo: "Just Now",
        title: "Teriyaki Salmon Bowl",
        kcal: 520,
        carbsG: 50,
        proteinG: 35,
        fatG: 18,
    },
    {
        id: "r9",
        servingLabel: "Serving",
        timeAgo: "Yesterday",
        title: "Mushroom Risotto",
        kcal: 450,
        carbsG: 66,
        proteinG: 12,
        fatG: 14,
    },
    {
        id: "r10",
        servingLabel: "Serving",
        timeAgo: "30 Min Ago",
        title: "Turkey Chili",
        kcal: 430,
        carbsG: 28,
        proteinG: 34,
        fatG: 16,
    },
    {
        id: "r11",
        servingLabel: "Serving",
        timeAgo: "4 Hours Ago",
        title: "Pesto Chicken Wrap",
        kcal: 470,
        carbsG: 42,
        proteinG: 32,
        fatG: 20,
    },
    {
        id: "r12",
        servingLabel: "Serving",
        timeAgo: "1 Day Ago",
        title: "Buddha Bowl",
        kcal: 390,
        carbsG: 58,
        proteinG: 18,
        fatG: 10,
    },
    {
        id: "r13",
        servingLabel: "Serving",
        timeAgo: "2 Days Ago",
        title: "Chicken Caesar Salad",
        kcal: 330,
        carbsG: 12,
        proteinG: 30,
        fatG: 18,
    },
    {
        id: "r14",
        servingLabel: "Serving",
        timeAgo: "2 Hours Ago",
        title: "Veggie Omelette",
        kcal: 300,
        carbsG: 6,
        proteinG: 22,
        fatG: 22,
    },
    {
        id: "r15",
        servingLabel: "Serving",
        timeAgo: "6 Hours Ago",
        title: "BBQ Chicken Pizza",
        kcal: 520,
        carbsG: 60,
        proteinG: 26,
        fatG: 18,
    },
    {
        id: "r16",
        servingLabel: "Serving",
        timeAgo: "3 Days Ago",
        title: "Spaghetti Bolognese",
        kcal: 560,
        carbsG: 62,
        proteinG: 28,
        fatG: 20,
    },
    {
        id: "r17",
        servingLabel: "Serving",
        timeAgo: "20 Min Ago",
        title: "Tuna Salad Sandwich",
        kcal: 430,
        carbsG: 36,
        proteinG: 26,
        fatG: 18,
    },
    {
        id: "r18",
        servingLabel: "Serving",
        timeAgo: "Yesterday",
        title: "Chicken Alfredo",
        kcal: 610,
        carbsG: 52,
        proteinG: 34,
        fatG: 28,
    },
    {
        id: "r19",
        servingLabel: "Serving",
        timeAgo: "1 Hour Ago",
        title: "Shakshuka",
        kcal: 340,
        carbsG: 18,
        proteinG: 20,
        fatG: 22,
    },
    {
        id: "r20",
        servingLabel: "Serving",
        timeAgo: "2 Days Ago",
        title: "Tofu Stir-Fry",
        kcal: 410,
        carbsG: 40,
        proteinG: 22,
        fatG: 16,
    },
];




const RecipeItem = ({ item }: { item: RecipeCard }) => {
    console.log('item',item)
    return (
        <Pressable style={styles.mainCardWrap}>
            <View style={styles.rowSpaceBetween}>
                <ThemedText style={styles.timeAgo}>
                    {item.servingLabel}
                </ThemedText>

                <ThemedText style={styles.timeAgo}>
                   {item.timeAgo}
                </ThemedText>
            </View>

            <ThemedText style={styles.name}>
               {item.title}
            </ThemedText>

            <View style={styles.rowAmount}>
                <ThemedText style={styles.amount}>
                    🔥 {item.kcal} Kcal
                </ThemedText>

                <ThemedText style={styles.amount}>
                    🌾 {item.carbsG}g
                </ThemedText>

                <ThemedText style={styles.amount}>
                    🐟 {item.proteinG}g
                </ThemedText>

                <ThemedText style={styles.amount}>
                    🧀 {item.fatG}g
                </ThemedText>
            </View>
        </Pressable>
    )
}

const ITEM_GAP = 10;



export default function Library() {

    const [tab, setTab] = useState<"diet" | "recipe">("diet");

    const ListHeader = () => {
        return (
            <Fragment>

                <PillTabButton
                    options={[
                        { id: "diet", label: "Diet AI" },
                        { id: "recipe", label: "Recipe AI" },
                    ]}
                    value={tab}
                    onChange={(id) => setTab(id as "diet" | "recipe")}
                    // Optional overrides (already matching the screenshot)
                    style={{}}
                    activePillStyle={{ backgroundColor: "#EFEFEF" }} // tweak tone if needed
                />
                <Spacer marginTop={10} />
            </Fragment>
        )
    }

    const renderRecipe = ({ item }: { item: RecipeCard }) => {
        return (
            <RecipeItem item={item} />
        )
    }


    return (
        <SafeAreaView edges={['bottom']} style={styles.mainScreen} >


            <FlashList
                data={recipes}
                keyExtractor={item => item.id}
                renderItem={renderRecipe}
                ListHeaderComponent={ListHeader}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: ITEM_GAP

                }}
                indicatorStyle='black'
                // scrollIndicatorInsets={{ right: 10 }} 
                ItemSeparatorComponent={() => <View style={{ height: ITEM_GAP }} />}

            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainScreen:{
        flex: 1, backgroundColor: '#f7f7f7' 
    },
    mainCardWrap: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        paddingHorizontal: 28,
        paddingVertical: 15,
        borderRadius: 20
    },
    rowSpaceBetween: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    timeAgo: {
        fontFamily: fonts.secondary.secondaryRegular,
        fontSize: responsiveFontSize(12),
        lineHeight: responsiveLineHeight(12, 18),
        color: '#696767'
    },
    name: {
        fontFamily: fonts.primary.primaryBold,
        fontSize: responsiveFontSize(18),
        lineHeight: responsiveLineHeight(18, 24),
        color: '#000000'
    },
    rowAmount: {
        flexDirection: 'row', alignItems: 'center', gap: 10
    },
    amount: {
        fontSize: responsiveFontSize(12),
        lineHeight: responsiveLineHeight(12, 18),
        fontFamily: fonts.secondary.secondaryRegular,
        color: '#696767'
    }
})