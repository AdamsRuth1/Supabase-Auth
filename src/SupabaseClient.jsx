
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jpdjxmkwmiagjcprsxxj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwZGp4bWt3bWlhZ2pjcHJzeHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3NzAxNTYsImV4cCI6MjA0MjM0NjE1Nn0.9zC4Oefn---jb3AXvRW7WOXZ1x-LJyy8nBbZHghfyoc';
export const supabase = createClient(supabaseUrl, supabaseKey)