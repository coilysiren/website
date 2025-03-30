import React, { ReactElement } from "react"
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs"

interface IExpandedProfileDetails {
  profile: ProfileViewDetailed
  score?: number
  myFollowers?: number
}

const getProfileList = (
  profileDetails: IExpandedProfileDetails[],
  extra: ((details: IExpandedProfileDetails | null) => ReactElement) | null
) => {
  return (
    <ul className="flex flex-column profile-view">
      {profileDetails.map((details, index) => (
        <li key={index} className="flex flex-column">
          <div className="flex flex-row align-items-center">
            <img
              src={details.profile.avatar}
              alt={details.profile.displayName}
              className="img-thumbnail"
              width={40}
              height={40}
            />
            <div>
              <p>{details.profile.displayName}</p>
              <a href={`https://bsky.app/profile/${details.profile.handle}`}>
                <p>@{details.profile.handle}</p>
              </a>
            </div>
          </div>
          {extra ? (
            <>
              <hr />
              {extra(details)}
            </>
          ) : null}
          <hr />
          {details.profile.description?.split("\n").map((line, idx) => (
            <p className="profile-description" key={idx}>
              {line}
            </p>
          ))}
        </li>
      ))}
    </ul>
  )
}

export { IExpandedProfileDetails, getProfileList }
