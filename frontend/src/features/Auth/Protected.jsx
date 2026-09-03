import React from "react";
import { useAuth } from "../Auth/hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoadingScreen from "../../components/common/LoadingScreen";

export default function Protected({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Verifying candidate session..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}