import React, { ReactElement, useRef, useState } from "react"
import Layout from "../../components/layout"
import Closer from "../../components/closer"
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs"
import { showHTTPError } from "../../components/error"
import { getProfileList, IExpandedProfileDetails } from "../../components/bsky"

const Testing = () => {
  // START: GENERIC STATE
  // This kind of state is likely to be used in most applications.
  const handleRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState<React.ReactNode>()
  // END: GENERIC STATE

  // START: APPLICATION STATE
  // Reset all of this stuff whenever there is an error
  // or whenever the user does something that implies a page refesh.
  const [suggestionDetails, setSuggestionDetails] = useState<
    IExpandedProfileDetails[]
  >([])
  // END: APPLICATION STATE

  // Get the list of people that I follow.
  const getData = async (handle: string) => {
    const response = await fetch(
      `${process.env.GATSBY_API_URL}/bsky/${handle}/profile`
    )
    if (!response.ok) {
      showHTTPError(setError, response)
      return
    }
    const data: { [key: string]: ProfileViewDetailed } = await response.json()
    const profile: ProfileViewDetailed = Object.values(data)[0]
    setSuggestionDetails((prevDetails) => [
      ...prevDetails,
      {
        myFollowersCount: 500,
        folledByMe: false,
        score: 0.5,
        profile: profile,
      },
    ])
  }

  return (
    <Layout>
      <section className="post-body">
        <div className="post-header">
          <h2>
            <p>Bluesky Testing</p>
          </h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              defaultValue="coilysiren.me"
              placeholder="enter handle"
              aria-label="enter handle"
              aria-describedby="button-addon2"
              ref={handleRef}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => {
                getData(handleRef.current?.value || "")
              }}
            >
              Get Profile Data
            </button>
          </div>
        </div>
        <div className="post-content">{error ? error : null}</div>
        <div className="post-content">
          {getProfileList(suggestionDetails, null)}
        </div>
        <Closer />
      </section>
    </Layout>
  )
}

export default Testing
