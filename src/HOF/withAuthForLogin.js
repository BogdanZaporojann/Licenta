import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const withAuthRedirect = (WrappedComponent) => {
  const RedirectComponent = (props) => {
    const navigate = useNavigate();
    const isAuth = props.username;

    useEffect(() => {
      if (isAuth) {
        navigate("/personalPage");
      }
    }, [isAuth, navigate]);

    if (isAuth) return null;
    return <WrappedComponent {...props} />;
  };
  return RedirectComponent;
};

export default withAuthRedirect;