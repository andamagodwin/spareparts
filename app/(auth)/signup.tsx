import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useDispatch } from 'react-redux';
// import { setUser } from '../slices/authSlice';
// import { login } from '../services/authService';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // try {
    //   const data = await login(email, password);
    //   dispatch(setUser(data));
    // } catch (err: any) {
    //   setError(err.message);
    // }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Signup" onPress={handleLogin} />
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default LoginScreen;
