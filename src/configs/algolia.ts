require('dotenv').config();

const AlgoliaConfig = {
  // Docusaurus validates these at build time and reports a clear error when
  // they are missing, so the assertion only silences the env-var widening.
  appId: process.env.ALGOLIA_APP_ID as string,
  apiKey: process.env.ALGOLIA_API_KEY as string,
  indexName: process.env.ALGOLIA_INDEX_NAME || 'cslant',
  contextualSearch: true,
  externalUrlRegex: 'external\\.com|domain\\.com',
  searchParameters: {},
  searchPagePath: process.env.ALGOLIA_SEARCH_PAGE_PATH || 'search',
};

export default AlgoliaConfig;
