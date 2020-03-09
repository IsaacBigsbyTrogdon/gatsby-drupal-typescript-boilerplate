import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
// import Helmet from 'react-helmet';
// import { StaticQuery, graphql } from 'gatsby';
// eslint-disable-next-line import/extensions
import Header from '../components/Header';
import './layout.scss';

interface Props {
  children?: React.ReactNode;
}

interface Data {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const Layout: React.FunctionComponent<Props> = (props: Props) => {
  const { children } = props;
  const data: Data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0px 1.0875rem 1.45rem',
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>
          ©
          {' '}
          {new Date().getFullYear()}
          , Built with
          {' '}
          <a href="https://www.gatsbyjs.org" target="_blank" rel="noopener noreferrer">Gatsby</a>
          {' '}
          and
          {' '}
          <a href="https://www.drupal.org" target="_blank" rel="noopener noreferrer">Drupal</a>
        </footer>
      </div>
    </>
  );
};
export default Layout;
