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
import { AppShell, Button, Header, Logo, Main, Search, UserMenu } from "./junokit";
import { PBContext, PocketBaseProvider, usePocketBase } from "./contexts/PocketBase";
import Login from "./pages/Utils/Login";
import OTP from "./pages/Utils/OTP";
import Error from "./pages/Utils/Error";
import DiscoverPage from "./pages/DiscoverPage";
import HeaderLink from "./junokit/HeaderLink";
import MyListings from "./pages/MyListings";
import Favorites from "./pages/Favorites";
import AddListing from "./pages/AddListing";
import Listing from "./pages/Listing";
import EditListing from "./pages/EditListing";
import Stripe from "./pages/Utils/Stripe";
import FeaturePanel from "./junokit/FeaturePanel";

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
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/home" element={ <Auth> <DiscoverPage /> </Auth>} />
      <Route path="/favorites" element={ <Auth> <Favorites /> </Auth>} />
      <Route path="/my-listings" element={ <Auth> <MyListings /> </Auth>} />
      <Route path="/add-listing" element={ <Auth> <AddListing /> </Auth>} />
      <Route path="/stripe" element={ <Stripe/>} />

      <Route path="/listing/:id" element={<Auth><Listing /></Auth>} />
      <Route path="/listing/:id/edit" element={<Auth><EditListing /></Auth>} />
    </Route>,
  ),
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
  const authPages = ['/login', '/otp'];
  const isAuthPage = authPages.includes(location.pathname) || location.pathname === "*"



  return (
    <AppShell pageBackground="base-0">
      {/* Header */}
      {isAuthPage ? null :
      <Header paddingX="24px" paddingY="8px"  width="1200" background={isMobile ? "base-50" : "base-0"} hasBorder={isMobile}>
        {renderHeaderContent({ pb, navigate, logOut, isLoggedIn, isMobile })}
      </Header>}
      {/*isAuthPage ? <FeaturePanel /> : null*/}
      <Main gap="24px" corners="md"  width="1200"
        paddingX="24px" paddingY="32px" textSize="base"
        direction="flex-col" selfAlign="center"
        alignItems={isAuthPage ? "center" : "stretch"}
        justifyContent={isAuthPage ? "between" : "start"}
      >
        <Outlet />
      </Main>
    </AppShell>
  );
}


function renderHeaderContent({ pb, navigate, logOut, isLoggedIn, isMobile }) {
  const userEmailAddress = pb.authStore.model?.email;
  const isAddListingPage = location.pathname === "/add-listing";
  
  return (
    <>
    <div className="flex flex-row flex-nowrap flex-grow w-1/4 flex-shrink-0 self-auto gap-5 items-center justify-start h-auto">
      <div className="hover:scale-[1.02] transition-all duration-75 cursor-pointer">
        <Logo size="20px" type={"logo"} color="normal" onClick={() => navigate("/")} />
      </div>
    </div>
    <div className="hidden md:flex item-center justify-center flex-row gap-2 flex-grow w-full">
        <HeaderLink 
        text="All Posts" 
        onClick={() => navigate("/home")}
        isActive={location && location.pathname === "/home"}
        />
        <HeaderLink 
          isActive={location && location.pathname === "/favorites"}
          text="Favorites" 
          onClick={() => navigate("/favorites")} />
        <HeaderLink
          isActive={location && location.pathname === "/my-listings"}
         text="My Posts" onClick={() => navigate("/my-listings")} />
      </div>
    <div className="flex flex-row flex-nowrap flex-grow w-1/4 flex-shrink-0  self-auto gap-3 items-center justify-end h-auto z-10">
      {!isAddListingPage &&
      <Button size="medium" style="filled" text="Post" rightIcon="plus" 
      onClick={() => navigate("/add-listing")}
      />}
      {isLoggedIn && (
        <UserMenu
          size="large"
          color="accent"
          avatarPosition="right"
          avatarType={"initials"}
          name={pb.authStore.model?.email}
        >
          {userEmailAddress && <span className="text-sm md:text-xs text-base-700 px-3 py-1">{userEmailAddress}</span>}
          <Button 
            size={isMobile ? 'medium' : 'small'} 
            style="ghost" text="Favorite Listings" 
            onClick={() => navigate("/favorites")} />
          <Button size={isMobile ? 'medium' : 'small'} style="ghost" text="My Listings" onClick={() => navigate("/my-listings")} />
          <Button size={isMobile ? 'medium' : 'small'} style="ghost" text="Log Out" onClick={logOut} />
        </UserMenu>
      )}
    </div>
    <div id='portal-root'>
      {/* Portal for modals */}
    </div>
    </>
  )
}
