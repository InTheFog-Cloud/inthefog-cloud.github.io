import rawProjects from './projects.json';
export type Project = {name: string; summary: string; platformTags: string[]; maturity: string; projectUrl: string; documentationUrl: string; sourceUrl?: string; featured?: boolean};
export const projects: Project[] = rawProjects;
export const platforms = ['Azure Local', 'Hyper-V', 'Azure Arc', 'Hybrid operations'];
