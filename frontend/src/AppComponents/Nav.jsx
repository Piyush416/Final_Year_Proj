import { User } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Nav = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, checkAuth } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="w-full rounded-lg m-2">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto p-4">
        {/* Left Side */}
        <div className="text-lg font-semibold">
          Alumni: Bridging the Generation
        </div>

        {/* Right Side */}
        <div className="flex flex-row items-center text-lg space-x-3">
          <div>
            Welcome, {user?.email || "Guest"}
          </div>
          <div className="cursor-pointer transition-transform duration-200 hover:scale-110">
            <User />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
