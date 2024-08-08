import { createClient } from '@supabase/supabase-js'

const supaclient = createClient("https://omaevyeagizdgbethjwm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tYWV2eWVhZ2l6ZGdiZXRoandtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxMDQ5MjcsImV4cCI6MjAzODY4MDkyN30.AFAIAhXnH6_CFVxJCcdlPjtv5hoSQIyvkDJo2teIntg");

export { supaclient };