import React from 'react';
import CreateNewPasswordScreen from '@/screens/create-new-password';
import LoginScreen from '@/screens/login';
import RegisterScreen from '@/screens/register';
import ResetPasswordScreen from '@/screens/reset-password';
import VerifyOtpScreen from '@/screens/verify-otp';
import WelcomeScreen from '@/screens/welcome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UnauthenticatedParamList } from '../interfaces/navigation.interface';

const Stack = createNativeStackNavigator<UnauthenticatedParamList>();

const Unauthenticated = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Unauthenticated;
