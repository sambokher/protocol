import { useNavigate } from "react-router-dom";
import { Button } from "../../junokit/index";

export default function PasswordReset() {
  const navigate = useNavigate();
  return (
    <>
          <form
            className="flex flex-col flex-nowrap  md:px-8 py-8 w-full max-w-[480px]  self-auto text-base-content gap-6 rounded-xl items-stretch justify-start h-auto"
            style={{ backgroundColor: "color-mix(in srgb, var(--base-0) 100%, transparent)" }}
          >
            <div className="flex flex-col flex-nowrap w-full max-w-full   self-auto     gap-2   items-start justify-start h-auto  ">
              <h1 style={{ whiteSpace: "pre-wrap" }} className="text-ellipsis text-2xl     font-semibold  ">
                Check your mailbox
              </h1>
              <Button text="Back to Login" style="light" onClick={() => navigate("/login")} />
            </div>
          </form>
      </>
  );
}
