import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera, CameraView } from "expo-camera";
import { router } from "expo-router";

import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ScanFoodScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [mode, setMode] = useState<"food" | "barcode">("food");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
  <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        // enable scanning only in barcode mode:
        onBarcodeScanned={mode === "barcode" ? (r) => console.log("scan", r.data) : undefined}
        // (optional) narrow the types for performance:
        barcodeScannerSettings={{ barcodeTypes: ["ean13", "ean8", "upc_e", "qr"] }}
      />

      {/* Close Button */}
      <Pressable onPress={()=>router.back()} style={styles.closeBtn}>
        <Ionicons name="close" size={28} color="#fff" />
      </Pressable>

      

      {/* White scan box overlay */}
      <View style={styles.overlay}>
        <View style={styles.scanBox} />
      </View>

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

          <Text style={[styles.modeText, mode === "barcode" && styles.activeText]}>
            Scan Barcode
          </Text>
        </Pressable>
      </View>

      {/* Bottom Mode Selector */}
    

      {/* Capture Button */}
      <Pressable style={[styles.captureBtn,{padding:3}]} onPress={() => console.log("Capture", mode)}>
        <Pressable style={{borderWidth:2,borderRadius:100,width:'100%',height:'100%'}}>

        </Pressable>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  closeBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    marginHorizontal:20,
    bottom:120,
    paddingVertical: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap:10,
  },
  modeBtn: {
    flex:1,
    alignItems: "center",
    justifyContent:'center',
    gap:5,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor:'#dadddc',
    borderRadius: 20,
  },
  activeMode: {
    backgroundColor: "#FFFFFF",
  },
  modeText: {
    marginLeft: 8,
    fontSize: responsiveFontSize(16),
    lineHeight:responsiveLineHeight(16,20),
    fontFamily:fonts.secondary.secondaryRegular,
    color: "#696767",
  },
  activeText: {
    color: "#696767",
  },
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
