import React, { useState } from "react"
import Layout from "../components/layout"
import Closer from "../components/closer"
import {
  ProfileView,
  ProfileViewDetailed,
} from "@atproto/api/dist/client/types/app/bsky/actor/defs"

const Bksy = () => {
  const [following, setFollowing] = useState<ProfileViewDetailed[]>([])
  const [showFollowing, setShowFollowing] = useState<boolean>(true)
  const handle = "coilysiren.me"

  const handleShowFollowing = () => {
    setShowFollowing(!showFollowing)
  }

  const handleGetFollowing = async () => {
    try {
      const response = await fetch(
        `${process.env.GATSBY_API_URL}/bsky/${handle}/following`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: { [key: string]: ProfileViewDetailed } = await response.json()
      const dataFormatted: ProfileViewDetailed[] = Object.values(data)
      setFollowing(dataFormatted)
    } catch (error) {
      console.error("Error fetching following:", error)
    }
  }

  const followingComponent = (
    <div style={!showFollowing ? { display: "none" } : {}}>
      <h2>Following</h2>
      <button onClick={handleGetFollowing}>
        <h3>Get Following</h3>
      </button>
      <ul className="flex flex-column profile-view">
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
      </ul>
    </div>
  )

  return (
    <Layout>
      <section className="post-body">
        <div className="post-header">
          <h2>
            <a href="https://bsky.app/profile/handle">
              bsky.app/profile/{handle}
            </a>
          </h2>
        </div>
        <div className="post-content">
          <div>
            <div className="flex flex-column gap-4">
              <div className="flex flex-row">
                <button onClick={handleShowFollowing}>
                  {showFollowing ? "Hide Following" : "Show Following"}
                </button>
              </div>
              {followingComponent}
            </div>
          </div>
        </div>
        <Closer />
      </section>
    </Layout>
  )
}

export default Bksy
