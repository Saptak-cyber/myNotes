import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, signOut as supabaseSignOut } from '../lib/supabase'

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
    // Clean up OAuth tokens from URL immediately
    if (window.location.hash.includes('access_token')) {
      console.log('OAuth callback detected, processing tokens...')
      // Small delay to ensure Supabase processes the tokens first
      setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname)
        console.log('URL cleaned up')
      }, 100)
    }

    // Get initial session and handle OAuth callback
    // const getInitialSession = async () => {
    //   try {
    //     // This automatically processes OAuth tokens in URL
    //     if (window.location.hash.includes('access_token')) {
    //         await supabase.auth.exchangeCodeForSession(window.location.hash)
    //       }
    //     const { data: { session }, error } = await supabase.auth.getSession()
    //     console.log('Getting session:', { session: !!session, error })
        
    //     if (!error && session) {
    //       setSession(session)
    //       setUser(session.user)
    //       console.log('User authenticated:', session.user.email)
    //     }
    //   } catch (error) {
    //     console.error('Error getting session:', error)
    //   } finally {
    //     setLoading(false)
    //   }
    // }
    const getInitialSession = async () => {
      try {
        if (window.location.hash.includes('access_token')) {
          await supabase.auth.exchangeCodeForSession(window.location.hash)
          window.history.replaceState({}, document.title, window.location.pathname)
        }
    
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          setSession(session)
          setUser(session.user)
        }
      } catch (err) {
        console.error('OAuth handling error', err)
      } finally {
        setLoading(false)
      }
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
          
          // Show success message for sign in
          if (event === 'SIGNED_IN') {
            // Import toast dynamically to avoid issues
            import('react-hot-toast').then(({ default: toast }) => {
              toast.success(`Welcome back, ${session.user.user_metadata?.full_name || session.user.email}!`)
            })
          }
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
