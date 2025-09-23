// app/screens/Paywall.tsx
import { Camera, CupDietAi, DocRec, Img3, Img5, Speed } from "@/assets/images";
import { Spacer } from "@/components/Spacer";
import StepIndicator from "@/components/StepIndicator";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";

import {
    Image,
    ImageSourcePropType,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- replace with your real images ---

const DOT = 40;           // slightly larger to match the mock
const SPINE = 4;
const LIME = "#d0fd6b";
const ICON = Math.round(DOT * 0.55); // keep the glyph nicely centered

type Plan = "weekly" | "monthly" | "yearly";

export default function Paywall() {
    const [selected, setSelected] = useState<Plan>("weekly");

    const onContinue = () => {
        // TODO: handle purchase flow for `selected`
        console.log("Buy:", selected);
        router.push('/(tabs)')
    };

      const items = [
        { icon: "bag-handle", img:CupDietAi, title: "Diet AI",        subtitle: "Personalized daily meal plans every week" },
        { icon: "book",     img:DocRec,     title: "Recipe AI",      subtitle: "Generated Unlimited personalized Food Recipes" },
        { icon: "bar-chart", img:Speed,   title: "Calorie Tracker",subtitle: "Follow up your calories, proteins, carbs and fats" },
        { icon: "camera",  img:Camera,      title: "Food Scanner",   subtitle: "Snap a photo of any food to get calories" },
      ];
      
      

    return (
        <SafeAreaView edges={['bottom']} style={{ paddingHorizontal: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
                {/* Header collage */}
                <View style={styles.heroWrap}>

                <LinearGradient
    colors={["rgba(255,255,255,0)", "#FFFFFF"]}
    start={{ x: 0.5, y: 0 }}   // top center
    end={{ x: 0.5, y: 1 }}     // bottom center
    style={StyleSheet.absoluteFill}
  />
                    <Image source={Img3 as ImageSourcePropType} style={[styles.heroImg, styles.imgA]} />
                    <Image source={Img3 as ImageSourcePropType} style={[styles.heroImg, styles.imgB]} />
                    <Image source={Img5 as ImageSourcePropType} style={[styles.heroImg, styles.imgC]} />
                    <Image source={Img3 as ImageSourcePropType} style={[styles.heroImg, styles.imgD]} />



                    {/* Close */}
                    <TouchableOpacity style={styles.closeBtn} onPress={() => { /* dismiss */ }}>
                        <Ionicons name="close" size={20} color="#000" />
                    </TouchableOpacity>

                    {/* Restore */}
                    <TouchableOpacity style={styles.restoreBtn} onPress={() => { /* restore purchases */ }}>
                        <Text style={styles.restoreText}>Restore</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>
                    {/* Title */}
                    <View style={styles.titleRow}>
                        <ThemedText style={styles.title}>Diet AI</ThemedText>
                        <View style={styles.proBadge}>
                            <Ionicons name='color-wand-outline' size={14} color="#F5B617" />
                            <Text style={styles.proTxt}>Pro</Text>
                        </View>
                    </View>

                
             
             <View style={{
              
                    marginVertical: 50,
                    paddingHorizontal: 20,
                  
             }}>

                    <StepIndicator
  direction="vertical"
  stepCount={items.length}
  currentPosition={items.length - 1}
  customStyles={{
    stepIndicatorSize: DOT,
    currentStepIndicatorSize: DOT,

    // same width for finished/unfinished so the spine looks continuous
    separatorStrokeWidth: 8,
    separatorStrokeFinishedWidth: 8,
    separatorStrokeUnfinishedWidth: 8,

    stepStrokeWidth: 0,
    currentStepStrokeWidth: 0,

    separatorFinishedColor: LIME,
    separatorUnFinishedColor: LIME,
    stepIndicatorFinishedColor: LIME,
    stepIndicatorUnFinishedColor: LIME,
    stepIndicatorCurrentColor: LIME,

    // hide numbers—we’ll render an icon instead
    stepIndicatorLabelFontSize: 30,
    currentStepIndicatorLabelFontSize: 40,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelAlign: 'flex-start',
    // labelSize: 15,
    labelColor: '#767676',
    currentStepLabelColor: '#767676',
  }}
  renderStepIndicator={({ position }) => (
    <Image source={items[position].img} style={{width:20,height:20}} />
  )}
  labels={items.map(i => i.title)}
  renderLabel={({ position }) => (
    <View style={{ paddingLeft: 12, paddingRight: 8, flex: 1 }}>
      <Text style={styles.progressTitle}>{items[position].title}</Text>
      <Text style={styles.subtitle}>{items[position].subtitle}</Text>
    </View>
  )}
/>
</View>
               

          


          

          

                    <Spacer marginTop={8} />

                    {/* Plans */}
                    <PlanCard
                        label="Weekly"
                        right="$5.00 per Month"
                        badge={{ text: "1 Week Trial", tone: "lime" }}
                        active={selected === "weekly"}
                        onPress={() => setSelected("weekly")}
                    />
                    <Spacer marginTop={10} />
                    <PlanCard
                        label="Monthly"
                        right="$4.00 per Month"
                        active={selected === "monthly"}
                        onPress={() => setSelected("monthly")}
                    />
                    <Spacer marginTop={10} />
                    <PlanCard
                        label="Yearly"
                        right="$2.5 per Month"
                        badge={{ text: "Best Deal", tone: "dark" }}
                        active={selected === "yearly"}
                        onPress={() => setSelected("yearly")}
                    />

                    <Spacer marginTop={18} />

                    {/* CTA */}
                    <TouchableOpacity activeOpacity={0.9} style={styles.cta} onPress={onContinue}>
                        <Text style={styles.ctaText}>Let’s start the journey</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


function PlanCard({
    label,
    right,
    badge,
    active,
    onPress,
}: {
    label: string;
    right: string;
    badge?: { text: string; tone: "lime" | "dark" };
    active?: boolean;
    onPress?: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.9}
            style={[
                styles.planCard,
                active && { borderColor: Colors.light.primaryButton },
            ]}
        >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Text style={styles.planTitle}>{label}</Text>
                {badge && (
                    <View
                        style={[
                            styles.badge,
                            badge.tone === "lime" ? styles.badgeLime : styles.badgeDark,
                        ]}
                    >
                        <Text style={[styles.badgeText,{ color: "#fff" }]}>
                            {badge.text}
                        </Text>
                    </View>
                )}
            </View>

            <Text style={styles.planRight}>{right}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    heroContainer: {
        height: 320, // match your hero section height
        position: "relative",
      },
    
      featureRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
      },
       // left column that draws the spine + dot
  timelineCol: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: LIME,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,  
  },
  timelineDot2: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: LIME,
    alignItems: "center",
    justifyContent: "center",
  },
  timelineConnectorTop: {
    position: "absolute",
    top: 0,
    bottom: DOT / 2,
    width: SPINE,
    backgroundColor: LIME,
    // backgroundColor:'red',
    borderRadius: SPINE / 2,
  },
  timelineConnectorBottom: {
    position: "absolute",
    top: DOT / 2,
    bottom: 0,
    width: SPINE,
    backgroundColor: LIME,
    borderRadius: SPINE / 2,
  },
//   featureTitle: {
//     fontFamily: fonts.primary.primaryBold,
//     fontSize: 16,
//     color: "#0B0B0B",
// },
featureSubtitle: {
    color: "#767676",
    marginTop: 2,
    fontSize: 13,
},
  featureTitle: {
    fontFamily: fonts.primary.primaryBold,
    fontSize: 16,
    color: "#0B0B0B",
  },
 
    heroWrap: {
        height: 220,
        justifyContent: "center",
    },
    heroImg: {
        position: "absolute",
        width: 200,
        height: 220,
        borderRadius: 18,
    },
    imgA: {
        position: "absolute",
        width: 213.6,
        height: 300.4,
        top: -21.6,
        left: -128.4,
        borderRadius: 20,
        transform: [{ rotate: "-9.3deg" }],
    },
    imgB: {
        position: "absolute",
        width: 200,
        height: 309.3,
        top: -262.7,
        left: 56.0,
        borderRadius: 20,
        transform: [{ rotate: "-9.3deg" }],
      },
      imgC: {
        position: "absolute",
        width: 200,
        height: 220.9,
        top: 48.8,
        left: 106.9,
        borderRadius: 20,
        transform: [{ rotate: "-9.3deg" }],
      },
    imgD: { 
        position: "absolute",
        width: 213.6,
        height: 320.4,
        top: -95.9,
        left: 299.6,
        borderRadius: 20,
        transform: [{ rotate: "-9.3deg" }],
    },

    closeBtn: {
        position: "absolute",
        top: 40,
        left: 14,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    restoreBtn: {
        position: "absolute",
        top: 40,
        right: 14,
        paddingHorizontal: 12,
        paddingVertical: 6,
        // backgroundColor: "rgba(255,255,255,0.85)",
        borderRadius: 12,
    },
    restoreText: {
        fontSize:responsiveFontSize(18),
        lineHeight:responsiveLineHeight(18,24),
        fontFamily:fonts.primary.primaryBold,
        // fontWeight: "600",
        color: "#000",
    },

    body: {
        paddingHorizontal: 18,
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 12,
        justifyContent:'center'
    },
    title: {
        fontFamily: fonts.primary.primaryBold,
        fontSize: responsiveFontSize(32),
        lineHeight: responsiveLineHeight(32, 38),
        color: "#0B0B0B",
    },
progressTitle:{
    fontFamily: fonts.primary.primaryBold,
    fontSize: responsiveFontSize(18),
    lineHeight: responsiveLineHeight(18, 22),
    color: "#0B0B0B",
},
    proBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: "#000",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    proTxt: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },

    featuresRow: {
        flexDirection: "row",
        marginTop: 14,
    },
    timeline: {
        width: 28,
        alignItems: "center",
        position: "relative",
        paddingTop: 4,
    },
    timelineLine: {
        position: "absolute",
        top: 24,
        width: 4,
        height: 220,
        backgroundColor: "#D9FF48",
        borderRadius: 2,
    },
    timelineDot: {
        position: "absolute",
        left: 12,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#D9FF48",
    },
    featureItem: {
        flexDirection: "row",
        gap: 14,
        paddingVertical: 10,
    },
    featureIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#D9FF48",
        alignItems: "center",
        justifyContent: "center",
    },
   

    subtitle: {
        color: "#767676",
        marginTop: 2,
        fontFamily:fonts.secondary.secondaryRegular,
        fontSize:responsiveFontSize(14),
        lineHeight:responsiveLineHeight(14,19)
      },
   
    planCard: {
        borderWidth: 2,
        borderColor: "#EFEFEF",
        borderRadius: 18,
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...Platform.select({
            ios: { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
            android: { elevation: 3 },
        }),
    },
    planTitle: {
        fontFamily: fonts.primary.primaryBold,
        fontSize: 16,
        color: "#0B0B0B",
    },
    planRight: {
        color: "#4A4A4A",
        fontSize:responsiveFontSize(16),
        lineHeight:responsiveLineHeight(16,20),
        fontFamily:fonts.secondary.secondaryRegular,
       
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    badgeLime: { backgroundColor: "#12DCA5" },
    badgeDark: { backgroundColor: "#000" },
    badgeText: { fontSize: 11, fontWeight: "700", color: "#000" },

    cta: {
        marginTop: 16,
        backgroundColor: Colors.light.primaryButton,
        paddingVertical: 16,
        borderRadius: 28,
        alignItems: "center",
    },
    ctaText: {
        fontFamily: fonts.primary.primaryBold,
        fontSize: 16,
        color: "#000",
    },
    bottomBlur: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 120, // height of blurred area
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    
});
