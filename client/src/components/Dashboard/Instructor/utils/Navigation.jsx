import { useNavigate } from "react-router-dom";

export const handleNavigation = (navigate, path) => {
    navigate(`/Dashboard/instructor/${path}`);
}