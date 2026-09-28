export function authConfigured(){return !!(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)}
export function backendConfigured(){return authConfigured()&&!!process.env.SUPABASE_SECRET_KEY}
