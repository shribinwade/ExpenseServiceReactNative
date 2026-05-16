import CustomButton from "@/components/CustomComponents/CustomButton";
import MyButton from "@/components/navigation/MyButton";
import { useRoute } from "@react-navigation/native";
import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {

  const router = useRouter()
  const onContinue = ()=>{
      router.navigate('/Login');
  }
  return (
    <View style={{flex:1, justifyContent:"flex-end",alignItems:"center",marginBottom:60}}>
            <CustomButton title="Continue" onPress={onContinue}></CustomButton>
    </View>
  );
}
