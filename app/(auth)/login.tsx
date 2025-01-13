import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import { login } from '../../services/authService';

const LoginScreen: React.FC = () => {
    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    
    // console.log({email, password})
    // Alert.alert("Login")
    
    try {
      const data = await login(email, password);
      dispatch(setUser(data));
      console.log(data);
      router.replace('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Text>Already have an account? <Link href="/signup">Signup</Link></Text>
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default LoginScreen;
