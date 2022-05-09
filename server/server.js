import express from 'express';
import expressGraphQL from 'express-graphql';
import fetch from 'node-fetch';
import cors from 'cors';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql';
const app = express()
app.use(cors());

const fetchData = async (q,page=1)=>{
  try {
    const url = `https://images-api.nasa.gov/search?q=${q}&page=${page}`;
    const res = await fetch(url);
    const nasaData = await res.json();
    return nasaData.collection.items;
  } catch (err) {
    console.log(err.message); //can be console.error
    return [];
  }
}

const ImageType = new GraphQLObjectType({
  name: 'NasaImage',
  description: 'This represents a Nasa Image Type',
  fields: () => ({
    href: { type: GraphQLNonNull(GraphQLString) },
    data: { type: GraphQLList(ImageDataType) },
    links: { type: GraphQLList(ImageDataLinks) }
  })
})
const ImageDataType = new GraphQLObjectType({
  name: 'NasaImageData',
  description: 'This represents a Nasa Image Data Type',
  fields: () => ({
        center: { type: GraphQLNonNull(GraphQLString) },
				title: { type: GraphQLNonNull(GraphQLString) },
				photographer: { type: GraphQLNonNull(GraphQLString) },
				location: { type: GraphQLNonNull(GraphQLString) },
				nasa_id: { type: GraphQLNonNull(GraphQLString) },
				date_created: { type: GraphQLNonNull(GraphQLString) },
				media_type: { type: GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLNonNull(GraphQLString) }
  })
})

const ImageDataLinks = new GraphQLObjectType({
  name: 'NasaImageLinks',
  description: 'This represents a Nasa Image Data',
  fields: () => ({
        href: { type: GraphQLNonNull(GraphQLString) },
				rel: { type: GraphQLNonNull(GraphQLString) },
				render: { type: GraphQLNonNull(GraphQLString) },
  })
})

const SearchQueryType = new GraphQLObjectType({
  name: 'NasaQuery',
  description: 'Nasa Query',
  fields: () => ({
    items: {
      type: new GraphQLList(ImageType),
      description: 'A List of NASA Images',
      args: {
        q: { type: GraphQLString },
        from: { type: GraphQLInt}
      },
      // change to function to retrieve data from api
      resolve: async (parent, args) => await fetchData(args.q,args.from)
    },
  })
})

const schema = new GraphQLSchema({
  query: SearchQueryType
})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))
app.listen(9000, () => console.log('Server Running'))