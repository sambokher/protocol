import { usePocketBase } from "../../contexts/PocketBase";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, InputText, Logo, Alert } from "../../junokit/index";

type State = 'pending' | 'genericError' | 'OTPExpired' | 'ok';

type Response = {
  token: string;
  record: object;
}

type AlertType = 'info' | 'success' | 'error';

type AlertProps = {
  [K in State]: {
    type: AlertType;
    text: string;
  }
};

const alertProps: AlertProps = {
  pending: {type: "info", text: "Verifying..."},
  ok: { type: "success", text: "You have been logged in. Click the logo if you aren't redirected automatically" },
  genericError: { type: "error", text: "Error occurred. Try again." },
  OTPExpired: { type: "error", text: "The magic link expired. Try again to get a new one." }};

export default function OTP() {
  const { pb } = usePocketBase();
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  
  const [state, setState] = useState<State>('pending');

  useEffect(() => {
    
    const code = searchParams.get('code');
    const email = searchParams.get('email');
    if (!code || !email) {
      setState('genericError');
      return;
    }
    
    const fetchToken = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/hupost/otp_verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, email }),
        });
      if (response.status === 403) {
        setState('OTPExpired');
        return;
      }
      if (!response.ok) {
        setState('genericError');
        return;        
      }
      let parsed: Response;
      try {
        parsed = await response.json();
      } catch (e) {
        console.log(e);
        setState('genericError');
        return;
      }
      if (response.ok) {
        setState('ok');
        pb.authStore.save(parsed.token, parsed.record);
        navigate('/');
        return;
      }
    }
    fetchToken().catch(console.error);
  }, []);

  return (
    <>
    <div></div>
    <div
      className="flex flex-col flex-nowrap  md:px-8 py-8 w-full self-auto text-base-content  bg-base-0  gap-6 rounded-xl items-stretch justify-start h-auto  max-w-[480px]"
      style={{ backgroundColor: "color-mix(in srgb, var(--base-0) 100%, transparent)" }}
    >
      <Logo size="36px" type={"logo"} color="normal" onClick={() => navigate("/")} />
      <div className="flex flex-col flex-nowrap w-full max-w-full self-auto gap-3 items-stretch justify-start h-auto">
        <Alert {...alertProps[state]} size="medium" style="light" width="auto" />
      </div>
    </div>
    <div className="self-center text-sm text-base-700 hover:underline cursor-pointer flex flex-row"
      onClick={() => window.location.href = 'mailto:help@hupost.com'}
      >
        help@hupost.com
      </div>
    </>
  );
}
