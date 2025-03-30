import React, { useEffect, useRef, useState } from "react"
import { useSearchParams, BrowserRouter } from "react-router-dom"
import Layout from "../../components/layout"
import Closer from "../../components/closer"
import { showError } from "../../components/error"

const Bsky = () => {
  // START: GENERIC STATE
  // This kind of state is likely to be used in most applications.
  const handleRef = useRef<HTMLInputElement | null>(null)
  const [searchParams, setSearchParams] =
    typeof window !== "undefined"
      ? useSearchParams()
      : [new URLSearchParams(), () => {}]
  const [error, setError] = useState<React.ReactNode>()
  // END: GENERIC STATE

  // Get the "handle" query parameter.
  // This should eventually be replaced with a user input field.
  // "I / Me" from this point are the perspective of the user, eg. the handle.
  // "You" is the server / website.
  const myHandle = searchParams.get("handle")

  return (
    <Layout>
      <section className="post-body">
        <div className="post-header">
          <h2>
            <p>Testing</p>
          </h2>
        </div>
        <div className="post-content">
          <button
            className="btn btn-warning"
            type="button"
            onClick={() => {
              showError(setError, true, "This is a warning message!")
            }}
          >
            Warn!
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => {
              showError(setError, false, "This is an error message!")
            }}
          >
            Error!
          </button>
        </div>
        <div className="post-content">{error ? error : null}</div>
        <Closer />
      </section>
    </Layout>
  )
}

export default () => {
  return typeof window !== "undefined" ? (
    <BrowserRouter>
      <Bsky />
    </BrowserRouter>
  ) : null
}
