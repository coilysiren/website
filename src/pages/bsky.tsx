import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Closer from "../components/closer"
import {
  ProfileView,
  ProfileViewDetailed,
} from "@atproto/api/dist/client/types/app/bsky/actor/defs"

interface ICreditability {
  handle: string
  percent: number
}

const Bksy = () => {
  const [recommendedHandles, setReccommendedHandles] = useState<string[]>([])
  const [reccomendsPage, setReccomendsPage] = useState<number>(0)
  const [reccomendsLoaded, setReccomesLoaded] = useState<boolean>(false)
  const [credibilities, setCredibilities] = useState<ICreditability[]>([])
  const myHandle = "coilysiren.me"

  console.log("component remounted")

  if (recommendedHandles.length != 0 && reccomendsPage != -1) {
    setTimeout(() => handleGetReccommendedHandles(), 1000)
  }

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

      // Randomize the order of the handles.
      // This is done to prevent the same handles from being recommended in the same order.
      thisRecommendedHandles.sort(() => Math.random() - 0.5)

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
    } catch (error) {
      console.error("Error fetching reccomended handles:", error)
      return
    }
  }

  if (reccomendsPage == -1) {
    setTimeout(() => handleGetCredibilities(), 1000)
  }

  const handleGetCredibilities = async () => {
    try {
      const recommendedHandlesCopy = recommendedHandles.slice() // Create a copy
      recommendedHandlesCopy.sort(() => Math.random() - 0.5) // Randomize the order
      const theirHandle = recommendedHandlesCopy.pop() // Remove last item

      if (!theirHandle) return
      const response = await fetch(
        `${process.env.GATSBY_API_URL}/bsky/${myHandle}/credibility/${theirHandle}/percent`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const thisCredibility: ICreditability = {
        handle: theirHandle,
        percent: data,
      }

      const credibilitiesCopy = credibilities.slice() // Create a copy
      const thisCredibilities = credibilitiesCopy.concat(thisCredibility)
      thisCredibilities.sort((a, b) => a[1] - b[1])

      setCredibilities(() => thisCredibilities)
      setReccommendedHandles(() => recommendedHandlesCopy)

      console.log(`data: ${data}`)
      console.log(`thisCredibility: ${thisCredibilities}`)
      console.log(
        `recommendedHandlesCopy?.length: ${recommendedHandlesCopy?.length}`
      )

      if (recommendedHandles?.length == 0) {
        return
      }
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
              <li key={credibility.handle} className="flex flex-row gap-4">
                <a href={`https://bsky.app/profile/${credibility.handle}`}>
                  @{credibility.handle}
                </a>
                <p>{credibility.percent}</p>
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
