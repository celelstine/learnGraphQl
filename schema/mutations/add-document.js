// schema/mutations/add-document.js
import {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';

import DocumentType from '../types/document';
import DocumentResolver from '../../resolvers/document-resolver';

const DocumentInputType = new GraphQLInputObjectType({
  name: 'DocumentInput',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    text: { type: GraphQLString },
    access: { type: GraphQLString },
    owner: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export default {
  type: DocumentType,
  args: {
    input: { type: new GraphQLNonNull(DocumentInputType) },
  },
  resolve(obj, { input }) {
    // create document
    return DocumentResolver.create(input);
  },
};
