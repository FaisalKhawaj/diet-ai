import { Colors } from "@/constants/theme";
import { useRecipe } from "@/context/recipecontext";
import { globalStyles } from "@/globalstyles";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { MotiView } from "moti";
import { Pressable, StyleSheet, View } from "react-native";
import { Spacer } from "./Spacer";
import { ThemedText } from "./themed-text";


type Section = { id: string; emoji: string; title: string; items: string[] };

const plan: Section[] = [
  {
    id: "breakfast-1",
    emoji: "🍳",
    title: "Breakfast",
    items: [
      "2 boiled eggs or a veggie omelet",
      "1 slice of whole-grain toast",
      "½ avocado",
      "1 cup green tea or black coffee",
    ],
  },
  {
    id: "mid-1",
    emoji: "🥗",
    title: "Mid-Morning Snack",
    items: ["1 small apple or pear", "A handful (10–12) of almonds"],
  },
  {
    id: "lunch-1",
    emoji: "🍛",
    title: "Lunch",
    items: [
      "Grilled chicken breast (or tofu for vegetarian)",
      "1 cup quinoa or brown rice",
      "Steamed broccoli + carrots + spinach",
      "1 tsp olive oil drizzle",
    ],
  },
  {
    id: "snack-1",
    emoji: "🍌",
    title: "Afternoon Snack",
    items: ["1 banana with 1 tbsp peanut butter", "Or Greek yogurt with berries"],
  },
  {
    id: "dinner-1",
    emoji: "🍲",
    title: "Dinner",
    items: [
      "Baked salmon (or lentils for vegetarian)",
      "Roasted sweet potato",
      "Side salad (lettuce, cucumber, tomato, olive oil, lemon)",
    ],
  },
  {
    id: "evening-1",
    emoji: "🌙",
    title: "Evening (Optional)",
    items: ["Herbal tea", "A few walnuts or pumpkin seeds"],
  },

  // extra sections
  {
    id: "breakfast-2",
    emoji: "🍳",
    title: "Breakfast",
    items: [
      "Greek yogurt with mixed berries",
      "1 tbsp chia seeds",
      "1 slice whole-grain toast or ½ cup oats",
    ],
  },
  {
    id: "mid-2",
    emoji: "🥗",
    title: "Mid-Morning Snack",
    items: ["Carrot sticks with hummus", "A small handful of pistachios"],
  },
  {
    id: "lunch-2",
    emoji: "🍛",
    title: "Lunch",
    items: [
      "Turkey & avocado whole-wheat wrap",
      "Mixed greens with olive oil + lemon",
      "Cup of veggie soup (optional)",
    ],
  },
  {
    id: "snack-2",
    emoji: "🍌",
    title: "Afternoon Snack",
    items: ["2 rice cakes with almond butter", "Protein shake with water"],
  },
  {
    id: "dinner-2",
    emoji: "🍲",
    title: "Dinner",
    items: [
      "Stir-fried tofu/tempeh with mixed veggies",
      "¾ cup brown rice or cauliflower rice",
    ],
  },
  {
    id: "evening-2",
    emoji: "🌙",
    title: "Evening (Optional)",
    items: ["Chamomile tea", "2 small squares 70% dark chocolate"],
  },
  {
    id: "breakfast-3",
    emoji: "🍳",
    title: "Breakfast",
    items: [
      "Overnight oats with banana slices",
      "1 tbsp peanut butter",
      "Sprinkle of cinnamon",
    ],
  },
  {
    id: "mid-3",
    emoji: "🥗",
    title: "Mid-Morning Snack",
    items: ["Cottage cheese (½ cup) with pineapple", "A few cucumber slices"],
  },
  {
    id: "lunch-3",
    emoji: "🍛",
    title: "Lunch",
    items: [
      "Chickpea salad bowl (tomato, cucumber, onion)",
      "Feta (optional) + olive oil drizzle",
    ],
  },
  {
    id: "snack-3",
    emoji: "🍌",
    title: "Afternoon Snack",
    items: ["Edamame with sea salt", "1 kiwi or orange"],
  },
  {
    id: "dinner-3",
    emoji: "🍲",
    title: "Dinner",
    items: [
      "Grilled lean beef or paneer",
      "Roasted veggies (zucchini, peppers, onions)",
      "Small side of quinoa",
    ],
  },
  {
    id: "evening-3",
    emoji: "🌙",
    title: "Evening (Optional)",
    items: ["Warm turmeric milk (dairy or plant-based)", "Handful of pumpkin seeds"],
  },
  {
    id: "breakfast-4",
    emoji: "🍳",
    title: "Breakfast",
    items: [
      "Spinach, banana & protein smoothie (unsweetened almond milk)",
      "1 slice whole-grain toast",
    ],
  },
  {
    id: "lunch-4",
    emoji: "🍛",
    title: "Lunch",
    items: [
      "Lentil soup",
      "Side salad with olive oil + vinegar",
      "Small baked potato (optional)",
    ],
  },
];




export default function DietAIPopup() {
  const { setShowDietRecipe } = useRecipe();
  const renderPlan = ({ item }: { item: Section }) => {
    return (
      <View key={item.id} style={style.section}>
        <View style={style.sectionHeader}>
          <ThemedText style={style.sectionEmoji}>{item.emoji}</ThemedText>
          <ThemedText style={style.sectionTitle}>{item.title}</ThemedText>
        </View>

        {item.items.map((it, idx) => (
          <ThemedText key={idx} style={style.itemText}>
            {it}
          </ThemedText>
        ))}
      </View>
    )
  }

  const ListHeader = () => {
    return (
      <ThemedText style={style.dietPlanHeader}>
        Here is the Diet Plan
      </ThemedText>
    )
  }

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "timing",
        duration: 200,
        delay: 0,
      }}
      style={style.mainWrapper}
    >
      <MotiView
        from={{
          translateX: 300,
        }}
        animate={{
          translateX: 0,
        }}
        exit={{
          translateX: 300,
        }}
        transition={{
          type: "timing",
          duration: 250,
          delay: 0,
        }}
        style={style.innerWrap}
      >
        <View style={[globalStyles.row, { alignItems: "center" }]}>
          <Pressable
            style={globalStyles.overflowBackButton}
            onPress={() => {
              setShowDietRecipe(false);
              router.push('/(tabs)/library')
              // router.push('/(tabs)')
            }}
          >
            <Ionicons name="chevron-back" size={20} color="#000" />
          </Pressable>
          <ThemedText style={globalStyles.screenCenterHeaderTitle}>
            Diet AI
          </ThemedText>
        </View>

        <Spacer marginTop={20} />




        <FlashList
          data={plan}
          style={{ flex: 1 }}
          renderItem={renderPlan}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={{ paddingBottom: 30 }}
          indicatorStyle='black'

        />
      </MotiView>



    </MotiView>
  )
}

const style = StyleSheet.create({
  mainWrapper: {
    zIndex: 9,
    position: "absolute",
    left: 0,
    top: 0,
    marginTop: 0,
    width: "100%",
    height: "100%",
    shadowColor: "#000",
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: -20,
    },
    shadowOpacity: 0.2,
    backgroundColor: Colors.light.background,
  },
  innerWrap: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
    zIndex: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  dietPlanHeader: {
    fontFamily: fonts.primary.primaryBold,
    fontSize: responsiveFontSize(25),
    lineHeight: responsiveLineHeight(25, 30),
  },
  heading: {
    marginTop: 8,
    marginBottom: 8,
    fontFamily: fonts.primary.primaryBold,
    fontSize: responsiveFontSize(22),
    lineHeight: responsiveLineHeight(22, 28),
    color: "#0A0A0A",
  },

  section: {
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  sectionEmoji: {
    fontSize: responsiveFontSize(16),
    marginRight: 8,
  },
  sectionTitle: {
    fontFamily: fonts.secondary.secondaryRegular,
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveLineHeight(16, 22),
    color: "#696767",
  },

  itemText: {
    fontFamily: fonts.secondary.secondaryRegular,
    fontSize: responsiveFontSize(15),
    lineHeight: responsiveLineHeight(15, 22),
    color: "#696767",
    marginBottom: 3,
    flexShrink: 1,
  },

})