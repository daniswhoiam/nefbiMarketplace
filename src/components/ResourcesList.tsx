import React from 'react';
import PropTypes from 'prop-types';
import {Resource} from '../utils/interfaces';
import Card from './Card';

const ResourcesListPropTypes = {
  currentItems: PropTypes.array,
};

const ResourcesList = ({
  currentItems = [],
}: {
  currentItems?: Array<Resource>;
}) => {
  return (
    <div className="grid grow grid-cols-1 gap-2 sm:grid-cols-2">
      {currentItems &&
        currentItems.length > 0 &&
        currentItems?.map((resource, index) => {
          return <Card resource={resource} key={index} />;
        })}
    </div>
  );
};

ResourcesList.propTypes = ResourcesListPropTypes;

export default ResourcesList;
