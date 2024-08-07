import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import { LoadSpinner } from "../../shared";
import NavBar from "./NavBar";
import useApi from "../../hooks/useApi";
import "./styles.css";
import { UserContext } from "../../contexts";
import { backend_url } from "../../constants";

export default function BotLayout() {
  let navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const { verifyToken, refreshToken } = useApi();

  useEffect(() => {
    const refresh = async () => {
      setIsLoading(true);
      const tokenIsValid = await verifyToken();

      if (!tokenIsValid) {
        await refreshToken();
      }

      setIsLoading(false);
    };

    const authorizeUser = async () => {
      setIsLoading(true);

      await fetch(`${backend_url}/auth/telegram/botapp`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({
          initData: window.Telegram.WebApp.initData,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          throw new Error("Bot user auth error");
        })
        .then((data) => {
          localStorage.setItem("tokens", JSON.stringify(data));
          setUser(data);
        })
        .catch((error) => alert(error.toString()));

      setIsLoading(false);
    };

    const seamlessAuthorize = async (body) => {
      setIsLoading(true);

      await fetch(`${backend_url}/auth/telegram/seamless`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          throw new Error("Bot seamless auth error");
        })
        .then((data) => {
          localStorage.setItem("tokens", JSON.stringify(data));
          setUser(data);
        })
        .catch((error) => alert(error));

      setIsLoading(false);
    };

    // for testing only
    alert(window?.Telegram?.WebApp?.initData);
    alert(JSON.stringify(user));

    if (window.Telegram.WebApp.initData.length == 0) {
      const params = new URLSearchParams(window.location.search);

      if (params.get("hash") && params.get("id")) {
        seamlessAuthorize({ id: params.get("id"), hash: params.get("hash") });
        return;
      } else {
        navigate("/");
        return;
      }
    }

    if (!user) {
      authorizeUser();
      return;
    } else {
      refresh();
    }
  }, []);

  return (
    <Container className="p-0" fluid>
      {isLoading ? (
        <LoadSpinner />
      ) : (
        <>
          <NavBar />
          <Outlet />
        </>
      )}
    </Container>
  );
}
