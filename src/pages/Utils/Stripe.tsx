import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Alert } from "../../junokit/index";

declare global {
    interface Window {
        plausible: any;
    }
}

export default function Stripe() {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];

  useEffect(() => {    
    const checkoutSessionId = searchParams.get('csid');
    if (!checkoutSessionId) {
      navigate('/');
      return;
    }
    
    const fetchToken = async () => {
      await fetch(`/api/hupost/stripe/${checkoutSessionId}`, { method: "POST" });
      window.plausible('Complete Payment');
      navigate('/my-listings');
      return;        
    }
    fetchToken().catch(console.error);
  }, []);

  return <Alert text={`Processing...`} type="info" size="medium" style="light" width="auto" />;
}
