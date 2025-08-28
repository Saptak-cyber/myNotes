const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Verify JWT token
const verifySupabaseToken = async (token) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error) {
      console.error('Error verifying token:', error)
      return { error }
    }
    
    return { user }
  } catch (error) {
    console.error('Error in verifySupabaseToken:', error)
    return { error }
  }
}

module.exports = {
  supabase,
  verifySupabaseToken
}
