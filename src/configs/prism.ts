import { themes as prismThemes } from "prism-react-renderer";

const PrismConfig = {
  theme: prismThemes.github,
  darkTheme: prismThemes.dracula,
  additionalLanguages: [
    'java',
    'latex',
    'haskell',
    'matlab',
    'php',
    'bash',
    'diff',
    'json',
    'scss',
    'yaml',
    'docker',
  ],
};

export default PrismConfig;
