import { SafeAreaWrapper } from "@/components/SafeAreaWrapper";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { globalStyles } from "@/globalstyles";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

const BulletItem = ({ title }: { title: string }) => {
  return (
    <View style={style.itemRow}>
      <ThemedText style={style.leadCol}>•</ThemedText>
      <ThemedText style={style.itemText}>{title}</ThemedText>
    </View>
  );
};

const NumberedItem = ({ title, index }: { title: string; index: number }) => {
  return (
    <View style={style.itemRow}>
      <ThemedText style={style.leadCol}>{index}.</ThemedText>
      <ThemedText style={style.itemText}>{title}</ThemedText>
    </View>
  );
};

const instructions = [
  { id: 1, title: "Heat olive oil in a skillet over medium heat." },
  {
    id: 2,
    title:
      "Add chicken strips, season with paprika, salt, and pepper. Cook until golden.",
  },
  {
    id: 3,
    title:
      "Toss in garlic, honey, soy sauce, and chili flakes. Stir until chicken is glazed and slightly sticky.",
  },
  { id: 4, title: "Warm tortillas in a dry pan or oven." },
  {
    id: 5,
    title:
      "Assemble tacos: layer cabbage/lettuce, chicken, mango, onion, and sprinkle with cilantro.",
  },
  { id: 6, title: "Squeeze fresh lime juice on top." },
];

const ingredients = [
  { id: 1, title: "2 chicken breasts (sliced into strips)" },
  { id: 2, title: "2 tbsp olive oil" },
  { id: 3, title: "3 cloves garlic (minced)" },
  { id: 4, title: "2 tbsp honey" },
  { id: 5, title: "1 tbsp soy sauce" },
  { id: 6, title: "1 tsp chili flakes (adjust to taste)" },
  { id: 7, title: "1 tsp smoked paprika" },
  { id: 8, title: "Salt & pepper to taste" },
  { id: 9, title: "6 small tortillas" },
  { id: 10, title: "1 cup shredded cabbage or lettuce" },
  { id: 11, title: "½ cup diced mango (or pineapple)" },
  { id: 12, title: "Fresh cilantro for garnish" },
  { id: 13, title: "Lime wedges" },
];

export default function ReceipeDetails() {
  const renderInstructions: ListRenderItem<(typeof instructions)[number]> = ({
    item,
    index,
  }) => <NumberedItem title={item.title} index={index + 1} />;

  const Header = () => (
    <View>
      {/* Top bar */}
      <View style={[globalStyles.row, { alignItems: "center" }]}>
        <Pressable
          style={globalStyles.overflowBackButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={20} color="#000" />
        </Pressable>
        <ThemedText style={globalStyles.screenCenterHeaderTitle}>
          Receipe AI
        </ThemedText>
      </View>

      <Spacer marginTop={20} />

      {/* Macros row */}
      <View style={style.rowAmountWrap}>
        <View style={globalStyles.row}>
          <ThemedText style={style.rowTitleAmount}>🔥</ThemedText>
          <ThemedText style={style.rowTitleAmount}>225 Kcal</ThemedText>
        </View>

        <View style={globalStyles.row}>
          <ThemedText style={style.rowTitleAmount}>🌾</ThemedText>
          <ThemedText style={style.rowTitleAmount}>22g</ThemedText>
        </View>

        <View style={globalStyles.row}>
          <ThemedText style={style.rowTitleAmount}>🐟</ThemedText>
          <ThemedText style={style.rowTitleAmount}>25g</ThemedText>
        </View>

        <View style={globalStyles.row}>
          <ThemedText style={style.rowTitleAmount}>🧀</ThemedText>
          <ThemedText style={style.rowTitleAmount}>22g</ThemedText>
        </View>
      </View>

      <Spacer marginTop={10} />

      {/* Title */}
      <ThemedText style={style.receipeTitle}>
        Spicy Honey Garlic Chicken Tacos
      </ThemedText>

      <Spacer marginTop={10} />

      {/* Ingredients */}
      <ThemedText style={style.sectionTitle}>Ingredients (Serves 2–3):</ThemedText>
      {ingredients.map((item) => (
        <BulletItem key={item.id} title={item.title} />
      ))}

      <Spacer marginTop={8} />

      {/* Instructions heading */}
      <ThemedText style={style.sectionTitle}>Instructions</ThemedText>
    </View>
  );

  return (
    <SafeAreaWrapper style={{ alignItems: "flex-start" }}>
      <FlashList
        data={instructions}
        renderItem={renderInstructions}
        keyExtractor={(it) => String(it.id)}

        ListHeaderComponent={Header}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaWrapper>
  );
}

const style = StyleSheet.create({
  rowAmountWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowTitleAmount: {
    color: Colors.light.inputPlaceholder,
    fontFamily: fonts.secondary.secondaryRegular,
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveLineHeight(16, 20),
    marginRight: 6,
  },
  receipeTitle: {
    color: "#000",
    fontFamily: fonts.primary.primaryBold,
    fontSize: responsiveFontSize(25),
    lineHeight: responsiveLineHeight(25, 30),
  },

  // List item layout: prevents horizontal scrolling
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingRight: 16, // small buffer to avoid accidental overflow causing horizontal scroll
  },
  leadCol: {
    width: 24, // fixed gutter for bullet/number
    textAlign: "right",
    marginRight: 8,
    fontSize: responsiveFontSize(16),
    color: "#696767",
    fontFamily: fonts.secondary.secondaryRegular,
  },
  itemText: {
    flex: 1,
    flexWrap: "wrap",
    flexShrink: 1,
    maxWidth: "100%",
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveLineHeight(16, 22),
    color: "#696767",
    fontFamily: fonts.secondary.secondaryRegular,
  },

  sectionTitle: {
    flexShrink: 1,
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveLineHeight(16, 22),
    color: "#696767",
    fontFamily: fonts.secondary.secondaryRegular,
  },
});
