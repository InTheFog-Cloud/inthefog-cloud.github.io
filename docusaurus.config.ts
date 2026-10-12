import type {Config} from '@docusaurus/types';
import type {Options, ThemeConfig} from '@docusaurus/preset-classic';

const config: Config = {
  title: 'InTheFog',
  tagline: 'Find your way through hybrid cloud.',
  favicon: 'img/fog-mark.svg',
  url: 'https://inthefog.cloud',
  baseUrl: '/',
  organizationName: 'InTheFog-Cloud',
  projectName: 'inthefog-cloud.github.io',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  i18n: {defaultLocale: 'en', locales: ['en']},
  presets: [['classic', {
    docs: {sidebarPath: './sidebars.ts', routeBasePath: 'docs'},
    blog: false,
    theme: {customCss: './src/css/custom.css'},
  } satisfies Options]],
  themeConfig: {
    image: 'img/social-card.svg',
    colorMode: {defaultMode: 'dark', respectPrefersColorScheme: true},
    navbar: {
      title: 'InTheFog',
      logo: {alt: '', src: 'img/fog-mark.svg'},
      items: [
        {to: '/projects/', label: 'Projects', position: 'left'},
        {to: '/docs/', label: 'Documentation', position: 'left'},
        {to: '/about/', label: 'About', position: 'left'},
        {href: 'https://github.com/InTheFog-Cloud', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {title: 'Explore', items: [{label: 'Projects', to: '/projects/'}, {label: 'Documentation', to: '/docs/'}]},
        {title: 'Connected', items: [{label: 'Azure Local', href: 'https://azurelocal.cloud'}, {label: 'HCS Labs', href: 'https://labs.hybridsolutions.cloud'}]},
        {title: 'InTheFog', items: [{label: 'About', to: '/about/'}, {label: 'GitHub', href: 'https://github.com/InTheFog-Cloud'}]},
      ],
      copyright: `© ${new Date().getFullYear()} InTheFog · A Hybrid Cloud Solutions project.`,
    },
  } satisfies ThemeConfig,
};
export default config;
