import React, { useEffect, useRef, useState } from "react"
import { useSearchParams, BrowserRouter } from "react-router-dom"
import Layout from "../../components/layout"
import Closer from "../../components/closer"
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs"
import showError from "../../components/error"

interface IReccDetails {
  myFollowersCount: number
  folledByMe: boolean
  score: number
  profile: ProfileViewDetailed
}

const Bsky = () => {
  const handleRef = useRef<HTMLInputElement | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [error, setError] = useState<React.ReactNode>()
  const [following, setFollowing] = useState<string[]>([])
  const [followingCopy, setMyFollowingCopy] = useState<string[]>([])
  const [showFollowedByMe, setShowFollowedByMe] = useState<boolean>(true)
  const [reccCount, setReccCount] = useState<{
    [key: string]: number
  }>({})
  const [reccCountSorted, setReccCountSorted] = useState<[string, number][]>([])
  const [reccDetails, setReccDetails] = useState<IReccDetails[]>([])
  const [reccDetailsByScore, setReccDetailsByScore] = useState<IReccDetails[]>(
    []
  )
  const [showDetailsByScore, setShowDetailsByScore] = useState<boolean>(false)

  // Get the "handle" query parameter.
  // This should eventually be replaced with a user input field.
  // "I / Me" from this point are the perspective of the user, eg. the handle.
  // "You" is the server / website.
  const myHandle = searchParams.get("handle")

  // Get the list of people that I follow.
  const handleFollowing = async () => {
    try {
      const response = await fetch(
        `${process.env.GATSBY_API_URL}/bsky/${myHandle}/following/handles`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: string[] = await response.json()
      // This is done to prevent the same handles from being recommended in the same order.
      const dataRandomized = [...new Set(data.sort(() => Math.random() - 0.5))]
      setFollowing(dataRandomized)
      setMyFollowingCopy(dataRandomized)
    } catch (error) {
      showError(setError, error)
    }
  }

  // When you have my followers ...
  useEffect(() => {
    if (Object.keys(following).length !== 0) {
      const timer = setTimeout(() => handleRecommedationCounts(), 250)
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
  // Then recommendation counts would be:
  // - C: 2
  // - D: 1
  const handleRecommedationCounts = async () => {
    try {
      var myFollowingCopy = [...following]
      const myFollowingHandle = myFollowingCopy.pop()

      // Get for a person that I follow, get a list of the people they follow
      const response = await fetch(
        `${process.env.GATSBY_API_URL}/bsky/${myFollowingHandle}/following/handles`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: string[] = await response.json()

      // Generate a "reccCount" int for each handle that they follow
      // If the handle is already in the reccs, increment the count.
      var reccsCopy = { ...reccCount }
      data.forEach((theirFollowingHandle) => {
        const validHandle = ![myHandle, "handle.invalid", ""].includes(
          theirFollowingHandle
        )
        if (validHandle) {
          var reccCount = reccsCopy[theirFollowingHandle]
          reccCount = reccCount ? reccCount + 1 : 1
          reccsCopy[theirFollowingHandle] = reccCount
        }
      })
      setReccCount(reccsCopy)
      setFollowing(myFollowingCopy)
    } catch (error) {
      showError(setError, error)
    }
  }

  // When you have the reccomendation counts ...
  useEffect(() => {
    if (
      Object.keys(reccCount).length != 0 &&
      Object.keys(following).length == 0
    ) {
      const timer = setTimeout(() => handleRecommedationCountSorted(), 250)
      return () => clearTimeout(timer)
    }
  }, [following, reccCount])

  // ... sort the reccomendation counts.
  //
  // This logic produces pretty different results from the user perspective.
  // Based on the type of sorting method used.
  //
  // Sort by `(a, b) => b[1] - a[1]` (eg. highest first)
  // produces a list dominated by popular people.
  //
  // Sort by `() => Math.random() - 0.5)` (eg. random)
  // produces most of less the same output for the "most popular" list,
  // but produces dramatically different results for the "percent following" list.
  //
  // We should probably let the user choose the sorting method???
  const handleRecommedationCountSorted = async () => {
    try {
      const reccCountCopy: { [key: string]: number } = {
        ...reccCount,
      }
      const reccCountSortedCopy: [string, number][] = Object.entries(
        reccCountCopy
      ).sort(() => Math.random() - 0.5)
      setReccCountSorted(reccCountSortedCopy)
      setReccCount({})
    } catch (error) {
      showError(setError, error)
    }
  }

  // When you have the sorted reccomendation counts ...
  useEffect(() => {
    if (reccCountSorted.length != 0) {
      const timer = setTimeout(() => handleReccDetails(), 250)
      return () => clearTimeout(timer)
    }
  }, [reccCountSorted])

  // ... get the details for the reccomendations.
  //
  // "Details" here means any profile information required to
  // display the recommendation to the user.
  const handleReccDetails = async () => {
    try {
      const reccDetailsCopy = [...reccDetails]
      const reccCountSortedCopy = [...reccCountSorted]
      const shiftedItem = reccCountSortedCopy.shift()

      if (!shiftedItem) {
        console.error("No handle found to process.")
        reccCountSortedCopy.pop()
        setReccCountSorted(reccCountSortedCopy)
        return
      }

      const [handle, myFollowers] = shiftedItem
      if (!handle) {
        console.error("No handle found to process.")
        reccCountSortedCopy.pop()
        setReccCountSorted(reccCountSortedCopy)
        return
      }

      const tooManyDetails = reccDetailsCopy.length > 250
      if (tooManyDetails) {
        setReccCountSorted([])
        return
      }

      const tooFewFollowers = followingCopy.length / 10 > myFollowers
      if (tooFewFollowers) {
        setReccCountSorted([])
        return
      }

      const response = await fetch(
        `${process.env.GATSBY_API_URL}/bsky/${handle}/profile`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: { [key: string]: ProfileViewDetailed } = await response.json()
      const profile: ProfileViewDetailed = Object.values(data)[0]

      reccDetailsCopy.push({
        myFollowersCount: myFollowers,
        score: myFollowers / (profile.followersCount ?? 1), // number of my following, divided by number of their followers
        profile: profile,
        folledByMe: followingCopy.includes(profile.handle),
      })

      reccCountSortedCopy.pop()
      setReccCountSorted(reccCountSortedCopy)
      setReccDetails(reccDetailsCopy)
    } catch (error) {
      showError(setError, error)
    }
  }

  // When you have the reccomendation details ...
  useEffect(() => {
    if (reccCountSorted.length == 0 && reccDetailsByScore.length == 0) {
      const timer = setTimeout(() => handleSortDetailedByScore(), 250)
      return () => clearTimeout(timer)
    }
  }, [reccCountSorted, reccDetailsByScore])

  // ... sort the reccomendation details by score.
  const handleSortDetailedByScore = async () => {
    try {
      const reccDetailsCopy = [...reccDetails]
      reccDetailsCopy.sort((a, b) => b.score - a.score)
      setReccDetailsByScore(reccDetailsCopy)
    } catch (error) {
      showError(setError, error)
    }
  }

  const followingComponent = (
    <div>
      <div>
        <h3>Getting reccomendations from followers: {following.length}</h3>
        <h3>Total recc count: {Object.keys(reccCount).length}</h3>
        <h3>Reccs sorted: {reccCountSorted.length}</h3>
        <h3>Reccs detailed: {Object.keys(reccDetails).length}</h3>
        <hr />
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
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
            name="flexRadioDefault"
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
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onClick={() => setShowDetailsByScore(false)}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Sort By Percent Following
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            onClick={() => setShowDetailsByScore(true)}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Sort By Total Following
          </label>
        </div>
        <hr />
      </div>
      <div>
        <ul className="flex flex-column profile-view">
          {(showDetailsByScore
            ? reccDetails.sort((a, b) => b.score - a.score)
            : reccDetails
          ).map((recc) => (
            <li
              style={
                !showFollowedByMe && recc.folledByMe ? { display: "none" } : {}
              }
              key={recc.profile.did}
              className="flex flex-row gap-4"
            >
              <img
                src={recc.profile.avatar}
                alt={recc.profile.displayName}
                className="img-thumbnail"
                width={40}
                height={40}
              />
              <div className="block">
                <p>{recc.profile.displayName}</p>
                <a href={`https://bsky.app/profile/${recc.profile.handle}`}>
                  <p>@{recc.profile.handle}</p>
                </a>
                <p>{recc.profile.description}</p>
                <p>My followers: {recc.myFollowersCount}</p>
                <p>
                  {Math.round(recc.score * 100)}% followed by people I follow
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <Layout>
      <section className="post-body">
        <div className="post-header">
          <h2>
            <p>Bluesky Follow Recommendations</p>
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
              disabled={!handleRef.current?.value}
              onClick={() => {
                setSearchParams({ handle: handleRef.current?.value || "" })
                handleFollowing()
              }}
            >
              Recommendations
            </button>
          </div>
        </div>
        <div className="post-content">
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <div className="flex flex-column gap-4">{followingComponent}</div>
          </div>
        </div>
        <Closer />
      </section>
    </Layout>
  )
}

export default () => {
  return (
    <BrowserRouter>
      <Bsky />
    </BrowserRouter>
  )
}
