import React, { useEffect, useRef, useState } from "react"
import { useLocation, navigate } from "@reach/router"
import Layout from "../../components/layout"
import Closer from "../../components/closer"
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs"
import { showHTTPError } from "../../components/error"
import { getProfileList, IExpandedProfileDetails } from "../../components/bsky"

const requestFrequency = 250
const maxSuggestions = process.env.GATSBY_ENV == "dev" ? 100 : 500
const maxSuggestionDetailRequests = process.env.GATSBY_ENV == "dev" ? 500 : 2500

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
  // END: GENERIC STATE

  // START: APPLICATION STATE
  // Reset all of this stuff whenever there is an error
  // or whenever the user does something that implies a page refesh.
  const [suggestionsIndex, setSuggestionsIndex] = useState<number>(0)
  const [suggestionCounts, setSuggestionCounts] = useState<{
    [key: string]: number
  }>({})
  const [suggestionDetails, setSuggestionDetails] = useState<{
    [key: string]: IExpandedProfileDetails
  }>({})
  const [suggestionDetailRequests, setSuggestionDetailRequests] =
    useState<number>(0)
  const clearApplicationState = () => {
    setSuggestionsIndex(0)
    setSuggestionCounts({})
    setSuggestionDetails({})
    setSuggestionDetailRequests(0)
  }
  // END: APPLICATION STATE

  // START: UI STATE
  // This is similar to the application state,
  // different in that it doesn't need to be reset.
  const handleRef = useRef<HTMLInputElement | null>(null)
  const [showDetailsByScore, setShowDetailsByScore] = useState<boolean>(false)
  // END: UI STATE

  const myHandle = searchParams.get("handle")

  // Once you start getting suggestions, keep getting them until there are no more.
  useEffect(() => {
    if (suggestionsIndex != 0 && suggestionsIndex != -1) {
      const timer = setTimeout(() => getSuggestions(myHandle), requestFrequency)
      return () => clearTimeout(timer)
    }
  }, [suggestionsIndex])

  // Get a list of suggestions, then aggregate the counts of each handle.
  const getSuggestions = async (handle: string | null) => {
    if (!handle) {
      return
    }

    // Get suggested follows from the server for the given handle.
    const suggestionCountsCopy = { ...suggestionCounts }
    const response = await fetch(
      `${process.env.GATSBY_API_URL}/bsky/${myHandle}/suggestions/${suggestionsIndex}`
    )
    if (!response.ok) {
      clearApplicationState()
      showHTTPError(setError, response)
      return
    }
    const data: { suggestions: string[]; next: number } = await response.json()
    // Aggregate the suggestions into a count of how many times each handle appears.
    data.suggestions.forEach((suggestion) => {
      if (suggestionCountsCopy[suggestion]) {
        suggestionCountsCopy[suggestion] += 1
      } else {
        suggestionCountsCopy[suggestion] = 1
      }
    })
    setSuggestionCounts(() => suggestionCountsCopy)
    setSuggestionsIndex(() => data.next)
  }

  // Once you start getting suggestion counts, sort them by the number of followers.
  // Then start getting details for each suggestion.
  useEffect(() => {
    const missingCount = maxSuggestions - Object.keys(suggestionDetails).length
    if (
      Object.keys(suggestionCounts).length !== 0 &&
      missingCount > 0 &&
      suggestionDetailRequests < maxSuggestionDetailRequests
    ) {
      const timer = setTimeout(() => getSuggestionDetails(), requestFrequency)
      return () => clearTimeout(timer)
    }
  }, [suggestionCounts, suggestionDetails])

  // Then start getting details for each suggestion until there are no more left.
  const getSuggestionDetails = async () => {
    if (Object.keys(suggestionDetails).length >= maxSuggestions) return
    if (suggestionDetailRequests >= maxSuggestionDetailRequests) return

    // Get a list of suggestions to detail via looking through the suggestion counts.
    // Removing the list of handles that already have details.
    // Sorting the list to get the people with the most followers first.
    // Limit to the maximum number of suggestions to avoid too many requests.
    const suggestionsToDetail = Object.keys(suggestionCounts)
      .sort((a, b) => suggestionCounts[b] - suggestionCounts[a])
      .filter((suggestion) => suggestionCounts[suggestion] > 1)
      .filter((suggestion) => suggestion != myHandle)
      .slice(0, maxSuggestions - Object.keys(suggestionDetails).length)

    // Get details for each suggestion.
    for (const handle of suggestionsToDetail) {
      const response = await fetch(
        `${process.env.GATSBY_API_URL}/bsky/${handle}/profile`
      )
      if (!response.ok) {
        showHTTPError(setError, response)
        continue
      }
      const data: { [key: string]: ProfileViewDetailed } = await response.json()
      const profile = Object.values(data)[0]
      setSuggestionDetails((prev) => ({
        ...prev,
        [handle]: {
          profile: profile,
          score:
            (suggestionCounts[profile.handle] || 0) /
            (profile.followersCount || 1),
          myFollowers: suggestionCounts[profile.handle] || 0,
        },
      }))
      setSuggestionDetailRequests((prev) => prev + 1)
    }
  }

  const followingComponent = (
    <div>
      <div>
        <p>
          Suggestions should finish loading after either of these bars is full:
        </p>
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar progress-bar-striped bg-success"
            role="progressbar"
            style={{
              width:
                (
                  (100 * suggestionDetailRequests) /
                  maxSuggestionDetailRequests
                ).toString() + "%",
            }}
            aria-valuenow={suggestionDetailRequests}
            aria-valuemin={0}
            aria-valuemax={maxSuggestionDetailRequests}
          ></div>
        </div>
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar progress-bar-striped"
            role="progressbar"
            style={{
              width:
                (
                  (100 * Object.keys(suggestionDetails).length) /
                  maxSuggestions
                ).toString() + "%",
            }}
            aria-valuenow={Object.keys(suggestionDetails).length}
            aria-valuemin={0}
            aria-valuemax={maxSuggestions}
          ></div>
        </div>
        <hr />
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sortBy"
            id="flexRadioDefault3"
            onClick={() => setShowDetailsByScore(false)}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault3">
            Sort By Total Following
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sortBy"
            id="flexRadioDefault4"
            onClick={() => setShowDetailsByScore(true)}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault4">
            Sort By Follower Score
          </label>
        </div>
        <hr />
      </div>
      <div className="post-content">
        {getProfileList(
          showDetailsByScore
            ? Object.values(suggestionDetails).sort(
                (a, b) => (b.score || 0) - (a.score || 0)
              )
            : Object.values(suggestionDetails).sort(
                (a, b) => (b.myFollowers || 0) - (a.myFollowers || 0)
              ),
          (details: IExpandedProfileDetails | null) => {
            return (
              <div>
                <p>Score: {((details?.score || 0) * 10000).toFixed(2)}</p>
                <p>My Followers: &gt;= {details?.myFollowers}</p>
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
            <p>Bluesky Follow Suggestions</p>
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
                setParams("handle", handleRef.current?.value || "")
                getSuggestions(handleRef.current?.value || "")
              }}
            >
              Suggest!
            </button>
          </div>
          <p>
            Hello and welcome to my first bluesky app! This is a tool to help
            you find new people to follow. It will suggest accounts based on the
            number of your followers that follow them. It can sort based on a
            total number (favoring large accounts) or a percent (favoring niche
            accounts).
          </p>
          <p>
            The number of followers checked is subject to several limits, and is
            slightly random. This is primarily to avoid overloading the server
            and or your web browser. At the same time, there's a cache on the
            server that will store the results for a short period of time. I say
            that to say: you are encouraged to try this tool multiple times! You
            may get different results, and subsequent runs should cost less
            server resources than the first run.
          </p>
          <p>
            This idea was based off of{" "}
            <a href="https://bsky-follow-finder.theo.io/" target="_blank">
              bsky-follow-finder
            </a>
            , go check that out as well!
          </p>
        </div>
        <div className="post-content">
          {error ? error : null}
          <div>
            <div className="flex flex-column gap-4">{followingComponent}</div>
          </div>
        </div>
        <Closer />
      </section>
    </Layout>
  )
}

export default Bsky
