import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import { LogOut, User } from 'lucide-react'

const UserMenu = () => {
  const { user, signOut } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    try {
      const { error } = await signOut()
      if (error) {
        toast.error('Failed to sign out')
      } else {
        toast.success('Signed out successfully')
      }
    } catch (err) {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        {user.user_metadata?.avatar_url ? (
          <div className="w-8 rounded-full">
            <img
              alt="User avatar"
              src={user.user_metadata.avatar_url}
              className="rounded-full"
            />
          </div>
        ) : (
          <User className="w-5 h-5" />
        )}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow border border-base-content/10"
      >
        <li className="menu-title">
          <span className="text-xs">{user.user_metadata?.full_name || user.email}</span>
        </li>
        <li>
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            Sign out
          </button>
        </li>
      </ul>
    </div>
  )
}

export default UserMenu
