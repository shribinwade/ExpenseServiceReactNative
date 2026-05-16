import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import CustomBox from '@/components/CustomComponents/CustomBox'
import CustomText from '@/components/CustomComponents/CustomText'
import Ionicons from '@expo/vector-icons/build/Ionicons'
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';



const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .trim()
    .regex(/[A-Za-z]/, "Username must contain at least one letter"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot exceed 50 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]+$/,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    ),
});

type inputs = z.infer<typeof loginSchema>


const Login = () => {


  const [showPassword, setShowPassword] = useState(false)


  const router = useRouter();


  const onLogin = () => {
    router.navigate("/Signup")
  }


  const { control, handleSubmit, formState: { errors } } = useForm<inputs>(
    {
      resolver: zodResolver(loginSchema), defaultValues: {
        username: '',
        password: ''
      }
    }
  );


  const submitForm: SubmitHandler<inputs> = (data) => {
    console.log(data);
  }



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.loginContainer}>

            <CustomBox style={loginBox}>
              <CustomText style={styles.heading}>Login</CustomText>

              {/* Username */}
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Username"
                    style={styles.textInput}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholderTextColor="#888"
                  />
                )}
              />
              {errors.username && (
                <CustomText style={styles.error}>
                  {errors.username.message}
                </CustomText>
              )}


              <View style={styles.passwordContainer}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Password"
                      style={styles.passwordInput}
                      secureTextEntry={!showPassword}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholderTextColor="#888"
                    />
                  )}
                />


                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={
                      showPassword
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={22}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <CustomText style={styles.error}>
                  {errors.password.message}
                </CustomText>
              )}
            </CustomBox>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(submitForm)} activeOpacity={0.8}>
              <CustomBox style={DarkButtonBOX}>
                <CustomText style={{ textAlign: 'center', color: 'white' }}>Log In</CustomText>
              </CustomBox>
            </TouchableOpacity>

            <CustomText style={{ marginTop: 10 }}>Don't have an account? <Link style={{ color: '#0080ff' }} href={'/Signup'}>Sign Up Here</Link></CustomText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default Login

const styles = StyleSheet.create({

  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  // button:{flex:1,justifyContent:"center",alignItems:"center"},
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  textInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    width: '100%',
    color: 'black'
  },
  button: {
    margin: 5,
    width: '100%',
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: '100%'
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    color: 'black'
  },
  error: {
    color: 'red'
  }
})

const loginBox = {
  mainBox: {
    borderColor: "black",
    backgroundColor: "#fff",
    borderwidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  shadowBox: {
    backgroundColor: "gray",
    opacity: 0.5,
    borderRadius: 10
  }
}

const buttonBOX = {
  mainBox: {
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  shadowBox: {
    backgroundColor: 'gray',
    opacity: 0.5,
    borderRadius: 10
  }
}

const DarkButtonBOX = {
  mainBox: {
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  shadowBox: {
    backgroundColor: 'gray',
    opacity: 0.5,
    borderRadius: 10
  },

}
