import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

/**
 * MetaData component for setting up HTML metadata tags dynamically.
 *
 * This component uses the `react-helmet` library to manage the document head,
 * allowing you to set the page title, description, keywords, and other metadata.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} [props.title] - The title of the page, displayed in the browser tab.
 * @param {string} [props.description] - A brief description of the page content for SEO purposes.
 * @param {string} [props.keywords] - A comma-separated list of keywords for SEO purposes.
 *
 * @example
 * <MetaData
 *   title="Home Page"
 *   description="Welcome to the Mosque Management System"
 *   keywords="mosque, prayer times, Islamic events"
 * />
 */
const MetaData = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title || 'Mosque Management System'}</title>
      <meta
        name="description"
        content={
          description ||
          'Mosque Management System helps in organizing prayer times, managing Islamic events, and providing community services efficiently for mosques and Islamic centers.'
        }
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="keywords"
        content={
          keywords ||
          'mosque management, prayer times, Islamic events, mosque administration, community services, Islamic center, mosque activities'
        }
      />
      <meta name="author" content="Mohammed Shahid" />
    </Helmet>
  );
};

MetaData.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.string,
};

export default MetaData;
