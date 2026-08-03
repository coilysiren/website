import React from "react"
import CaseStudy, { CaseStudyHead } from "../../components/case-study"
import { findFeaturedProject } from "../../data/projects"

const project = findFeaturedProject("ward")

export const Head = () => <CaseStudyHead project={project} />

const WardCaseStudyPage = () => <CaseStudy project={project} />

export default WardCaseStudyPage
