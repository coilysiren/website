import React, { useEffect, useRef, useState } from "react"
import { useLocation, navigate } from "@reach/router"
import Layout from "../../components/layout"
import Closer from "../../components/closer"
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs"
import { showHTTPError } from "../../components/error"
import { getProfileList, IExpandedProfileDetails } from "../../components/bsky"

const requestFrequency = 100
const maxSuggestions = 100

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
  const [following, setFollowing] = useState<string[]>([])
  const [followingCopy, setMyFollowingCopy] = useState<string[]>([])
  const [suggestionCount, setSuggestionCount] = useState<{
    [key: string]: number
  }>({})
  const [suggestionCountSorted, setSuggestionCountSorted] = useState<
    [string, number][]
  >([])
  const [suggestionDetails, setSuggestionDetails] = useState<
    IExpandedProfileDetails[]
  >([])
  const [suggestionDetailsByScore, setSuggestionDetailsByScore] = useState<
    IExpandedProfileDetails[]
  >([])
  const clearApplicationState = () => {
    setFollowing([])
    setMyFollowingCopy([])
    setSuggestionCount({})
    setSuggestionCountSorted([])
    setSuggestionDetails([])
    setSuggestionDetailsByScore([])
  }
  // END: APPLICATION STATE

  // START: UI STATE
  // This is similar to the application state,
  // different in that it doesn't need to be reset.
  const handleRef = useRef<HTMLInputElement | null>(null)
  const [showFollowedByMe, setShowFollowedByMe] = useState<boolean>(true)
  const [showDetailsByScore, setShowDetailsByScore] = useState<boolean>(false)
  // END: UI STATE

  // Get the "handle" query parameter.
  // This should eventually be replaced with a user input field.
  // "I / Me" from this point are the perspective of the user, eg. the handle.
  // "You" is the server / website.
  const myHandle = searchParams.get("handle")

  // Get the list of people that I follow.
  const handleFollowing = async (handle: string) => {
    const response = await fetch(
      `${process.env.GATSBY_API_URL}/bsky/${handle}/following/handles`
    )
    if (!response.ok) {
      clearApplicationState()
      showHTTPError(setError, response)
      return
    }
    const data: string[] = await response.json()
    setFollowing(() => data)
    setMyFollowingCopy(() => data)
  }

  // When you have my followers ...
  useEffect(() => {
    if (Object.keys(following).length !== 0) {
      const timer = setTimeout(() => handleSuggestionCounts(), requestFrequency)
      return () => clearTimeout(timer)
    }
  }, [following])

  // ... get the count of the people that the people I follow follow.
  //
  // For exampe:
  // - I follow: [A, B]
  // - A follows: [C, D]
  // - B follows: [C]
  //
  // Then suggestion counts would be:
  // - C: 2
  // - D: 1
  const handleSuggestionCounts = async () => {
    var myFollowingCopy = [...following]
    const myFollowingHandle = myFollowingCopy.pop()

    // Get for a person that I follow, get a list of the people they follow
    const response = await fetch(
      `${process.env.GATSBY_API_URL}/bsky/${myFollowingHandle}/following/handles`
    )
    if (!response.ok) {
      clearApplicationState()
      showHTTPError(setError, response)
      return
    }
    const data: string[] = await response.json()

    // Generate a "suggestionCount" int for each handle that they follow
    // If the handle is already in the suggestions, increment the count.
    var suggestionsCopy = { ...suggestionCount }
    data.forEach((theirFollowingHandle) => {
      const validHandle = ![myHandle, "handle.invalid", ""].includes(
        theirFollowingHandle
      )
      if (validHandle) {
        var suggestionCount = suggestionsCopy[theirFollowingHandle]
        suggestionCount = suggestionCount ? suggestionCount + 1 : 1
        suggestionsCopy[theirFollowingHandle] = suggestionCount
      }
    })
    setSuggestionCount(() => suggestionsCopy)
    setFollowing(() => myFollowingCopy)
  }

  // When you have the suggestionomendation counts ...
  useEffect(() => {
    if (
      Object.keys(suggestionCount).length != 0 &&
      Object.keys(following).length == 0
    ) {
      const timer = setTimeout(
        () => handleSuggestionCountSorted(),
        requestFrequency
      )
      return () => clearTimeout(timer)
    }
  }, [following, suggestionCount])

  // ... sort the suggestionomendation counts.
  //
  // This logic produces pretty different results from the user perspective.
  // Based on the type of sorting method used.
  //
  // Sort by `(a, b) => b[1] - a[1]` (eg. highest first)
  // produces a list dominated by popular people.
  //
  // Sort by `() => Math.random() - 0.5` (eg. random)
  // produces most of less the same output for the "most popular" list,
  // but produces dramatically different results for the "percent following" list.
  //
  // We should probably let the user choose the sorting method???
  const handleSuggestionCountSorted = async () => {
    const suggestionCountCopy: { [key: string]: number } = {
      ...suggestionCount,
    }
    const suggestionCountSortedCopy: [string, number][] = Object.entries(
      suggestionCountCopy
    ).sort((a, b) => b[1] - a[1])
    setSuggestionCountSorted(() => suggestionCountSortedCopy)
    setSuggestionCount({})
  }

  // When you have the sorted suggestionomendation counts ...
  useEffect(() => {
    if (suggestionCountSorted.length != 0) {
      const timer = setTimeout(
        () => handleSuggestionDetails(),
        requestFrequency
      )
      return () => clearTimeout(timer)
    }
  }, [suggestionCountSorted])

  // ... get the details for the suggestions.
  //
  // "Details" here means any profile information required to
  // display the suggestion to the user.
  const handleSuggestionDetails = async () => {
    const suggestionDetailsCopy = [...suggestionDetails]
    const suggestionCountSortedCopy = [...suggestionCountSorted]
    const shiftedItem = suggestionCountSortedCopy.shift()

    if (!shiftedItem) {
      suggestionCountSortedCopy.pop()
      setSuggestionCountSorted(() => suggestionCountSortedCopy)
      return
    }

    const [handle, myFollowers] = shiftedItem
    if (!handle) {
      suggestionCountSortedCopy.pop()
      setSuggestionCountSorted(() => suggestionCountSortedCopy)
      return
    }

    const tooManyDetails = suggestionDetailsCopy.length > maxSuggestions
    if (tooManyDetails) {
      setSuggestionCountSorted([])
      return
    }

    const tooFewFollowers = followingCopy.length / 10 > myFollowers
    if (tooFewFollowers) {
      setSuggestionCountSorted([])
      return
    }

    const response = await fetch(
      `${process.env.GATSBY_API_URL}/bsky/${handle}/profile`
    )
    if (!response.ok) {
      clearApplicationState()
      showHTTPError(setError, response)
      return
    }
    const data: { [key: string]: ProfileViewDetailed } = await response.json()
    const profile: ProfileViewDetailed = Object.values(data)[0]

    suggestionDetailsCopy.push({
      myFollowersCount: myFollowers,
      score: myFollowers / (profile.followersCount ?? 1),
      profile: profile,
      folledByMe: followingCopy.includes(profile.handle),
    })

    suggestionCountSortedCopy.pop()
    setSuggestionCountSorted(() => suggestionCountSortedCopy)
    setSuggestionDetails(() => suggestionDetailsCopy)
  }

  // When you have the suggestionomendation details ...
  useEffect(() => {
    if (
      suggestionCountSorted.length == 0 &&
      suggestionDetailsByScore.length == 0
    ) {
      const timer = setTimeout(
        () => handleSortDetailedByScore(),
        requestFrequency
      )
      return () => clearTimeout(timer)
    }
  }, [suggestionCountSorted, suggestionDetailsByScore])

  // ... sort the suggestionomendation details by score.
  const handleSortDetailedByScore = async () => {
    const suggestionDetailsCopy = [...suggestionDetails]
    suggestionDetailsCopy.sort((a, b) => b.score - a.score)
    setSuggestionDetailsByScore(() => suggestionDetailsCopy)
  }

  const followingComponent = (
    <div>
      <div>
        <h3>Getting suggestions from followers: {following.length}</h3>
        <h3>Total suggestion count: {Object.keys(suggestionCount).length}</h3>
        <h3>Suggestions sorted: {suggestionCountSorted.length}</h3>
        <h3>Suggestions detailed: {Object.keys(suggestionDetails).length}</h3>
        <hr />
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="peopleIFollow"
            id="flexRadioDefault1"
            onClick={() => setShowFollowedByMe(true)}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Show people I follow
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="peopleIFollow"
            id="flexRadioDefault2"
            onClick={() => setShowFollowedByMe(false)}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Hide people I follow
          </label>
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
            Sort By Percent Following
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
            Sort By Total Following
          </label>
        </div>
        <hr />
      </div>
      <div className="post-content">
        {showDetailsByScore
          ? getProfileList(
              suggestionDetails
                .sort((a, b) => b.score - a.score)
                .filter((details) => {
                  if (showFollowedByMe) {
                    return details.folledByMe
                  }
                  return true
                }),
              null
            )
          : getProfileList(
              suggestionDetails
                .sort((a, b) => b.myFollowersCount - a.myFollowersCount)
                .filter((details) => {
                  if (showFollowedByMe) {
                    return details.folledByMe
                  }
                  return true
                }),
              null
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
              disabled={
                typeof window === "undefined" || !handleRef.current?.value
              }
              onClick={() => {
                setError(null)
                setParams("handle", handleRef.current?.value || "")
                handleFollowing(handleRef.current?.value || "")
              }}
            >
              Suggest!
            </button>
          </div>
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
