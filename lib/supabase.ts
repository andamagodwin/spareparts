import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl ="https://nzxfozqioctmkkxnhpxr.supabase.co"
const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56eGZvenFpb2N0bWtreG5ocHhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NjQ1MzksImV4cCI6MjA1MTI0MDUzOX0.hCMpRhPNNKsUHrPp-D7TYvjujEm4FeqJP03NZNEZFGQ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})