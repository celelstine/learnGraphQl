// schema/index.js

import {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';


// import graphQL datatypes
import UserType from './types/user';
import DocumentType from './types/document';

// import graphQL resolvers
import UserResolver from '../resolvers/user-resolver';
import DocumentResolver from '../resolvers/document-resolver';

// import graphQl mutations
import AddUserMutation from './mutations/add-user';
import AddDocumentMutation from './mutations/add-document';

/* eslint no-unused-expressions: 0 */

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root Query for GraphQL api',
  fields: () => ({
    User: {
      type: new GraphQLList(UserType),
      description: 'User',
      args: {
        id: {
          name: 'userId',
          type: GraphQLString,
        },
      },
      resolve: (obj, { id }) => {
        let userData;
        if (id) {
          // get user by id
          userData = UserResolver.getById(id);
        } else {
          // get all users
          userData = UserResolver.get();
        }
        return userData;
      },
    },
    Document: {
      type: new GraphQLList(DocumentType),
      description: 'Document',
      args: {
        id: {
          name: 'docId',
          type: GraphQLString,
        },
      },
      resolve: (obj, { id }) => {
        let docData;
        if (id) {
          // get document by id
          docData = DocumentResolver.getById(id);
        } else {
          // get all documents
          docData = DocumentResolver.get();
        }
        return docData;
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    AddUser: AddUserMutation,
    AddDocument: AddDocumentMutation,
  }),
});

const dmsSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});


export default dmsSchema;
