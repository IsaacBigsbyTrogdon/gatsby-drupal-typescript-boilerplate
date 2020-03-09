import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

interface Data {
  placeholderImage: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const Image: React.FunctionComponent = () => {
  const data: Data = useStaticQuery(graphql`
    query {
      placeholderImage: file(
        relativePath: { eq: "gatsby-typescript.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <Img
      fluid={data.placeholderImage.childImageSharp.fluid}
      alt="Gatsby + TypeScript + Drupal"
    />
  );
};

export default Image;
