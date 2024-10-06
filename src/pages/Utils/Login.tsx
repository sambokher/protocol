import { usePocketBase } from "../../contexts/PocketBase";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, InputText, Logo, Alert } from "../../junokit/index";
import { isValidHarvardEmail } from "./helpers"; 

type FormError = {
  message: string;
  email?: string;
};

type State = {
  email: string;
  emailError: string | null;
  isPending: boolean;
  error: string | null;
  linkSent: boolean;
};

type Response = {
  message: string;
}

export default function Login() {
  const { pb } = usePocketBase();
  const navigate = useNavigate();
  const isLoggedIn = pb?.authStore.isValid;

  // If the user is already logged in, redirect them to /home
  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  const [form, setForm] = useState<State>({
    email: "",
    emailError: null,
    isPending: false,
    linkSent: false,
    error: null,
  });

  
  // Function to validate basic email format
  function isValidEmailFormat(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return emailRegex.test(email);
  }

  async function submitForm() {
    setForm({ ...form, isPending: true });

    /*
    For local testing 
    const email = 'bokher@me.com'; 
    const password = 'Hello123!';
    await pb.collection('users').authWithPassword(email, password);
    navigate('/home');
    return*/

    try {
      const response = await fetch('/api/hupost/otp', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email }),
      });

      if (response.ok) {
        setForm({ ...form, isPending: false, error: null, linkSent: true });
      } else {
        setForm({ ...form, isPending: false, error: 'Error occurred.' });
      }
    } catch (error) {
      setForm({ ...form, isPending: false, error: 'Network error occurred.' });
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, email: event.target.value, error: null, emailError: null });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();  // Ensure the handleSubmit is called when the Enter key is pressed
    }
  }

  function handleSubmit(event?: React.MouseEvent<HTMLButtonElement>) {
    if (event) event.preventDefault();

    const { email } = form;

    // Check if email format is valid
    if (!isValidEmailFormat(email)) {
      setForm({ ...form, emailError: 'Please enter a valid email address.' });
      return;  // Stop form submission if the email format is invalid
    }

    // Check if the email is a valid Harvard email
    if (!isValidHarvardEmail(email)) {
      setForm({ ...form, emailError: 'Please enter a valid Harvard email address.' });
      return;  // Stop form submission if the Harvard email is invalid
    }

    if (form.linkSent) {
      setForm({ email: '', isPending: false, error: null, linkSent: false, emailError: null });
      return;
    }

    submitForm();
  }

  return (
    <>
      <div></div>
      <form onSubmit={(e) => e.preventDefault()}
        className="flex flex-col flex-nowrap md:px-8 py-8 w-full self-auto text-base-content bg-base-0 gap-6 rounded-xl items-stretch justify-start h-auto max-w-[480px]"
        style={{ backgroundColor: "color-mix(in srgb, var(--base-0) 100%, transparent)" }}
      >
        <Logo size="36px" type={"logo"} color="normal" onClick={() => navigate("/")} />
        <div className="flex flex-col flex-nowrap w-full max-w-full self-auto gap-2 items-start justify-start h-auto">
          <h1 style={{ whiteSpace: "pre-wrap" }} className="text-ellipsis text-2xl font-semibold">
            {form.linkSent ? "Check your inbox" : "Enter Harvard Email"}
          </h1>
        </div>
        <div className="flex flex-col flex-nowrap w-full max-w-full self-auto gap-3 items-stretch justify-start h-auto">
          {!form.linkSent ?
            <InputText
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              helperText={form.emailError}
              state={form.emailError ? "error" : undefined}
              onKeyDown={handleKeyDown}
              autoFocus={true}
              disabled={form.linkSent}
            />
            : `We have sent a magic link to ${form.email}. It may take a minute or so to arrive (Harvard outlook security). Check spam folder too.`
          }
        </div>

        {form.error ? (
          <Alert text={`${form.error} Try again.`} type="error" size="medium" style="light" width="auto" />
        ) : null}

        <div className="flex flex-col flex-nowrap w-full max-w-full self-auto gap-3 items-stretch justify-start h-auto">
          <Button
            size="medium"
            text={form.linkSent ? "Try again" : "Send Access Link"}
            width="full"
            rightIcon="chevron-right"
            style="filled"
            color="primary"
            onClick={handleSubmit}
            state={form.isPending ? "loading" : "default"}
          />
        </div>
      </form>
      <div className="self-center text-sm text-base-700 hover:underline cursor-pointer flex flex-row"
      onClick={() => window.location.href = 'mailto:help@hupost.com'}
      >
        help@hupost.com
      </div>
    </>
  );
}