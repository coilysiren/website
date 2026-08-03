import React from "react"
import CaseStudy, { CaseStudyHead } from "../../components/case-study"
import { findFeaturedProject } from "../../data/projects"

const project = findFeaturedProject("agent-compose")

export const Head = () => <CaseStudyHead project={project} />

const AgentComposeCaseStudyPage = () => <CaseStudy project={project} />

export default AgentComposeCaseStudyPage
