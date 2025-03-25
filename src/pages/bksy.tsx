import React, { useState } from "react"
import { AtpAgent } from "@atproto/api"
import Layout from "../components/layout"
import Closer from "../components/closer"
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs"

async function getFollowers(
  agent: AtpAgent,
  handle: string,
  follows: Promise<ProfileView[]> = Promise.resolve([]),
  cursor: string = ""
): Promise<ProfileView[]> {
  try {
    const reponse = await agent.app.bsky.graph.getFollowers({
      cursor: cursor,
      actor: handle,
      limit: 100,
    })

    const data = await reponse.data
    follows = follows.then((follows) => follows.concat(data.followers))

    return data.cursor
      ? getFollowers(agent, handle, follows, data.cursor)
      : follows
  } catch (error) {
    console.error(error)
    return []
  }
}

async function getFollowing(
  agent: AtpAgent,
  handle: string,
  follows: Promise<ProfileView[]> = Promise.resolve([]),
  cursor: string = ""
): Promise<ProfileView[]> {
  try {
    const reponse = await agent.app.bsky.graph.getFollows({
      cursor: cursor,
      actor: handle,
      limit: 100,
    })

    const data = await reponse.data
    follows = follows.then((follows) => follows.concat(data.follows))

    return data.cursor
      ? getFollowers(agent, handle, follows, data.cursor)
      : follows
  } catch (error) {
    console.error(error)
    return []
  }
}

const Bksy = () => {
  const [followers, setFollowers] = useState<ProfileView[]>([])
  const [following, setFollowing] = useState<ProfileView[]>([])

  const [showFollowers, setShowFollowers] = useState<boolean>(true)
  const [showFollowing, setShowFollowing] = useState<boolean>(true)

  const params = new URLSearchParams(window.location.search)
  const handle = params.get("handle") || ""

  const handleShowFollowers = () => {
    setShowFollowers(!showFollowers)
  }
  const handleShowFollowering = () => {
    setShowFollowing(!showFollowing)
  }

  const handleGetFollowers = async () => {
    const agent = new AtpAgent({
      service: "https://bsky.social",
    })

    await agent.login({
      identifier: handle,
      password: process.env.BKSY_PASSWORD || "",
    })

    setFollowers(await getFollowers(agent, handle))
  }

  const handleGetFollowing = async () => {
    const agent = new AtpAgent({
      service: "https://bsky.social",
    })

    await agent.login({
      identifier: handle,
      password: process.env.BKSY_PASSWORD || "",
    })

    setFollowing(await getFollowing(agent, handle))
  }

  const followersComponent = (
    <div style={!showFollowers ? { display: "none" } : {}}>
      <h2>Followers</h2>
      <button onClick={handleGetFollowers}>
        <h3>Get Followers</h3>
      </button>
      <ul className="flex flex-column profile-view">
        {followers.map((profile: ProfileView) => (
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

  const followingComponent = (
    <div style={!showFollowing ? { display: "none" } : {}}>
      <h2>Following</h2>
      <button onClick={handleGetFollowing}>
        <h3>Get Following</h3>
      </button>
      <ul className="flex flex-column profile-view">
        {following.map((profile: ProfileView) => (
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
                <button onClick={handleShowFollowers}>
                  {showFollowers ? "Hide Followers" : "Show Followers"}
                </button>
                <button onClick={handleShowFollowering}>
                  {showFollowing ? "Hide Following" : "Show Following"}
                </button>
              </div>
              {followersComponent}
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
