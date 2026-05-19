import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react'
import MyButton from '@/components/navigation/MyButton'
import CustomBox from '@/components/CustomComponents/CustomBox'
import CustomText from '@/components/CustomComponents/CustomText'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage'



const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username cannot exceed 20 characters")
      .trim()
      .regex(/^(?=.*[A-Za-z])[A-Za-z0-9_]+$/, {
        message:
          "Username must contain at least one letter and only letters, numbers, or underscores",
      }),

    firstname: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(30, "First name cannot exceed 30 characters")
      .trim()
      .regex(/^[A-Za-z]+$/, "First name should contain only letters"),

    lastname: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(30, "Last name cannot exceed 30 characters")
      .trim()
      .regex(/^[A-Za-z]+$/, "Last name should contain only letters"),

    phonenumber: z
      .string()
      .min(10, "Phone number must be 10 digits")
      .max(10, "Phone number must be 10 digits")
      .regex(/^[0-9]+$/, "Phone number must contain only numbers"),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password cannot exceed 50 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]+$/,
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupInputs = z.infer<typeof signupSchema>;



const Signup = () => {


  const { control, handleSubmit, formState: { errors } } = useForm<SignupInputs>(
    {
      resolver: zodResolver(signupSchema), defaultValues: {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      }
    }
  )

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const navigateToLoginScreen = async (data: { username: string; firstname: string; lastname: string; phonenumber: string; email: string; password: string; confirmPassword: string }) => {
    try {
      const payload = {
        username: data.username,
        first_name: data.firstname,
        last_name: data.lastname,
        email: data.email,
        password: data.password,
        phone_number: data.phonenumber,

      }
      const response = await fetch('http://192.168.0.236:9896/auth/v1/signup', {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      console.log(result);
      await AsyncStorage.setItem('accessToken', result.accessToken);
      await AsyncStorage.setItem('token', result.token);
    } catch (error) {
      console.log('Signup error:', error);
    }
  }


  // const submitForm: SubmitHandler<SignupInputs> = (data) => {
  //   console.log(data);
  //   navigateToLoginScreen(data);
  // }

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
          <View style={styles.signupContainer}>
            <CustomBox style={signUpBox}>
              <CustomText style={styles.signupText}>Register</CustomText>
              <CustomText style={styles.subtext}>Enter Your Details to Register</CustomText>

              {/* Add your signup form fields here */}
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

              {/* firstname */}
              <Controller
                control={control}
                name="firstname"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder='Firstname'
                    style={styles.textInput}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholderTextColor="#888"
                  />
                )}
              />
              {errors.firstname && (
                <CustomText style={styles.error}>
                  {errors.firstname.message}
                </CustomText>
              )}


              {/* lastname */}
              <Controller
                control={control}
                name="lastname"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder='Lastname'
                    style={styles.textInput}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholderTextColor="#888"
                  />
                )}
              />
              {errors.lastname && (
                <CustomText style={styles.error}>
                  {errors.lastname.message}
                </CustomText>
              )}

              {/* email */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder='Email'
                    style={styles.textInput}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholderTextColor="#888"
                  />
                )}
              />
              {errors.email && (
                <CustomText style={styles.error}>
                  {errors.email.message}
                </CustomText>
              )}

              {/* Phonenumber */}
              <Controller
                control={control}
                name="phonenumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder='PhoneNumber'
                    style={styles.textInput}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholderTextColor="#888"
                  />
                )}
              />
              {errors.phonenumber && (
                <CustomText style={styles.error}>
                  {errors.phonenumber.message}
                </CustomText>
              )}

              {/*password */}
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

              {/*Confirm password */}
              <View style={styles.passwordContainer}>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Confirm Password"
                      style={styles.passwordInput}
                      secureTextEntry={!showConfirmPassword}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholderTextColor="#888"
                    />
                  )}
                />

                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={
                      showConfirmPassword
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={22}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <CustomText style={styles.error}>
                  {errors.confirmPassword.message}
                </CustomText>
              )}

            </CustomBox>


            <TouchableOpacity style={styles.button} onPress={handleSubmit(navigateToLoginScreen)} activeOpacity={0.8}  >
              <CustomBox style={DarkButtonBOX}>
                <CustomText style={{ textAlign: "center", color: 'white' }}>Register</CustomText>
              </CustomBox>
            </TouchableOpacity>


            <CustomText style={{ marginTop: 10 }}>already have an account? <Link style={{ color: '#0080ff' }} href={'/Login'}>Log In</Link></CustomText>


          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default Signup

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  signupText: {
    textAlign: "left",
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold"
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

  darkbutton: {
    margin: 5,
    width: '100%',
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black'
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
  subtext: {
    textAlign: "left",
    fontSize: 14,
    marginBottom: 20,
    color: "gray"
  },
  error: {
    color: 'red'
  }

})


const textInputStyle = {
  text_white: {
    color: "white"
  }
}


const signUpBox = {
  mainBox: {
    backgroundColor: 'white',
    borderColor: 'black',
    padding: 20,
    width: "100%",
    maxWidth: 400,
    borderRadius: 10,
  },
  shadowBox: {
    backgroundColor: 'gray',
    position: 'absolute',
    top: 5,
    left: 5,
    width: "100%",
    maxWidth: 400,
    height: "100%",
    borderRadius: 10,
    zIndex: -1,
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
  },

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