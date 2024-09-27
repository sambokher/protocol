import PocketBase from "pocketbase";
import { useContext, createContext, useState, useEffect } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    pb: any;
  }
}

type Context = {
  pb: PocketBase | null;
};

export type PBContext = {
  pb: PocketBase;
};

export const PocketBaseContext = createContext<Context>({
  pb: null,
});

export function PocketBaseProvider({ children }: React.PropsWithChildren) {
  const [pb, setPB] = useState<PocketBase | null>(null);

  useEffect(() => {
    try {
      const pocketBase = new PocketBase("https://hupost.pockethost.io");
      
      // Disable auto-cancellation globally
      pocketBase.autoCancellation(false);

      setPB(pocketBase);
      window.pb = pocketBase;
    } catch (error) {
      console.error("Failed to initialize PocketBase", error);
    }
  }, []);

  if (!pb) {
    return <>Loading...</>;
  }
  return <PocketBaseContext.Provider value={{ pb }}>{children}</PocketBaseContext.Provider>;
}

export function usePocketBase() {
  return useContext(PocketBaseContext);
}