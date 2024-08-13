import { createClient } from '@supabase/supabase-js'
const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
const url = "http://127.0.0.1:54321"
// const supaclient = createClient("https://omaevyeagizdgbethjwm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tYWV2eWVhZ2l6ZGdiZXRoandtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxMDQ5MjcsImV4cCI6MjAzODY4MDkyN30.AFAIAhXnH6_CFVxJCcdlPjtv5hoSQIyvkDJo2teIntg");
const supaclient = createClient(url, anon_key);
export { supaclient };