import React from 'react';
import Link from '@docusaurus/Link';
import type {Project} from '../data/catalog';

export default function ProjectCard({project}: {project: Project}) {
  return <article className="project-card">
    <div className="card-top"><span className="project-platform">{project.platformTags[0]}</span><span className="maturity">{project.maturity}</span></div>
    <h3><Link to={project.projectUrl}>{project.name}<span aria-hidden="true"> ↗</span></Link></h3>
    <p>{project.summary}</p>
    <div className="project-tags">{project.platformTags.map(tag => <span key={tag}>{tag}</span>)}</div>
    <div className="card-links"><Link to={project.documentationUrl}>Documentation <span aria-hidden="true">↗</span></Link>{project.sourceUrl && <Link to={project.sourceUrl}>Source <span aria-hidden="true">↗</span></Link>}</div>
  </article>;
}
