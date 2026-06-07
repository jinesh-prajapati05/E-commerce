import { Navigate } from "react-router"
import useAuthUser from "../hooks/authUser"

export default function Protected({ children }) {

    const {user, loading } = useAuthUser()

    if (loading) {
        return (
            <div>
                <h1>Loading....</h1>
            </div>
        )
    }

    if (!user) {
        return <Navigate to={"/login"} />
    }

  return children
}
