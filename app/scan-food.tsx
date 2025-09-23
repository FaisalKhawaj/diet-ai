import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { BarcodeType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ScanFoodScreen() {
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState<"food" | "barcode">("food");
  const cameraRef = useRef<CameraView>(null);
  const BARCODE_TYPES = [
    "ean13",
    "ean8",
    "upc_e",
    "qr",
  ] as const satisfies readonly BarcodeType[];

  useEffect(() => {
    if (!permission || !permission.granted) {
      requestPermission();
    }
  }, [permission?.granted]);

  const barcodeTypes =
    mode === "barcode"
      ? (["ean13", "ean8", "upc_e", "qr"] as const)
      : undefined;
  // Ask once if needed

  if (!permission) return <View />;
  if (!permission.granted) return <Text>No access to camera</Text>;

  // Only render CameraView when screen is focused (prevents Android crashes during transitions)
  const shouldRenderCamera = isFocused;

  // Supported types (adjust to your SDK if needed)

  return (
    <View style={styles.container}>
      {shouldRenderCamera && (
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing="back"
          // Enable scanning only in barcode mode
          onBarcodeScanned={
            mode === "barcode"
              ? (r) => {
                  // you can navigate or vibrate here
                  console.log("scan", r.data);
                }
              : undefined
          }
          barcodeScannerSettings={
            mode === "barcode"
              ? { barcodeTypes: [...BARCODE_TYPES] }
              : undefined
          }
        />
      )}

      {/* Close */}
      <Pressable onPress={() => router.back()} style={styles.closeBtn}>
        <Ionicons name="close" size={28} color="#fff" />
      </Pressable>

      {/* Overlay (doesn't block camera) */}
      <View pointerEvents="none" style={styles.overlay}>
        <View style={styles.scanBox} />
      </View>

      {/* Mode selector */}
      <View style={styles.bottomBar}>
        <Pressable
          style={[styles.modeBtn, mode === "food" && styles.activeMode]}
          onPress={() => setMode("food")}
        >
          <AntDesign name="scan" size={20} color="black" />
          <Text style={[styles.modeText, mode === "food" && styles.activeText]}>
            Scan Food
          </Text>
        </Pressable>

        <Pressable
          style={[styles.modeBtn, mode === "barcode" && styles.activeMode]}
          onPress={() => setMode("barcode")}
        >
          <MaterialCommunityIcons name="barcode-scan" size={20} color="black" />
          <Text
            style={[styles.modeText, mode === "barcode" && styles.activeText]}
          >
            Scan Barcode
          </Text>
        </Pressable>
      </View>

      {/* Capture */}
      <Pressable
        style={[styles.captureBtn, { padding: 3 }]}
        onPress={() => console.log("Capture", mode)}
      >
        <Pressable
          style={{
            borderWidth: 2,
            borderRadius: 100,
            width: "100%",
            height: "100%",
          }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  closeBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
  overlay: { flex: 1, justifyContent: "center", alignItems: "center" },
  scanBox: {
    width: "70%",
    height: "30%",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 20,
    bottom: 120,
    paddingVertical: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 10,
  },
  modeBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#dadddc",
    borderRadius: 20,
  },
  activeMode: { backgroundColor: "#FFFFFF" },
  modeText: {
    marginLeft: 8,
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveLineHeight(16, 20),
    fontFamily: fonts.secondary.secondaryRegular,
    color: "#696767",
  },
  activeText: { color: "#696767" },
  captureBtn: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
  },
});
