import { gql } from "@apollo/client";


export const DOCUMENTS_QUERY = gql`
    query MyQuery {
        findDemoDocuments {
            elements {
              id
              title
              description
              createdAt
              updatedAt
            }
        }
    }
`;