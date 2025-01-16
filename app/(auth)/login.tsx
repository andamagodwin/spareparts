import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import { login } from '../../services/authService';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { RootState } from '@/redux/store';
import { startLoading, stopLoading, setLoading } from '@/redux/slices/loadingSlice';


const LoginScreen: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  // const dispatch = useDispatch();

    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(startLoading());
    
    // console.log({email, password})
    // Alert.alert("Login")
    
    try {
      const data = await login(email, password);
      dispatch(setUser(data));
      dispatch(stopLoading());
      console.log(data);
      router.replace('/');
    } catch (err: any) {
      dispatch(stopLoading());
      setError(err.message);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginHeader}>
        <Text style={styles.loginHeaderTitle}>Login here</Text>
        <Text style= {styles.loginHeaderSubtitle}>Welcome back! You have been missed</Text>
      </View>
      <View style = {styles.loginForm}>
        <View style={styles.FormGroup}>
          <MaterialCommunityIcons name="email-outline" size={24} color="#1F41BB" />
          <TextInput placeholder="Email" style={styles.TextInput} value={email} onChangeText={setEmail} />
        </View>
        <View style={styles.FormGroup}>
          <Feather name="lock" size={24} color="#1F41BB" />
          <TextInput placeholder="Password" style={styles.TextInput} value={password} onChangeText={setPassword} secureTextEntry />
        </View>
        <TouchableOpacity
          style={[styles.loginButton, isLoading ? styles.loadingButton : null]}
          onPress={handleLogin}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {/* <Button title="Login" onPress={handleLogin} /> */}
        <Text>Already have an account? <Link style={{color:'#1F41BB'}} href="/signup">Signup</Link></Text>
        
      </View>
      {/* <View style={styles.socials}>
        <Text style={styles.socialsHeader}>Or connect with</Text>
        <View style={styles.socialIcons}>
          <View style={styles.socialIconContainer}>
            <MaterialCommunityIcons name="facebook" size={28} color="#fff" />
          </View>
          <View style={styles.socialIconContainer}>
            <MaterialCommunityIcons name="google" size={24} color="#fff" />
          </View>
          
          
        </View>

      </View> */}
     
    </View>
  );
};




const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFFFFF'
  },
  loginForm:{
    width:'80%',
    height: '40%',
    display:'flex',
    justifyContent:'space-evenly',
    alignItems:'center',
    paddingHorizontal:1,
    marginBottom:10
    // backgroundColor: 'red'
  },
  loginHeader: {
    width:'80%',
    height: '20%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:1,
    // backgroundColor: 'blue',
    marginBottom:10,
    padding:10
  },
  loginHeaderTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#1F41BB'
  },
  loginHeaderSubtitle: {
    fontSize: 20,
    color: '#000',
    display:'flex',
    textAlign:'center'
  },
  TextInput: {
    width: '80%',
    height: 55,
    // borderColor: '#1F41BB',
    // borderRadius: 10,
    // marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor:'#F1F4FF'
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1F41BB',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color:'#ffffff',
    elevation:2
  },
  loadingButton: {
    backgroundColor: '#9ea8ba',
  },
  loadingText: {
    color: '#000',
  },
  loginText:{
    color:'#ffff'
  },
  errorText:{
    color:'red'
  },
  FormGroup:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F1F4FF',
    borderRadius:10
  },
  socials: {
    width:'90%',
    height: '15%',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'column',
    paddingHorizontal:10,
    // backgroundColor:'red'
  },
  socialIcons: {
    width:'60%',
    height:'50%',
    // backgroundColor:'blue',
    display:'flex',
    justifyContent:'space-evenly',
    alignItems:'center',
    flexDirection:'row'
  },
  socialsHeader:{
    color: '#1F41BB',
    fontSize:16
  },
  socialIconContainer: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    // width:60,
    backgroundColor:'#1F41BB',
    // height:60,
    padding:10,
    borderRadius:10
  }
});



export default LoginScreen;
