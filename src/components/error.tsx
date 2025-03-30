import React from "react"

const showHTTPError = async (
  setter: (value: React.SetStateAction<React.ReactNode>) => void,
  response: Response
) => {
  const data =
    response.status < 500
      ? JSON.stringify(await response.json(), null, 2)
      : await response.text()
  return await showError(setter, response.status < 500, data)
}

const showError = async (
  setter: (value: React.SetStateAction<React.ReactNode>) => void,
  warning: boolean,
  message: string
) => {
  console.log(message)
  setter(() => (
    <div>
      <div
        className={warning ? "alert alert-warning" : "alert alert-danger"}
        role="alert"
      >
        {warning ? (
          <div>
            <pre className="warning-message">{message}</pre>
          </div>
        ) : (
          <p>
            <strong>
              There has been an error! The error details will be in the console
              log. Please reload the page to see if that resolves the issue. If
              the issue persists, go tell{" "}
              <a href="https://bsky.app/profile/coilysiren.me/" target="_blank">
                @coilysiren.me
              </a>{" "}
              about it.
            </strong>
          </p>
        )}
      </div>
    </div>
  ))
}

export { showHTTPError, showError }
