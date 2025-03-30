import React, { useState } from "react"
import Layout from "../../components/layout"
import Closer from "../../components/closer"
import { showError } from "../../components/error"

const Testing = () => {
  // START: GENERIC STATE
  // This kind of state is likely to be used in most applications.
  const [error, setError] = useState<React.ReactNode>()
  // END: GENERIC STATE

  return (
    <Layout>
      <section className="post-body">
        <div className="post-header">
          <h2>
            <p>Error Testing</p>
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
          <button
            className="btn btn-info"
            type="button"
            onClick={() => {
              setError(null)
            }}
          >
            Clear
          </button>
        </div>
        <div className="post-content">{error ? error : null}</div>
        <Closer />
      </section>
    </Layout>
  )
}

export default Testing
