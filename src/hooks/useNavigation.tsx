import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();
  const goToPage = (path: string) => {
    navigate(path);
  };

  return { goToPage };
};
