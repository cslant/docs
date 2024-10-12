require('dotenv').config();

const AlgoliaConfig = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
  indexName: process.env.ALGOLIA_INDEX_NAME,
  contextualSearch: true,
  externalUrlRegex: 'external\\.com|domain\\.com',
  searchParameters: {},
  searchPagePath: process.env.ALGOLIA_SEARCH_PAGE_PATH,
};

export default AlgoliaConfig;
