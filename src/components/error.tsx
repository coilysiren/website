import React from "react"

const showError = (
  setter: (value: React.SetStateAction<React.ReactNode>) => void,
  error: Error
) => {
  setter(() => (
    <div>
      <p>{(error.stack as string).split("(")[0]}</p>
      <p>Please reload the page to see if that resolves the issue</p>
      <p>
        If the issue persists, go tell{" "}
        <a href="https://bsky.app/profile/coilysiren.me/" target="_blank">
          @coilysiren.me
        </a>{" "}
        about it.
      </p>
      <p>Include a copy of the error message!</p>
    </div>
  ))
}

export default showError
