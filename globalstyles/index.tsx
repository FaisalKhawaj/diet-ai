import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  mainWrap: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: "center",
    backgroundColor:'#fff',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  overflowBackButton:{
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    position:'absolute',
    left:0,
    zIndex:10,
    overflow:'visible'
  },
  screenCenterHeaderTitle: {
    flex: 1,
    fontFamily: fonts.primary.primaryBold,
    fontSize: responsiveFontSize(25),
    lineHeight: responsiveLineHeight(25, 30)
    , textAlign: 'center'
  },
  row: {
    flexDirection: 'row', alignItems: 'center'
  },
});
