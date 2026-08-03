import React from "react"
import CaseStudy, { CaseStudyHead } from "../../components/case-study"
import { findFeaturedProject } from "../../data/projects"

const project = findFeaturedProject("ward-mcp")

export const Head = () => <CaseStudyHead project={project} />

const WardMcpCaseStudyPage = () => <CaseStudy project={project} />

export default WardMcpCaseStudyPage
