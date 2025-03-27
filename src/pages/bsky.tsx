import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Closer from "../components/closer"
import {
  ProfileView,
  ProfileViewDetailed,
} from "@atproto/api/dist/client/types/app/bsky/actor/defs"

const Bksy = () => {
  const [recommendedHandles, setReccommendedHandles] = useState<string[]>([])
  const [reccomendsPage, setReccomendsPage] = useState<number>(0)
  const [reccomendsLoaded, setReccomesLoaded] = useState<boolean>(false)
  const [credibilities, setCredibilities] = useState<[string, number][]>([])
  const myHandle = "coilysiren.me"

  console.log("component remounted")

  const handleGetReccommendedHandles = async () => {
    try {
      const response = await fetch(
        `${process.env.GATSBY_API_URL}/bsky/${myHandle}/recommendations/${reccomendsPage}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const thisRecommendedHandles = Array.from(
        new Set((recommendedHandles || []).concat(data.reccomendations))
      )
      setReccomendsPage(() => data.next)
      setReccommendedHandles(() => thisRecommendedHandles)
      console.log(data)
      console.log(
        `recommendedHandles?.length: ${thisRecommendedHandles?.length}`
      )

      if (data.next === -1) {
        setReccomesLoaded(() => true)
        return
      }

      // This should never happen under normal circumstances
      if (data.reccomendations.length === 0) {
        setReccomesLoaded(() => true)
        return
      }

      // Wait for a bit before running again to avoid rate limiting
      setTimeout(handleGetReccommendedHandles, 1000)
    } catch (error) {
      console.error("Error fetching reccomended handles:", error)
      return
    }
  }

  const handleGetCredibilities = async () => {
    try {
      const recommendedHandlesCopy = [...(recommendedHandles || [])] // Create a copy
      const theirHandle = recommendedHandlesCopy.pop() // Remove last item

      if (!theirHandle) return
      const response = await fetch(
        `${process.env.GATSBY_API_URL}/bsky/${myHandle}/credibility/${theirHandle}/percent`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const thisCredibility: [string, number] = [theirHandle || "", data]

      setCredibilities((prev) => [...(prev || []), thisCredibility])
      setReccommendedHandles(recommendedHandlesCopy)

      console.log(`data: ${data}`)
      console.log(`thisCredibility: ${thisCredibility}`)
      console.log(`credibilities: ${credibilities}`)

      if (recommendedHandles?.length == 0) {
        return
      }

      // Wait for a bit before running again to avoid rate limiting
      setTimeout(handleGetCredibilities, 1000)
    } catch (error) {
      console.error("Error fetching credibility:", error)
      return
    }
  }

  const followingComponent = (
    <div>
      <h2>Reccomendations</h2>
      {!reccomendsLoaded ? (
        <div>
          <h3>Handles loaded: {recommendedHandles?.length}</h3>
          <button onClick={handleGetReccommendedHandles}>
            <h3>Load More Handles</h3>
          </button>
        </div>
      ) : (
        <div></div>
      )}
      {reccomendsLoaded ? (
        <div>
          <button onClick={handleGetCredibilities}>
            <h3>Get Credibilities</h3>
          </button>
          <ul>
            {credibilities?.map((credibility) => (
              <li key={credibility[0]} className="flex flex-row gap-4">
                <a href={`https://bsky.app/profile/${credibility[0]}`}>
                  @{credibility[0]}
                </a>
                <p>{credibility[1]}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
      {/* <ul className="flex flex-column profile-view">
        {following.map((profile: ProfileViewDetailed) => (
          <li key={profile.did} className="flex flex-row gap-4">
            <img
              src={profile.avatar}
              alt={profile.displayName}
              className="img-thumbnail"
              width={40}
              height={40}
            />
            <div className="flex flex-column">
              <p>{profile.displayName}</p>
              <a href={`https://bsky.app/profile/${profile.handle}`}>
                <p>@{profile.handle}</p>
              </a>
              <p>{profile.description}</p>
            </div>
          </li>
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
