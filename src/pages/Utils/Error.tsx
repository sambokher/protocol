import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import Button from "../../junokit/Button";


type Props = {
  error?: "NotFound";
};

const errorMessages = {
  NotFound: "Page not found",
};

export default function Error({ error: forcedError }: Props) {
  const error = useRouteError();
  const navigate = useNavigate();

  function renderError() {
    let message;
    if (forcedError) {
      message = errorMessages[forcedError];
    }
    if (isRouteErrorResponse(error) && error.statusText) message = error.statusText;
    if (message) {
      return (
        <p>
          <i>{message}</i>
        </p>
      );
    }
    return null;
  }

  return (
    <>
      <div
        className="flex flex-col flex-nowrap  px-8 py-8 w-full self-auto text-base-content  bg-base-0  gap-6 rounded-xl items-stretch justify-start h-auto  "
        style={{ backgroundColor: "color-mix(in srgb, var(--base-0) 100%, transparent)", maxWidth: "408px" }}
      >
        <div className="flex flex-col flex-nowrap w-full max-w-full   self-auto     gap-2   items-start justify-start h-auto  ">
          <h1 style={{ whiteSpace: "pre-wrap" }} className="text-ellipsis text-2xl     font-semibold  ">
            Oops!
          </h1>
          <p>An unexpected error has occurred.</p>
          {renderError()}
          <Button text="Get me back" style="light" onClick={() => navigate("/")} />
        </div>
      </div>
    </>
  );
}
