import React, { useState } from "react"
import Layout from "../components/layout"
import Closer from "../components/closer"
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs"

interface IRecommendationDetails {
  myFollowersCount: number
  folledByMe: boolean
  score: number
  profile: ProfileViewDetailed
}

const Bksy = () => {
  const [following, setFollowing] = useState<string[]>([])
  const [followingCopy, setMyFollowingCopy] = useState<string[]>([])
  const [showFollowedByMe, setShowFollowedByMe] = useState<boolean>(true)
  const [recommendationCount, setRecommendationCount] = useState<{
    [key: string]: number
  }>({})
  const [recommendationCountSorted, setRecommendationCountSorted] = useState<
    [string, number][]
  >([])
  const [recommendationDetails, setRecommendationDetails] = useState<
    IRecommendationDetails[]
  >([])
  const [recommendationDetailsByScore, setRecommendationDetailsByScore] =
    useState<IRecommendationDetails[]>([])
  const [showDetailsByScore, setShowDetailsByScore] = useState<boolean>(false)

  var myHandle
  // get the "handle" query parameter
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search)
    myHandle = urlParams.get("handle")
  }

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
      console.error("Error fetching following:", error)
      return
    }
  }

  if (Object.keys(following).length != 0) {
    setTimeout(() => handleRecommedationCounts(), 250)
  }

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

      // Generate a "recommendation" int for each handle that they follow
      // If the handle is already in the recommendations, increment the count.
      var recommendationsCopy = { ...recommendationCount }
      data.forEach((theirFollowingHandle) => {
        const validHandle = ![myHandle, "handle.invalid", ""].includes(
          theirFollowingHandle
        )
        if (validHandle) {
          var recommendationCount = recommendationsCopy[theirFollowingHandle]
          recommendationCount = recommendationCount
            ? recommendationCount + 1
            : 1
          recommendationsCopy[theirFollowingHandle] = recommendationCount
        }
      })
      setRecommendationCount(recommendationsCopy)
      setFollowing(myFollowingCopy)
    } catch (error) {
      console.error("Error fetching recommended handles:", error)
      return
    }
  }

  if (
    Object.keys(recommendationCount).length != 0 &&
    Object.keys(following).length == 0
  ) {
    setTimeout(() => handleRecommedationCountSorted(), 250)
  }

  const handleRecommedationCountSorted = async () => {
    try {
      const recommendationCountCopy: { [key: string]: number } = {
        ...recommendationCount,
      }
      const recommendationCountSortedCopy: [string, number][] = Object.entries(
        recommendationCountCopy
      ).sort((a, b) => b[1] - a[1])
      setRecommendationCountSorted(recommendationCountSortedCopy)
      setRecommendationCount({})
    } catch (error) {
      console.error("Error sorting recommendations:", error)
      return
    }
  }

  if (recommendationCountSorted.length != 0) {
    setTimeout(() => handleRecommendationDetails(), 250)
  }

  const handleRecommendationDetails = async () => {
    try {
      const recommendationDetailsCopy = [...recommendationDetails]
      const recommendationCountSortedCopy = [...recommendationCountSorted]
      const shiftedItem = recommendationCountSortedCopy.shift()

      if (!shiftedItem) {
        console.error("No handle found to process.")
        recommendationCountSortedCopy.pop()
        setRecommendationCountSorted(recommendationCountSortedCopy)
        return
      }

      const [handle, myFollowers] = shiftedItem
      if (!handle) {
        console.error("No handle found to process.")
        recommendationCountSortedCopy.pop()
        setRecommendationCountSorted(recommendationCountSortedCopy)
        return
      }

      const tooManyDetails = recommendationDetailsCopy.length > 250
      if (tooManyDetails) {
        setRecommendationCountSorted([])
        return
      }

      const tooFewFollowers = followingCopy.length / 10 > myFollowers
      if (tooFewFollowers) {
        setRecommendationCountSorted([])
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

      recommendationDetailsCopy.push({
        myFollowersCount: myFollowers,
        score: myFollowers / (profile.followersCount ?? 1), // number of my following, divided by number of their followers
        profile: profile,
        folledByMe: followingCopy.includes(profile.handle),
      })

      recommendationCountSortedCopy.pop()
      setRecommendationCountSorted(recommendationCountSortedCopy)
      setRecommendationDetails(recommendationDetailsCopy)
    } catch (error) {
      console.error("Error hydrating recommendations:", error)
      return
    }
  }

  if (
    recommendationCountSorted.length == 0 &&
    recommendationDetailsByScore.length == 0
  ) {
    setTimeout(() => handleSortDetailedByScore(), 250)
  }

  const handleSortDetailedByScore = async () => {
    try {
      const recommendationDetailsCopy = [...recommendationDetails]
      recommendationDetailsCopy.sort((a, b) => b.score - a.score)
      setRecommendationDetailsByScore(recommendationDetailsCopy)
    } catch (error) {
      console.error("Error sorting recommendations by score:", error)
      return
    }
  }

  const followingComponent = (
    <div>
      <h2>Recommendations</h2>
      <div>
        <h3>Following To Get Recommendatins From: {following.length}</h3>
        <h3>
          Recommendations Counted: {Object.keys(recommendationCount).length}
        </h3>
        <h3>Recommendations Sorted: {recommendationCountSorted.length}</h3>
        <h3>
          Recommendations Detailed: {Object.keys(recommendationDetails).length}
        </h3>
        <button onClick={handleFollowing}>
          <h3>Get Data</h3>
        </button>
        <button onClick={() => setShowFollowedByMe(!showFollowedByMe)}>
          <h3>
            {showFollowedByMe
              ? "Showing People I Follow"
              : "Hiding People I Follow"}
          </h3>
        </button>
        <button onClick={() => setShowDetailsByScore(!showDetailsByScore)}>
          <h3>
            {showDetailsByScore
              ? "Sorting By Percent Following"
              : "Sorting By Total Following"}
          </h3>
        </button>
      </div>
      <div>
        <ul className="flex flex-column profile-view">
          {(showDetailsByScore
            ? recommendationDetailsByScore
            : recommendationDetails
          ).map((recommendation) => (
            <li
              style={
                !showFollowedByMe && recommendation.folledByMe
                  ? { display: "none" }
                  : {}
              }
              key={recommendation.profile.did}
              className="flex flex-row gap-4"
            >
              <img
                src={recommendation.profile.avatar}
                alt={recommendation.profile.displayName}
                className="img-thumbnail"
                width={40}
                height={40}
              />
              <div className="block">
                <p>{recommendation.profile.displayName}</p>
                <a
                  href={`https://bsky.app/profile/${recommendation.profile.handle}`}
                >
                  <p>@{recommendation.profile.handle}</p>
                </a>
                <p>{recommendation.profile.description}</p>
                <p>My followers: {recommendation.myFollowersCount}</p>
                <p>
                  {Math.round(recommendation.score * 100)}% followed by people I
                  follow
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
            <a href="https://bsky.app/profile/handle">
              bsky.app/profile/{myHandle}
            </a>
          </h2>
        </div>
        <div className="post-content">
          <div>
            <div className="flex flex-column gap-4">{followingComponent}</div>
          </div>
        </div>
        <Closer />
      </section>
    </Layout>
  )
}

export default Bksy
