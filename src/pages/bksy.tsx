import React, { useState } from "react"
import { AtpAgent } from "@atproto/api"
import Layout from "../components/layout"
import Closer from "../components/closer"

interface Follower {
  did: string
  handle: string
  displayName: string
  avatar: string
  description: string
}

async function getFollowers(handle: string): Promise<Follower[]> {
  try {
    const agent = new AtpAgent({
      service: "https://bsky.social",
    })

    await agent.login({
      identifier: "coilysiren.me",
      password: process.env.PASSWORD || "",
    })

    // Step 1: Resolve handle to DID
    const didResponse = await fetch(
      `https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=${handle}`
    )
    const didData = await didResponse.json()
    if (!didData.did) {
      throw new Error("Failed to resolve handle to DID")
    }

    console.log(`Resolved DID: ${didData.did}`)

    // Step 2: Fetch the DID document to get the user's PDS instance
    const didDocResponse = await fetch(`https://plc.directory/${didData.did}`)
    const didDoc = await didDocResponse.json()

    const pdsEndpoint = didDoc?.service?.find(
      (service: { type: string }) =>
        service.type === "AtprotoPersonalDataServer"
    )?.serviceEndpoint
    if (!pdsEndpoint) {
      throw new Error("Failed to determine PDS endpoint")
    }

    // Step 3: Fetch user following from their PDS
    const reponse = await fetch(
      `${pdsEndpoint}/xrpc/app.bsky.graph.getFollows?actor=${didData.did}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${agent.session?.accessJwt}`,
          "Content-Type": "application/json",
        },
      }
    )

    if (!reponse.ok) {
      throw new Error("Failed to fetch")
    }

    const data = await reponse.json()
    return data.follows
  } catch (error) {
    console.error(error)
    return []
  }
}

const Bksy = () => {
  const [data, setData] = useState<Follower[]>([])

  const handleSubmit = async () => {
    setData(await getFollowers("coilysiren.me"))
  }

  return (
    <Layout>
      <section className="post-body">
        <div className="post-header">
          <h2>
            <a href="https://bsky.app/profile/coilysiren.me">
              bsky.app/profile/coilysiren.me
            </a>
          </h2>
        </div>
        <div className="post-content">
          <button onClick={handleSubmit}>
            <h2>Get!</h2>
          </button>
          <ul className="flex flex-col gap-4 items-center sm:items-start">
            {data.map((follower: Follower) => (
              <li key={follower.did} className="flex items-center gap-4">
                <img
                  src={follower.avatar}
                  alt={follower.displayName}
                  className="img-thumbnail"
                  width={120}
                  height={120}
                />
                <div className="flex flex-col">
                  <p>{follower.displayName}</p>
                  <a href={`https://bsky.app/profile/${follower.handle}`}>
                    <p>@{follower.handle}</p>
                  </a>
                  <p>{follower.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Closer />
      </section>
    </Layout>
  )
}

export default Bksy
