import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert } from "../../junokit/index";

declare global {
    interface Window {
        plausible: any;
    }
}

export default function Stripe() {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const [error, setError] = useState(false);

  useEffect(() => {    
    const checkoutSessionId = searchParams.get('csid');
    if (!checkoutSessionId) {
      navigate('/');
      return;
    }
    
    const fetchToken = async () => {
      const response = await fetch(`/api/hupost/stripe/${checkoutSessionId}`, { method: "POST" });
      if (!response.ok) {
        const retry = await fetch(`/api/hupost/stripe/${checkoutSessionId}`, { method: "POST" });
        if (!retry.ok) {
          setError(true);
          return;
        }
      }
      window.plausible('Complete Payment');
      navigate('/my-listings');
    }
    fetchToken().catch(console.error);
  }, []);
  if (error) {
    return <Alert text={`The payment was successful but unfortunately there was an error whilу publishing the post. Please reach out to us so we can publish the post manually.`} type="error" size="medium" style="light" width="auto" />;
  }
  return <Alert text={`Processing...`} type="info" size="medium" style="light" width="auto" />;
}
