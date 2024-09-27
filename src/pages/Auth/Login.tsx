import { usePocketBase } from "../../contexts/PocketBase";
import { ClientResponseError } from "pocketbase";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button, InputText, Logo, Alert } from "../../junokit/index";

type FormError = {
  message: string;
  password?: string;
  email?: string;
};

type State = {
  email: string;
  password: string;
  isPending: boolean;
  isError: boolean;
  error: FormError | null;
};

function processError({ status, message, response }: ClientResponseError): FormError {
  if (status !== 400 || !Object.keys(response.data)) {
    return { message };
  }
  return {
    message,
    password: response.data.password?.message,
    email: response.data.identity?.message,
  };
}

export default function Login() {
  const { pb } = usePocketBase();
  const navigate = useNavigate();

  const [form, setForm] = useState<State>({
    email: "",
    password: "",
    isPending: false,
    isError: false,
    error: null,
  });

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    setForm({ ...form, isPending: true, isError: false, error: null });
    try {
      await pb?.collection("users").authWithPassword(form.email, form.password);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        setForm({ ...form, isPending: false, isError: true, error: processError(error) });
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

  const buttonState = form.isPending ? "loading" : form.isError ? "disabled" : "default";

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
            <Logo size="40px" type="symbol" color="normal" />
            <div className="flex flex-col flex-nowrap w-full max-w-full   self-auto     gap-2   items-start justify-start h-auto  ">
              <h1 style={{ whiteSpace: "pre-wrap" }} className="text-ellipsis text-2xl     font-semibold  ">
                Log In
              </h1>
            </div>
            <div className="flex flex-col flex-nowrap w-full max-w-full   self-auto     gap-3   items-stretch justify-start h-auto  ">
              <InputText
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                helperText={form.error?.email}
                state={form.error?.email ? "error" : undefined}
                onKeyDown={(e) => handleKeyDown(e)}
                autoFocus={true}
              />
              <InputText
                placeholder="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                helperText={form.error?.password}
                state={form.error?.password ? "error" : undefined}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </div>
            {form.error?.message ? (
              <Alert text={form.error?.message + " Try again"} type="error" size="medium" style="light" width="auto" />
            ) : null}
            <div className="flex flex-col flex-nowrap w-full max-w-full   self-auto     gap-3   items-stretch justify-start h-auto  ">
              <Button
                size="medium"
                text="Continue"
                width="full"
                rightIcon="chevron-right"
                style="filled"
                color="primary"
                onClick={handleSubmit}
                state={buttonState}
              />
              <Button text="Create Account" style="light" onClick={() => navigate("/register")} />
              <Button text="Forgot Password" style="ghost" onClick={() => navigate("/forgot")} />
            </div>
          </form>
        </>
  );
}
