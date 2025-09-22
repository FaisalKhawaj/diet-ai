// components/QuickAddModal.tsx
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from "@expo/vector-icons/Feather";
import { AnimatePresence, MotiView } from "moti";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


type Props = {
  visible: boolean;
  onClose: () => void;
  onFoodDB: () => void;
  onScanFood: () => void;
  tabHeight?: number;         // your tab bar height (default 86)
  backdropOpacity?: number;   // 0..1 dim strength (default 0.35)
};

export default function QuickAddModal({
  visible,
  onClose,
  onFoodDB,
  onScanFood,
  tabHeight = 86,
  backdropOpacity = 0.35,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      animationType="fade"      // Modal fade (backdrop-like)
      transparent               // draw over your screen
      statusBarTranslucent      // dim under status bar (Android)
      onRequestClose={onClose}  // Android back button
    >
      <View style={StyleSheet.absoluteFill}>
        {/* Backdrop like Modal's */}
        <Pressable
          onPress={onClose}
          style={[StyleSheet.absoluteFill, { backgroundColor: `rgba(0,0,0,${backdropOpacity})` }]}
        />

        {/* Popup tiles, animated up a bit */}
        <AnimatePresence>
          {visible && (
            <MotiView
              from={{ translateY: 60, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: 60, opacity: 0 }}
              transition={{ type: "timing", duration: 220 }}
              style={[
                styles.sheetWrap,
                { bottom: insets.bottom + tabHeight - 16 },
              ]}
            >
              <Pressable style={styles.tile} onPress={onFoodDB}>
                <Feather name="search" size={28} color="#000" />
                <Text style={styles.tileLabel}>Food Database</Text>
              </Pressable>

              <Pressable style={styles.tile} onPress={onScanFood}>
                <AntDesign name="scan" size={24} color="black" />
                <Text style={styles.tileLabel}>Scan Food</Text>
              </Pressable>
            </MotiView>
          )}
        </AnimatePresence>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheetWrap: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  tile: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  tileLabel: { marginTop: 8, fontWeight: "700",
    fontFamily:fonts.secondary.secondaryRegular,
    fontSize:responsiveFontSize(16),
    lineHeight:responsiveLineHeight(16,22),
    color: "#696767" },
});
