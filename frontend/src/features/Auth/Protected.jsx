import {useAuth} from "../Auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
        const { user, loading } = useAuth();

        if (loading){
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )

        }
        if(!user){
         return <Navigate to="/login" replace />
            
        }
    return children;
}