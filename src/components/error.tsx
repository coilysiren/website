import React from "react"

const showError = async (
  setter: (value: React.SetStateAction<React.ReactNode>) => void,
  response: Response
) => {
  const data =
    response.status < 500
      ? JSON.stringify(await response.json(), null, 2)
      : await response.text()
  setter(() => (
    <div>
      <div
        className={
          response.status < 500 ? "alert alert-warning" : "alert alert-danger"
        }
        role="alert"
      >
        {response.status < 500 ? (
          <div>
            <pre className="error-message">{data}</pre>
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

export default showError
