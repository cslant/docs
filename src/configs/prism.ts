import { themes as prismThemes } from "prism-react-renderer";

const PrismConfig = {
  theme: prismThemes.oneLight,
  darkTheme: prismThemes.oneDark,
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
