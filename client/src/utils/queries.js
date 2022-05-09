import { gql } from "@apollo/client";

export const GET_IMAGES = gql`
    query NasaQuery($q: String!, $from: Int!) {
        items(q: $q, from: $from){
          href
          data{
            center
            title
            media_type
            description
          }
          links{
            href
            rel
          }
        }
    }`;
