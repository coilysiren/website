import React, { ReactElement } from "react"
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs"

interface IExpandedProfileDetails {
  myFollowersCount: number
  folledByMe: boolean
  score: number
  profile: ProfileViewDetailed
}

const getProfileList = (
  profileDetails: IExpandedProfileDetails[],
  extra: ((details: IExpandedProfileDetails | null) => ReactElement) | null
) => {
  return (
    <ul className="flex flex-column profile-view">
      {profileDetails.map((suggestion, index) => (
        <li key={index} className="flex flex-column">
          <div className="flex flex-row align-items-center">
            <img
              src={suggestion.profile.avatar}
              alt={suggestion.profile.displayName}
              className="img-thumbnail"
              width={40}
              height={40}
            />
            <div>
              <p>{suggestion.profile.displayName}</p>
              <a href={`https://bsky.app/profile/${suggestion.profile.handle}`}>
                <p>@{suggestion.profile.handle}</p>
              </a>
            </div>
          </div>
          {extra ? (
            <>
              <hr />
              {extra(null)}
            </>
          ) : null}
          <hr />
          {suggestion.profile.description?.split("\n").map((line, idx) => (
            <p className="profile-description" key={idx}>
              {line}
            </p>
          ))}
        </li>
      ))}
    </ul>
  )
}

export default getProfileList
