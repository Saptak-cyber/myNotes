const { verifySupabaseToken } = require('../config/supabase')

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' })
    }
    
    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    
    const { user, error } = await verifySupabaseToken(token)
    
    if (error || !user) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }
    
    // Add user info to request object
    req.user = user
    next()
  } catch (error) {
    console.error('Authentication error:', error)
    res.status(500).json({ message: 'Authentication failed' })
  }
}

module.exports = {
  authenticateUser
}
