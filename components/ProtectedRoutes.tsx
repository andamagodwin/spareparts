import { RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { loadUserFromStorage } from '@/redux/slices/authSlice';

export default function ProtectRoutes({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  useEffect(() => {
    if (isMounted && !user) { 
      router.replace('/login'); 
    }
  }, [isMounted,user, router]); 

  return children
}