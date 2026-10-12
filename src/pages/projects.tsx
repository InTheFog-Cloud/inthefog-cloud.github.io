import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import ProjectCard from '../components/ProjectCard';
import {projects, platforms} from '../data/catalog';

export default function Projects() {
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState('All platforms');
  const visible = useMemo(() => projects.filter(project => (platform === 'All platforms' || project.platformTags.includes(platform)) && `${project.name} ${project.summary} ${project.platformTags.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())), [query, platform]);
  return <Layout title="Projects" description="Discover tools and documentation for Azure Local, Hyper-V, Azure Arc, and hybrid cloud operations."><main className="container directory-page"><p className="eyebrow">Find a useful starting point</p><h1>The project field.</h1><p className="page-lead">Explore the tools, follow their documentation, and see where each project stands.</p>
    <div className="catalog-controls"><div><label htmlFor="project-search">Search projects</label><input id="project-search" type="search" placeholder="Name, platform, or purpose…" value={query} onChange={event => setQuery(event.target.value)}/></div><div><label htmlFor="platform-filter">Platform</label><select id="platform-filter" value={platform} onChange={event => setPlatform(event.target.value)}>{['All platforms', ...platforms].map(option => <option key={option}>{option}</option>)}</select></div></div>
    <p className="result-count" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? 'project' : 'projects'} found</p>
    {visible.length ? <div className="project-grid directory-grid">{visible.map(project => <ProjectCard key={project.name} project={project}/>)}</div> : <div className="empty-state"><h2>No projects match yet.</h2><p>Try another search or show all platforms.</p><button className="fog-button" onClick={() => {setQuery(''); setPlatform('All platforms');}}>Reset filters</button></div>}
  </main></Layout>;
}
