import { SafeAreaWrapper } from "@/components/SafeAreaWrapper";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { globalStyles } from "@/globalstyles";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveHeight, responsiveLineHeight, responsiveWidth } from "@/utils";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, TextInput, View } from "react-native";

const ITEM_GAP = 10;



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


export default function FoodDatabase() {

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [sheetVisible, setSheetVisible] = useState(false);

    const SearchBar = () => {
        return (
            <View style={styles.inputWrapper}>
                <Ionicons name='search' size={20} color={'#696767'} />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor={'#696767'}
                    style={styles.inputStyle}
                />
            </View>
        )
    }

    const handleAdd = (item: RecipeCard) => {
        setSelectedId(item.id);
        setSheetVisible(true);
    };

    const renderFoodItem = ({ item }: { item: RecipeCard }) => {
        const isSelected = selectedId === item.id;

        return (
            <Pressable style={[styles.cardWrapper, {
                backgroundColor: isSelected ? '#e3f2e7' : '#fff'
            }]}>
                <View style={styles.rowJustifyBetween}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <ThemedText numberOfLines={3} style={styles.name}>{item.title}</ThemedText>
                            <View style={styles.dot} />
                            <ThemedText style={styles.timeAgo}>{item.servingLabel}</ThemedText>
                        </View>


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
                    </View>

                    {!isSelected ?
                        <Pressable
                            onPress={() => handleAdd(item)}
                            style={styles.roundedAddButton}>
                            <FontAwesome5 name="plus" size={20} color="#fff" />
                        </Pressable> :
                        <Pressable style={{ alignSelf: 'center' }}>
                            <FontAwesome5 name="check-double" size={24} color="#20B067" />
                        </Pressable>

                    }
                </View>
            </Pressable>
        )
    }

    return (
        <SafeAreaWrapper style={{ alignItems: 'flex-start' }}>
            <View style={globalStyles.row}>
                <Pressable style={globalStyles.overflowBackButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={20} color="#000" />
                </Pressable>
                <ThemedText style={globalStyles.screenCenterHeaderTitle}>Food Database</ThemedText>
            </View>
            <Spacer marginTop={20} />

            <FlashList
                data={recipes}
                keyExtractor={item => item.id}
                renderItem={renderFoodItem}
                style={{ flex: 1, width: "100%", alignSelf: "stretch" }}
                contentContainerStyle={{
                    paddingVertical: ITEM_GAP
                }}
                indicatorStyle='black'
                ListHeaderComponent={<SearchBar />}
                ListHeaderComponentStyle={{ marginBottom: 20 }}
                ItemSeparatorComponent={() => <View style={{ height: ITEM_GAP }} />}

            />


<Modal transparent visible={sheetVisible} animationType="fade" onRequestClose={() => setSheetVisible(false)}>
        {/* Backdrop with blur */}
        <Pressable style={styles.backdrop} onPress={() => setSheetVisible(false)}>
          <BlurView intensity={0.5} tint="light" style={StyleSheet.absoluteFillObject} />
        </Pressable>

        {/* Sheet */}
        <View style={styles.sheetWrap} pointerEvents="box-none">
          <View style={styles.sheetCard}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              {/* <Ionicons name="checkmark" size={20} color={"#20B067"} /> */}
              <FontAwesome5 name="check-double" size={24} color="#20B067" />

<View>

<ThemedText
                style={styles.foodLogged}
              >
                Food Is Logged
              </ThemedText>

<ThemedText
              style={styles.foodLoggedDescription}
            >
              Click here if you want to make changes/ edit
            </ThemedText>
</View>
             
            </View>

            <Spacer marginTop={6} />
          

            <Spacer marginTop={16} />
            <Pressable style={styles.viewBtn} onPress={() => {
              setSheetVisible(false);
              // router.push("/your-detail-screen"); // optional
            }}>
              <ThemedText
                style={styles.viewButtonText}
              >
                View
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>


        </SafeAreaWrapper>
    )
}

const styles = StyleSheet.create({
    inputWrapper: {
        borderRadius: 40,
        backgroundColor: Colors.light.inputBg,
        paddingHorizontal: 15,
        height: responsiveHeight(53),
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: 10
    },
    inputStyle: {
        flex: 1,
        color: '#696767',
        fontFamily: fonts.secondary.secondaryRegular,
        fontSize: responsiveFontSize(18),
        lineHeight: responsiveLineHeight(18, 23)
    },
    timeAgo: {
        fontFamily: fonts.secondary.secondaryRegular,
        fontSize: responsiveFontSize(12),
        lineHeight: responsiveLineHeight(12, 18),
        color: '#696767'
    },
    dot: {
        backgroundColor: '#D9D9D9', width: 5, height: 5, borderRadius: 10
    },
    cardWrapper: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        paddingHorizontal: 28,
        paddingVertical: 15,
        borderRadius: 20,
        // width:'100%',
    },
    name: {
        fontFamily: fonts.primary.primaryBold,
        fontSize: responsiveFontSize(18),
        lineHeight: responsiveLineHeight(18, 24),
        color: '#000000',
        width: '55%',
    },
    rowAmount: {
        flexDirection: 'row', alignItems: 'center', gap: 10
    },
    amount: {
        fontSize: responsiveFontSize(12),
        lineHeight: responsiveLineHeight(12, 18),
        fontFamily: fonts.secondary.secondaryRegular,
        color: '#696767'
    },
    rowJustifyBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    roundedAddButton: {
        width: responsiveWidth(46),
        height: responsiveHeight(46),
        borderRadius: responsiveHeight(46),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000'

    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
      },
      sheetWrap: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
      },
      sheetCard: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: -4 },
        elevation: 12,
        marginTop: "auto",
      },
      viewBtn: {
        backgroundColor: "#000",
        height: responsiveHeight(50),
        borderRadius: responsiveHeight(50),
        alignItems: "center",
        justifyContent: "center",
      },
      viewButtonText:{
        color: "#fff",
        fontFamily: fonts.primary.primarySemiBold,
        fontSize: responsiveFontSize(18),
        lineHeight: responsiveLineHeight(18, 24),
        textAlign: "center",
      },
      foodLogged:{
        fontFamily: fonts.primary.primaryBold,
        fontSize: responsiveFontSize(20),
        lineHeight: responsiveLineHeight(20, 25),
        color: "#000",
      },
      foodLoggedDescription:{
        fontFamily:fonts.secondary.secondaryRegular,
        fontSize:responsiveFontSize(16),
        lineHeight:responsiveLineHeight(16,22)
      }
})