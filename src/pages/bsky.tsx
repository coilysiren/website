import React, { useState } from "react"
import Layout from "../components/layout"
import Closer from "../components/closer"
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs"

interface IReccomendationDetails {
  myFollowersCount: number
  score: number
  profile: ProfileViewDetailed
}

const Bksy = () => {
  const [following, setFollowing] = useState<string[]>([])
  const [myFollowingCount, setMyFollowingCount] = useState<number>(0)
  const [reccomendationCount, setReccomendationCount] = useState<{
    [key: string]: number
  }>({})
  const [reccomendationCountSorted, setReccomendationCountSorted] = useState<
    [string, number][]
  >([])
  const [reccomendationDetails, setReccomendationDetails] = useState<
    IReccomendationDetails[]
  >([])
  const myHandle = "coilysiren.me"

  console.log("component remounted")

  const handleFollowing = async () => {
    try {
      const response = await fetch(
        `${process.env.GATSBY_API_URL}/bsky/${myHandle}/following/handles`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: string[] = await response.json()
      setFollowing(data)
      setMyFollowingCount(data.length)
    } catch (error) {
      console.error("Error fetching following:", error)
      return
    }
  }

  if (Object.keys(following).length != 0) {
    setTimeout(() => handleReccomedationCounts(), 100)
  }

  const handleReccomedationCounts = async () => {
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

      // Generate a "reccomendation" int for each handle that they follow
      // If the handle is already in the reccomendations, increment the count.
      var reccomendationsCopy = { ...reccomendationCount }
      data.forEach((theirFollowingHandle) => {
        const validHandle = !["handle.invalid", ""].includes(
          theirFollowingHandle
        )
        if (validHandle) {
          var reccomendationCount = reccomendationsCopy[theirFollowingHandle]
          reccomendationCount = reccomendationCount
            ? reccomendationCount + 1
            : 1
          reccomendationsCopy[theirFollowingHandle] = reccomendationCount
        }
      })
      console.log("Reccomendations:", reccomendationsCopy)

      setReccomendationCount(reccomendationsCopy)
      setFollowing(myFollowingCopy)
    } catch (error) {
      console.error("Error fetching reccomended handles:", error)
      return
    }
  }

  if (
    Object.keys(reccomendationCount).length != 0 &&
    Object.keys(following).length == 0
  ) {
    setTimeout(() => handleReccomedationCountSorted(), 100)
  }

  const handleReccomedationCountSorted = async () => {
    try {
      const reccomendationCountCopy: { [key: string]: number } = {
        ...reccomendationCount,
      }
      const reccomendationCountSortedCopy: [string, number][] = Object.entries(
        reccomendationCountCopy
      ).sort((a, b) => b[1] - a[1])
      setReccomendationCountSorted(reccomendationCountSortedCopy)
      setReccomendationCount({})
    } catch (error) {
      console.error("Error sorting reccomendations:", error)
      return
    }
  }

  if (reccomendationCountSorted.length != 0) {
    setTimeout(() => handleReccomendationDetails(), 100)
  }

  const handleReccomendationDetails = async () => {
    try {
      const reccomendationDetailsCopy = [...reccomendationDetails]
      const reccomendationCountSortedCopy = [...reccomendationCountSorted]
      const shiftedItem = reccomendationCountSortedCopy.shift()

      if (!shiftedItem) {
        console.error("No handle found to process.")
        reccomendationCountSortedCopy.pop()
        setReccomendationCountSorted(reccomendationCountSortedCopy)
        return
      }

      const [handle, myFollowers] = shiftedItem
      if (!handle) {
        console.error("No handle found to process.")
        reccomendationCountSortedCopy.pop()
        setReccomendationCountSorted(reccomendationCountSortedCopy)
        return
      }

      const tooFewFollowers = myFollowingCount / 10 > myFollowers
      if (tooFewFollowers) {
        console.log("Too few followers, skipping rest of list")
        setReccomendationCountSorted([])
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

      reccomendationDetailsCopy.push({
        myFollowersCount: myFollowers,
        score: myFollowers / (profile.followersCount ?? 1), // number of my following, divided by number of their followers
        profile: profile,
      })

      reccomendationCountSortedCopy.pop()
      setReccomendationCountSorted(reccomendationCountSortedCopy)
      setReccomendationDetails(reccomendationDetailsCopy)
    } catch (error) {
      console.error("Error hydrating reccomendations:", error)
      return
    }
  }

  const followingComponent = (
    <div>
      <h2>Reccomendations</h2>
      <div>
        <h3>Following To Reccomendatins From: {following.length}</h3>
        <h3>
          Reccomendations Counted: {Object.keys(reccomendationCount).length}
        </h3>
        <h3>Reccomendations Sorted: {reccomendationCountSorted.length}</h3>
        <h3>
          Reccomendations Detailed: {Object.keys(reccomendationDetails).length}
        </h3>
        <button onClick={handleFollowing}>
          <h3>Get Data</h3>
        </button>
      </div>
      <div>
        <ul className="flex flex-column profile-view">
          {reccomendationDetails.map((reccomendation) => (
            <li
              key={reccomendation.profile.did}
              className="flex flex-row gap-4"
            >
              <img
                src={reccomendation.profile.avatar}
                alt={reccomendation.profile.displayName}
                className="img-thumbnail"
                width={40}
                height={40}
              />
              <div className="block">
                <p>{reccomendation.profile.displayName}</p>
                <a
                  href={`https://bsky.app/profile/${reccomendation.profile.handle}`}
                >
                  <p>@{reccomendation.profile.handle}</p>
                </a>
                <p>{reccomendation.profile.description}</p>
                <p>my followers: {reccomendation.myFollowersCount}</p>
                <p>score: {reccomendation.score}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* <ul className="flex flex-column profile-view">
        {following.map((profile: ProfileViewDetailed) => (
        ))}
      </ul> */}
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
