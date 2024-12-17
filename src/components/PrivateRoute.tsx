import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
	children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
		null
	);

	useEffect(() => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

		const checkAuth = async () => {
			try {
				const response = await fetch(
					`${backendUrl}/api/check-auth`,
					{
						credentials: "include",
					}
				);
				setIsAuthenticated(response.ok);
			} catch (error) {
				console.error("Auth check error:", error);
				setIsAuthenticated(false);
			}
		};

		checkAuth();
	}, []);

	if (isAuthenticated === null) {
		return <div>Loading...</div>;
	}

	return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
