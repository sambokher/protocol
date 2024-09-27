import { usePocketBase } from "../../contexts/PocketBase";
import { ClientResponseError } from "pocketbase";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button, InputText, Logo, Alert } from "../../junokit/index";

type FormError = {
  message: string;
  email?: string;
};

type State = {
  email: string;
  isPending: boolean;
  isError: boolean;
  error: FormError | null;
  linkSent: boolean;
};

function processError({ status, message, response }: ClientResponseError): FormError {
  if (status !== 400 || !Object.keys(response.data)) {
    return { message };
  }
  return {
    message,
    email: response.data.identity?.message,
  };
}

export default function Login() {
  const { pb } = usePocketBase();
  const navigate = useNavigate();

  const [form, setForm] = useState<State>({
    email: "",
    isPending: false,
    isError: false,
    error: null,
    linkSent: false,
  });

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    setForm({ ...form, isPending: true, isError: false, error: null });

    /*const password = 'bytmeb-4hopqe-Nubvyt';
     
    await pb.collection("users").authWithPassword(form.email, password);
    navigate("/home");
    return; */
    try {
      
      console.log("attempting to reset password for", form.email);
      const user = await pb.collection("users").getFirstListItem(`email="${form.email}"`);
        
      console.log("User found", user)
        if (user) {
            // If the user exists, send the password reset link
            console.log("User found, attempting to reset password for:", form.email);
            await pb.collection("users").requestPasswordReset(form.email);
            setForm({ ...form, isPending: false, linkSent: true });
        }
    } catch (error) {
      
      if (error instanceof ClientResponseError) {
        
        // If the user is not found, create a new user
        if (error.status === 404) {
          try {
            const randomPassword = generateRandomPassword();

            // Create the user with the random password
            const response = await pb.collection("users").create({
                email: form.email,
                password: randomPassword,
                passwordConfirm: randomPassword // PocketBase requires confirmation for password
            });
            console.log("response", response);
            console.log("User created, attempting to reset password for:", form.email);
            
            const passwordReset = await pb?.collection("users").requestPasswordReset(form.email);
            console.log("passwordReset", passwordReset);

            setForm({ ...form, isPending: false, linkSent: true });
          } catch (creationError) {
            setForm({
              ...form,
              isPending: false,
              isError: true,
              error: { message: "Unable to create user. Please try again." },
            });
          }
        } else {
          setForm({
            ...form,
            isPending: false,
            isError: true,
            error: processError(error),
          });
        }
      } else {
        setForm({
          ...form,
          isPending: false,
          isError: true,
          error: { message: "Something went wrong. Retry might help" },
        });
      }
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [event.target.name]: event.target.value, isError: false });
  }

  const buttonState = form.isPending ? "loading" : "default";

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  }

  return (
    <>
      <form
        className="flex flex-col flex-nowrap  md:px-8 py-8 w-full self-auto text-base-content  bg-base-0  gap-6 rounded-xl items-stretch justify-start h-auto  max-w-[480px]"
        style={{ backgroundColor: "color-mix(in srgb, var(--base-0) 100%, transparent)" }}
      >
        <Logo size="36px" type={"logo"} color="normal" onClick={() => navigate("/")} />
        <div className="flex flex-col flex-nowrap w-full max-w-full   self-auto     gap-2   items-start justify-start h-auto  ">
          <h1 style={{ whiteSpace: "pre-wrap" }} className="text-ellipsis text-2xl     font-semibold  ">
            {form.linkSent ? "Check your inbox" : "Your Harvard Email"}
          </h1>
        </div>
        <div className="flex flex-col flex-nowrap w-full max-w-full   self-auto     gap-3   items-stretch justify-start h-auto  ">
        {!form.linkSent ?
          <InputText
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            helperText={form.error?.email}
            state={form.error?.email ? "error" : undefined}
            onKeyDown={(e) => handleKeyDown(e)}
            autoFocus={true}
            disabled={form.linkSent}
          />
          : `We have sent a magic link to your ${form.email}. Click the link to log in.`
        }
        </div>
        
        {form.error?.message ? (
          <Alert text={form.error?.message + " Try again"} type="error" size="medium" style="light" width="auto" />
        ) : null}
        <div className="flex flex-col flex-nowrap w-full max-w-full   self-auto     gap-3   items-stretch justify-start h-auto  ">
          <Button
            size="medium"
            text={form.linkSent ? "Try again" : "Send Link"}
            width="full"
            rightIcon="chevron-right"
            style="filled"
            color="primary"
            onClick={handleSubmit}
            state={buttonState}
          />
        </div>
      </form>
    </>
  );
}


function generateRandomPassword(length: number = 12): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

function validateHarvardEmail(email: string): boolean {
  
  return email.endsWith("@college.harvard.edu") || email.endsWith("@g.harvard.edu");
}