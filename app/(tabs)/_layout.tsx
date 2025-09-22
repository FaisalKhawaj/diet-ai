import { router, Tabs } from 'expo-router';
import React from 'react';

import { CarrotOutlined, DocRec, Spoon } from '@/assets/images';
import DietAIPopup from '@/components/diet-ai-popup';
import { HapticTab } from '@/components/haptic-tab';
import RecipeAIPopup from '@/components/recipe-ai-popup';
import { Colors } from '@/constants/theme';
import { useRecipe } from '@/context/recipecontext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { fonts } from '@/hooks/useCacheResources';
import { responsiveFontSize, responsiveLineHeight } from '@/utils';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Platform, Pressable, StyleSheet, View } from 'react-native';




export default function TabLayout() {
  const colorScheme = useColorScheme();
const { showRecipeAI,
  showAddRecipe,
  showDietRecipe,
  setShowDietRecipe,
  setShowAddRecipe,
  setShowRecipeAI}=useRecipe();

  console.log('showRecipeAI>:',showRecipeAI);
console.log('showDietRecipe',showDietRecipe)
  const PlusTabButton = (props: any) => {
    // forward props so RN/React Navigation can manage focus/aria etc.
    const { onPress, ...rest } = props;
    return (
      <View style={styles.plusWrap} pointerEvents="box-none">
        <Pressable
          {...rest}
          hitSlop={12}
          onPress={() => {
            // don’t navigate to /add, just open your popup
            console.log('onPress')
            setShowAddRecipe(true);
          }}
          style={({ pressed }) => [
            styles.roundedPlusInnerView,
            pressed && { transform: [{ scale: 0.98 }] },
          ]}
        >
          <FontAwesome5 name="plus" size={20} color="#fff" />
        </Pressable>
      </View>
    );
  };

  return (
    <>
 {!!showRecipeAI&&<RecipeAIPopup />}
 {!!showDietRecipe&&<DietAIPopup />}
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor:'#000',
        headerShown: true,
        headerShadowVisible:false,
        tabBarButton: HapticTab,
        tabBarStyle:{
          borderTopLeftRadius:30,
          borderTopRightRadius:30,
          height: 86,          // <-- give enough height so the + is fully tappable
          paddingTop: 8,  
        },
    
      }}
      screenListeners={{
        tabPress: (e:any) => {
          console.log('screenListeners e',e);
          const parts = e.target.split("-")[0];
          if (parts === "add") {
            setShowAddRecipe(true);
          }
          else if(parts===''){

          }
          // e.preventDefault();
          // open your modal here if you didn't in PlusTabButton onPress
          // router.push('/(modals)/quick-add');
        },
      }}
      >
        <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          headerTitleStyle:styles.headerTitleStyle,
          headerTitleAlign:'center',
          headerStyle: { backgroundColor: '#f7f7f7' }, // <-- header bg color

          tabBarIcon: ({ color }) => <Image source={DocRec} style={[styles.tabImageStyle,{
            tintColor:color,
          }]}  />,
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Diet AI',
          headerShown:false,
          tabBarIcon: ({ color }) => <Image source={CarrotOutlined} style={[styles.tabImageStyle,{
            tintColor:color,
          }]}  />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();      // block navigation to /add
            setShowRecipeAI(true);   // open popup
          },
        }}
    
      />


<Tabs.Screen
    name="add"                  // create app/(tabs)/add.tsx (can be an empty component)
    options={{
      title: '',
      headerShown: false,
      tabBarLabel: () => null,  // no label under the +
      // Override the default button for this one tab:
      tabBarButton: () => <PlusTabButton />,
    }}
    
   
  />

      <Tabs.Screen
        name="recipe-ai"
        options={{
          title: 'Receipe AI',
          tabBarIcon: ({ color }) => <Image source={Spoon} style={[styles.tabImageStyle,{
            tintColor:color,
          }]}  />,
        }}
         listeners={{
      tabPress: (e) => {
        e.preventDefault();
        setShowRecipeAI(true);
      },
    }}
      />


<Tabs.Screen
        name="settings"
        
        options={{
          title: 'Settings',
          
          headerShown:false,
          tabBarIcon: ({ color }) =><Ionicons name="settings-outline" size={24} color={color} />
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();                  // don't navigate to the tab file
            setShowRecipeAI(false);
            setShowDietRecipe(false);
            setShowAddRecipe(false);
            router.push("/(modals)/settings");   // open your formSheet modal
          },
        }}
      />
    </Tabs>
    </>
  );
}

const styles=StyleSheet.create({
  headerTitleStyle:{
    fontFamily:fonts.primary.primaryBold,
    fontSize:responsiveFontSize(25),
    lineHeight:responsiveLineHeight(25,30)
  },
  tabImageStyle:{
    width:21,
    height:21,

  },
  plusWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -18, // lifts it slightly above other icons
  },
  roundedPlusInnerView: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  rouundedPlusButton:{
    top: Platform.select({ ios: -25, android: -22 }),
    alignItems: "center",
    justifyContent: "center",

  },
  // roundedPlusInnerView:{
  //   width: 56,
  //   height: 56,
  //   borderRadius: 28,
  //   backgroundColor: "#000",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   // soft shadow
  //   shadowColor: "#000",
  //   shadowOpacity: 0.25,
  //   shadowRadius: 8,
  //   shadowOffset: { width: 0, height: 4 },
  //   elevation: 6,
  // }
})
