import { usePocketBase } from "../../contexts/PocketBase";
import { ClientResponseError } from "pocketbase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, Button, InputText, Logo} from "../../junokit/index";

type FormError = {
  message: string;
  password?: string;
  passwordConfirm?: string;
  email?: string;
};

type State = {
  email: string;
  password: string;
  passwordConfirm: string;
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
    passwordConfirm: response.data.passwordConfirm?.message,
    email: response.data.email?.message,
  };
}

export default function Register() {
  const { pb } = usePocketBase();
  const navigate = useNavigate();

  const [form, setForm] = useState<State>({
    email: "",
    password: "",
    passwordConfirm: "",
    isPending: false,
    isError: false,
    error: null,
  });

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    setForm({ ...form, isPending: true, isError: false, error: null });
    try {
      await pb
        ?.collection("users")
        .create({ email: form.email, password: form.password, passwordConfirm: form.passwordConfirm });
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
                Create Account
              </h1>
            </div>
            <div className="flex flex-col flex-nowrap w-full max-w-full   self-auto     gap-3   items-stretch justify-start h-auto  ">
              <InputText
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value, isError: false })}
                helperText={form.error?.email}
                state={form.error?.email ? "error" : undefined}
                autoFocus={true}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <InputText
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value, isError: false })}
                helperText={form.error?.password}
                state={form.error?.password ? "error" : undefined}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <InputText
                type="password"
                placeholder="Confirm password"
                value={form.passwordConfirm}
                onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value, isError: false })}
                helperText={form.error?.passwordConfirm}
                state={form.error?.passwordConfirm ? "error" : undefined}
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
              <Button text="Log In" style="light" onClick={() => navigate("/login")} />
            </div>
          </form>
          </>
  );
}
