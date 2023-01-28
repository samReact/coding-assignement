import { gql } from "@apollo/client";

export const DOCUMENTS_QUERY = gql`
  query MyQuery {
    findDemoDocuments {
      elements {
        id
        title
        description
        updatedAt
      }
    }
  }
`;

export const DOCUMENTS_MUTATION = gql`
  mutation MyMutation($description: String, $title: String, $id: ID!) {
    updateDemoDocument(
      changes: { description: $description, title: $title }
      id: $id
    ) {
      id
    }
  }
`;

export const DOCUMENT_QUERY = gql`
  query MyQuery($id: ID!) {
    getDemoDocument(id: $id) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`;
