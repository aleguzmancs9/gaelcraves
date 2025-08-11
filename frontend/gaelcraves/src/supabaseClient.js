// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dklnsndxjdqvfejbuoxl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrbG5zbmR4amRxdmZlamJ1b3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3OTI3ODAsImV4cCI6MjA3MDM2ODc4MH0.haPNUognHiRXDPTINII1co84I7omu6e5Aia-s6rl8wM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)