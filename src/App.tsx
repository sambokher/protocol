import { ReactNode, useEffect, useState } from "react";
import {
  RouterProvider,
  useNavigate,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AppShell, Button, Header, Logo, Main, UserMenu } from "./junokit";
import { PBContext, PocketBaseProvider, usePocketBase } from "./contexts/PocketBase";
import Login from "./pages/Utils/Login";
import Error from "./pages/Utils/Error";
import DiscoverPage from "./pages/DiscoverPage";
import HeaderLink from "./junokit/HeaderLink";
import MyListings from "./pages/MyListings";
import Favorites from "./pages/Favorites";

type Props = {
  children: ReactNode;
};


function Root() {
  const { pb } = usePocketBase();
  const isLoggedIn = pb?.authStore.isValid;
  return isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />;
}

function Auth({ children }: Props) {
  const { pb } = usePocketBase();
  const isLoggedIn = pb?.authStore.isValid;
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppWrapper />}>
      <Route path="*" element={<Error error="NotFound" />} />
      <Route path="/" element={<Root />} errorElement={<Error />} />
      <Route path="login" element={<Login />} />
      <Route path="/home" element={ <Auth> <DiscoverPage /> </Auth>} />
      <Route path="/favorites" element={ <Auth> <Favorites /> </Auth>} />
      <Route path="/my-listings" element={ <Auth> <MyListings /> </Auth>} />
    </Route>,
  ),
  { basename: "/app" },
);

export default function App() {
  return (
    <PocketBaseProvider>
      <RouterProvider router={router} />
    </PocketBaseProvider>
  );
}

function AppWrapper() {
  const { pb } = usePocketBase() as PBContext;
  const navigate = useNavigate();
  function logOut() {
    pb?.authStore.clear();
    navigate("/");
  }

  const isLoggedIn = pb?.authStore.isValid;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const location = useLocation();
  const authPages = ['/login'];
  const isAuthPage = authPages.includes(location.pathname) || location.pathname === "*"


  return (
    <AppShell pageBackground="base-0">
      {/* Header */}
      {isAuthPage ? null : 
      <Header paddingX="24px" paddingY="8px" background="base-50">
        {renderHeaderContent({ pb, navigate, logOut, isLoggedIn, isMobile })}
      </Header>}
      <Main gap="24px" corners="md" 
        paddingX="24px" paddingY="32px" textSize="base"
        direction="flex-col" selfAlign="center"
        alignItems={isAuthPage ? "center" : "stretch"}
        justifyContent={isAuthPage ? "center" : "start"}
      >
        <Outlet />
      </Main>
    </AppShell>
  );
}


function renderHeaderContent({ pb, navigate, logOut, isLoggedIn, isMobile }) {

  return (
    <>
    <div className="flex flex-row flex-nowrap w-full max-w-full self-auto gap-5 items-center justify-start h-auto">
      <Logo size="20px" type={"logo"} color="normal" onClick={() => navigate("/")} />
      <div className="flex flex-row gap-2 items-center justify-start">
        <HeaderLink text="Home" onClick={() => navigate("/home")} />
        <HeaderLink text="Favorites" onClick={() => navigate("/favorites")} />
        <HeaderLink text="My Listings" onClick={() => navigate("/my-listings")} />
      </div>
    </div>

    <div className="flex flex-row flex-nowrap w-full max-w-full self-auto gap-6 items-center justify-end h-auto z-10">
      {isLoggedIn && (
        <UserMenu
          size="large"
          avatarPosition="right"
          avatarType={isMobile ? "image" : "initials"}
          name={isMobile ? "" : pb.authStore.model?.email}
        >
          <Button size="small" style="ghost" text="Log Out" onClick={logOut} />
        </UserMenu>
      )}
    </div>
    </>
  )
}