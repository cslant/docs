// docusaurus-plugin-sass handles these imports at build time, but ships no
// declarations, so TypeScript needs to be told they resolve to nothing.
declare module '*.scss';
declare module '*.sass';
