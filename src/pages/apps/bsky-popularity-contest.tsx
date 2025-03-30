import React, { useEffect, useRef, useState } from "react"
import { useLocation, navigate } from "@reach/router"
import Layout from "../../components/layout"
import Closer from "../../components/closer"
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs"
import { showHTTPError } from "../../components/error"
import { getProfileList, IExpandedProfileDetails } from "../../components/bsky"

const starletteRope = 5
const requestFrequency = 250
const absoluteMaxStarlettes = 100

const Bsky = () => {
  // START: GENERIC STATE
  // This kind of state is likely to be used in most applications.
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const setParams = (key: string, value: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set(key, value)
    window.history.pushState(null, "", url.toString())
  }
  const [error, setError] = useState<React.ReactNode>()
  const [started, setStarted] = useState<boolean>(false)
  const [done, setDone] = useState<boolean>(false)
  // END: GENERIC STATE

  // START: APPLICATION STATE
  // Reset all of this stuff whenever there is an error
  // or whenever the user does something that implies a page refesh.
  const [profile, setProfile] = useState<ProfileViewDetailed | null>(null)
  const [popularity, setPopularity] = useState<{
    [key: string]: number
  }>({})
  const [popularityIndex, setPopularityIndex] = useState<number>(0)
  const [popularityDetails, setPopularityDetails] = useState<{
    [key: string]: IExpandedProfileDetails
  }>({})
  const clearApplicationState = () => {
    setProfile(null)
    setPopularity({})
    setPopularityIndex(0)
    setPopularityDetails({})
    setStarted(false)
    setDone(false)
  }
  // END: APPLICATION STATE

  // START: UI STATE
  // This is similar to the application state,
  // different in that it doesn't need to be reset.
  const handleRef = useRef<HTMLInputElement | null>(null)
  // END: UI STATE

  const myHandle = searchParams.get("handle")
  const maxStarlettes =
    absoluteMaxStarlettes < (profile?.followsCount || 0)
      ? absoluteMaxStarlettes
      : profile?.followsCount || 0
  const maxPopularity = Object.values(popularity).sort((a, b) => b - a)[0] || 0

  // Check for "get profile" conditions
  useEffect(() => {
    if (started && !done) {
      const timer = setTimeout(() => getProfile(myHandle), requestFrequency)
      return () => clearTimeout(timer)
    }
  }, [started, done])

  // Run "check profile"
  const getProfile = async (handle: string | null) => {
    if (done) return
    if (!handle) return

    const response = await fetch(
      `${process.env.GATSBY_API_URL}/bsky/${handle}/profile`
    )
    if (!response.ok) {
      clearApplicationState()
      showHTTPError(setError, response)
      return
    }
    const data: { [key: string]: ProfileViewDetailed } = await response.json()
    const profile = Object.values(data)[0]
    setProfile(() => profile)
  }

  // Check for "get popularity" conditions
  useEffect(() => {
    if (started && !done && popularityIndex != -1) {
      getPopularity()
    }
  }, [started, done, popularityIndex])

  // Run "get popularity"
  const getPopularity = async () => {
    if (done) return

    const popularityCopy = { ...popularity }
    const response = await fetch(
      `${process.env.GATSBY_API_URL}/bsky/${myHandle}/popularity/${popularityIndex}`
    )
    if (!response.ok) {
      clearApplicationState()
      showHTTPError(setError, response)
      return
    }
    const data: { popularity: { [key: string]: number }; next: number } =
      await response.json()

    Object.entries(data.popularity).forEach(([handle, followers]) => {
      if (popularityCopy[handle]) {
        popularityCopy[handle] += followers
      } else {
        popularityCopy[handle] = followers
      }
    })

    setPopularity(() => popularityCopy)
    setPopularityIndex(() => data.next)
  }

  // Check for "get popularity details" conditions
  useEffect(() => {
    if (
      started &&
      !done &&
      Object.keys(popularity).length > 0 &&
      Object.keys(popularityDetails).length < maxStarlettes
    ) {
      getPopularityDetails()
    }
  }, [started, done, popularity, popularityDetails])

  // Run "get popularity details"
  const getPopularityDetails = async () => {
    if (done) return

    const handle = Object.keys(popularity)
      .filter((handle) => {
        // Don't request details for handles we already have details for
        return !popularityDetails[handle]
      })
      .filter((handle) => {
        // Don't request details for handles that have a score of 0 or less than goal
        return popularity[handle] > starletteRope
      })[0]

    const response = await fetch(
      `${process.env.GATSBY_API_URL}/bsky/${handle}/profile`
    )
    if (!response.ok) {
      clearApplicationState()
      showHTTPError(setError, response)
      return
    }
    const data: { [key: string]: ProfileViewDetailed } = await response.json()

    setPopularityDetails((prevDetails) => ({
      ...prevDetails,
      [Object.values(data)[0].handle]: {
        profile: Object.values(data)[0],
        score: popularity[Object.values(data)[0].handle],
      },
    }))
  }

  // Check done ness
  useEffect(() => {
    if (
      started &&
      !done &&
      Object.keys(popularityDetails).length != 0 &&
      Object.keys(popularityDetails).length == maxStarlettes
    ) {
      setDone(true)
    }
  }, [started, done, popularityDetails])

  const contentBlock = (
    <div>
      <div className="post-content">
        <div className="flex flex-column align-items-center">
          <h3>
            ✨✨✨ Starlettes: {Object.values(popularityDetails).length} ✨✨✨
          </h3>
          <hr />
        </div>
        {getProfileList(
          Object.values(popularityDetails).sort((a, b) => {
            return (b.score || 0) - (a.score || 0)
          }),
          (details: IExpandedProfileDetails | null) => {
            return (
              <div>
                <p>
                  Adoring Fans: {details?.score}{" "}
                  {"⭐️".repeat(
                    Math.round((10 * (details?.score || 0)) / maxPopularity)
                  )}
                </p>
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{
                      width:
                        (
                          (100 * (details?.score || 0)) /
                          maxPopularity
                        ).toString() + "%",
                    }}
                    aria-valuenow={details?.score || 0}
                    aria-valuemin={0}
                    aria-valuemax={maxPopularity}
                  ></div>
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )

  return (
    <Layout>
      <section className="post-body">
        <div className="post-header">
          <h2>
            <p>Bluesky Popularity Contest</p>
          </h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              defaultValue={myHandle || ""}
              placeholder="enter handle"
              aria-label="enter handle"
              aria-describedby="button-addon2"
              ref={handleRef}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => {
                clearApplicationState()
                setError(null)
                setParams("handle", handleRef.current?.value || myHandle || "")
                setStarted(true)
              }}
            >
              Paparazzi!
            </button>
          </div>
          <p className="large">📸 📸 📸</p>
          <p>
            You are a daring camera-enby, out here to capture the stars! They
            won't avoid your notice, no matter how hard they try! The best of
            the best will be crowned the most popular starlette in the halls of
            Bluesky! This is a popularity contest, after all!
          </p>
          <p>Something broken? Reload the page and try again.</p>
          {started && !done ? (
            <div className="flex-center flex">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : null}
        </div>
        <div className="post-content">
          {error ? error : null}
          <div>
            <div className="flex flex-column gap-4">{contentBlock}</div>
          </div>
        </div>
        <Closer />
      </section>
    </Layout>
  )
}

export default Bsky
