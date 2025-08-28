import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, getCurrentSession, signOut as supabaseSignOut } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { session, error } = await getCurrentSession()
      if (!error && session) {
        setSession(session)
        setUser(session.user)
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session)
        setSession(session)
        setUser(session?.user || null)
        setLoading(false)
        
        // Store session token in localStorage for API calls
        if (session?.access_token) {
          localStorage.setItem('supabase_token', session.access_token)
        } else {
          localStorage.removeItem('supabase_token')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    const result = await supabaseSignOut()
    if (!result.error) {
      setUser(null)
      setSession(null)
      localStorage.removeItem('supabase_token')
    }
    return result
  }

  const value = {
    user,
    session,
    loading,
    signOut,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
