import React from "react"

const showError = (
  setter: (value: React.SetStateAction<React.ReactNode>) => void,
  message: string
) => {
  console.log("Error message: ", message)
  setter(() => (
    <div>
      <div className="alert alert-danger" role="alert">
        <p>
          There has been an error! The error details will be in the console log.
          Please reload the page to see if that resolves the issue. If the issue
          persists, go tell{" "}
          <a href="https://bsky.app/profile/coilysiren.me/" target="_blank">
            @coilysiren.me
          </a>{" "}
          about it.
        </p>
      </div>
    </div>
  ))
}

export default showError
