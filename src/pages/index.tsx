import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ProjectCard from '../components/ProjectCard';
import {projects} from '../data/catalog';

const topics = [
  {number: '01', name: 'Azure Local', detail: 'From deployment planning to day-two operations.', link: '/docs/azure-local/'},
  {number: '02', name: 'Hyper-V private clouds', detail: 'Understand your estate. Design the next one.', link: '/docs/hyper-v/'},
  {number: '03', name: 'Azure Arc', detail: 'Bring distributed infrastructure into a connected operating model.', link: '/docs/azure-arc/'},
  {number: '04', name: 'Hybrid operations', detail: 'Monitoring, resilience, discovery, and repeatable automation.', link: '/docs/hybrid-operations/'},
];

export default function Home() {
  return <Layout title="Find your way through hybrid cloud" description="A connected home for Azure Local, Hyper-V private clouds, Azure Arc, and hybrid infrastructure projects and documentation.">
    <main>
      <section className="hero-fog"><div className="fog-lines" aria-hidden="true"/><div className="container hero-inner">
        <p className="eyebrow"><span className="signal-dot"/> Hybrid cloud. A clearer view.</p>
        <h1>Find your way<br/>through <span>hybrid cloud.</span></h1>
        <p className="hero-copy">Projects, practical documentation, and tools for the infrastructure that lives between your datacenter and the cloud.</p>
        <div className="hero-actions"><Link className="fog-button" to="/projects/">Explore the projects <span aria-hidden="true">↗</span></Link><Link className="text-action" to="/docs/">Start with the documentation <span aria-hidden="true">→</span></Link></div>
        <div className="hero-footnote"><span>AZURE LOCAL</span><span>HYPER-V</span><span>AZURE ARC</span><span>HYBRID OPERATIONS</span></div>
      </div></section>
      <section className="section-space"><div className="container"><div className="section-heading"><div><p className="eyebrow">A connected field of work</p><h2>Choose your terrain.</h2></div><p>Different platforms. Shared operational challenges.<br/>A useful place to begin.</p></div>
        <div className="topic-grid">{topics.map(topic => <Link className="topic-card" key={topic.number} to={topic.link}><span className="topic-number">{topic.number}</span><h3>{topic.name}</h3><p>{topic.detail}</p><span className="topic-arrow" aria-hidden="true">↗</span></Link>)}</div>
      </div></section>
      <section className="section-space featured-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Tools with a purpose</p><h2>Start exploring.</h2></div><Link className="text-action" to="/projects/">All {projects.length} projects <span aria-hidden="true">→</span></Link></div><div className="project-grid">{projects.filter(project => project.featured).map(project => <ProjectCard key={project.name} project={project}/>)}</div></div></section>
      <section className="container closing-note"><p className="eyebrow">Built from work in the field</p><h2>One place to find the next step.</h2><p>InTheFog brings existing projects together. Each keeps its own source, documentation, and identity, with a clearer route between them.</p><Link className="text-action" to="/about/">The idea behind InTheFog <span aria-hidden="true">→</span></Link></section>
    </main>
  </Layout>;
}
