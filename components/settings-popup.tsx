import { User } from "@/assets/images";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/themed-text";
import { useRecipe } from "@/context/recipecontext";
import { globalStyles } from "@/globalstyles";
import { fonts } from "@/hooks/useCacheResources";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveLineHeight,
  responsiveWidth,
} from "@/utils";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { MotiView } from "moti";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import FormSheet from "./formsheet";

const RowTitle = ({
  borderBottomWidth = 1,
  title,
  value,
  handleClick,
}: any) => {
  return (
    <View
      style={[
        styles.cardRowTitleValue,
        { borderBottomWidth: borderBottomWidth },
      ]}
    >
      <ThemedText style={styles.rowTitle}>{title} </ThemedText>
      <View style={globalStyles.row}>
        <ThemedText style={styles.value}>{value} </ThemedText>
        <Ionicons name="chevron-forward" size={20} color={"#c0c0c0"} />
      </View>
    </View>
  );
};

export default function SettingsPopup() {
  console.log("modals SettingsModal mounted");
  const { setShowSettings } = useRecipe();
  const handleName = () => {};

  const handleEmail = () => {};

  const handleChangePassword = () => {};

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
      style={styles.mainWrapper}
    >
      <FormSheet onClose={() => setShowSettings(false)} insetLikeIOS>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 30,
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
        >
          <Spacer marginTop={21} />

          <Pressable style={styles.roundedImageView}>
            <Image source={User} style={{ width: 53, height: 53 }} />
          </Pressable>

          <Spacer marginTop={36} />

          <ThemedText style={styles.basic}>Basic</ThemedText>
          <Spacer marginTop={20} />

          <View style={styles.cardMainWrap}>
            <RowTitle
              title={"Name"}
              value={"Faisal Khawaj"}
              handleClick={handleName}
            />

            <RowTitle
              title={"Email"}
              value={"alex@smith.com"}
              handleClick={handleEmail}
            />

            <RowTitle
              title={"Change Password"}
              value={""}
              handleClick={handleChangePassword}
            />

            <RowTitle
              borderBottomWidth={0}
              title={"Plan"}
              value={"FREE"}
              handleClick={handleChangePassword}
            />
          </View>
          <Spacer marginTop={22} />
          <ThemedText style={styles.basic}>Legal</ThemedText>
          <Spacer marginTop={20} />

          <View style={styles.cardMainWrap}>
            <RowTitle
              title={"Privacy Policy"}
              value={""}
              handleClick={handleName}
            />

            <RowTitle
              borderBottomWidth={0}
              title={"Terms and Condition"}
              value={""}
              handleClick={handleEmail}
            />
          </View>
          <Spacer marginTop={22} />

          <View style={styles.cardMainWrap}>
            <Pressable style={styles.deleteButton}>
              <Ionicons name="trash" size={20} color={"#F64242"} />
              <ThemedText style={[styles.rowTitle, { color: "#F64242" }]}>
                Delete Account
              </ThemedText>
            </Pressable>
          </View>

          <Spacer marginTop={22} />

          <Pressable style={styles.logoutButton}>
            <MaterialIcons name="logout" size={24} color="#fff" />
            <ThemedText style={styles.logoutText}>Log Out</ThemedText>
          </Pressable>

          <Spacer marginTop={41} />
        </ScrollView>
      </FormSheet>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  mainWrap: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "stretch",
  },

  mainWrapper: {
    zIndex: 9,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    marginTop: 0,
    width: "100%",
    height: "100%",
    // shadowColor: "#000",
    // shadowRadius: 40,
    // shadowOffset: {
    //   width: 0,
    //   height: -20,
    // },
    // shadowOpacity: 0.2,
    backgroundColor: "#f5f5f5",
  },
  innerWrap: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
    zIndex: 8,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
  topLine: {
    width: 100,
    height: 7,
    backgroundColor: "#EEEEEE",
    alignSelf: "center",
    marginTop: 10,
  },
  roundedImageView: {
    width: responsiveWidth(123),
    height: responsiveHeight(123),
    borderRadius: 123,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  basic: {
    fontFamily: fonts.primary.primaryRegular,
    color: "#77777",
    fontSize: responsiveFontSize(15),
    lineHeight: responsiveLineHeight(15, 20),
  },
  cardMainWrap: {
    padding: 10,
    borderRadius: 17,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  cardRowTitleValue: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  rowTitle: {
    fontFamily: fonts.primary.primaryMedium,
    fontWeight: "500",
    fontSize: responsiveFontSize(15),
    lineHeight: responsiveLineHeight(15, 20),
    color: "#000",
  },
  value: {
    fontFamily: fonts.secondary.secondaryRegular,
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveLineHeight(16, 21),
    color: "#696767",
  },
  deleteButton: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    gap: 10,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 50,
    height: 60,
    gap: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: responsiveFontSize(18),
    lineHeight: responsiveLineHeight(18, 23),
    fontFamily: fonts.primary.primaryMedium,
  },
});
