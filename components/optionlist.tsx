import { Colors } from "@/constants/theme";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export type OptionItem = {
  id: string | number;
  title: string;
  subtitle?: string;
};

type OptionListProps = {
  options: OptionItem[];
  selectedId?: string | number;
  onSelect: (id: string | number) => void;
  containerStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
};

export function OptionList({
  options,
  selectedId,
  onSelect,
  containerStyle,
  itemStyle,
  titleStyle,
  subtitleStyle,
}: OptionListProps) {
  const renderItem = ({ item }: { item: OptionItem }) => {
    const selected = selectedId === item.id;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.optionContainer,
          itemStyle,
          selected && styles.optionSelected,
        ]}
        onPress={() => onSelect(item.id)}
      >
        {/* Radio circle */}
        <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
          {selected && <View style={styles.radioInner} />}
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.title, titleStyle]}>{item.title}</Text>
          {item.subtitle ? (
            <Text style={[styles.subtitle, subtitleStyle]}>{item.subtitle}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={options}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={[styles.listContainer, containerStyle]}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 12,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.cardBackground ,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  optionSelected: {
    borderColor: Colors.light.cardBackground,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor:'#fff',
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  radioOuterSelected: {
    borderColor: "#fff",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light.primaryButton ?? "#000",
  },
  title: {
    fontFamily: fonts.primary.primaryBold,
    fontSize: responsiveFontSize(20),
    lineHeight:responsiveLineHeight(20,26),
    color: "#000",
  },
  subtitle: {
    fontFamily: fonts.secondary.secondaryRegular,
    fontSize: responsiveFontSize(14),
    lineHeight:responsiveLineHeight(14,20),
    color: "#555",
    marginTop: 2,
  },
});
