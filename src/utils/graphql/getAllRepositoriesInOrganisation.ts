export const getRepositoriesQuery = (): string => {
  const query = ` 
  query getRepositoriesQuery($slug: String!, $first: Int = 100) {
    viewer {
      login
    }
    rateLimit {
      limit
      cost
      remaining
      resetAt
      used
    }
    organization(login: $slug) {
      repositories(first: $first, affiliations: ORGANIZATION_MEMBER) {
        nodes {
          nameWithOwner
          isArchived
        }
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
  `;

  return query;
};
