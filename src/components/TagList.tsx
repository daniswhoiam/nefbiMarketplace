import React from 'react';
import PropTypes from 'prop-types';
import {Resource, Query} from '../utils/interfaces';
import setupTags from '../utils/setupTags';
import classNames from 'classnames';
import {removeFromFilter, addToFilter} from '../utils/handleFilter';
import {removeItem} from '../utils/helperFunctions';

const TagListPropTypes = {
  resources: PropTypes.array,
};

const TagList = ({
  query,
  setQuery,
  resources = [],
  activeFilterTab,
}: {
  query: Query<Resource>;
  setQuery: React.Dispatch<React.SetStateAction<Query<Resource>>>;
  resources: Array<Resource>;
  activeFilterTab: string;
}) => {
  const newTags = setupTags(resources);

  // https://stackoverflow.com/questions/40676343/typescript-input-onchange-event-target-value ; Event Type
  // https://bobbyhadz.com/blog/react-check-if-checkbox-is-checked ; If checkbox is checked
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let themen = [event.target.value];
    if (event.target.checked) {
      if ('thema' in query.filter) {
        // https://bobbyhadz.com/blog/typescript-type-undefined-must-have-symbol-iterator ; Solve iterable problem
        themen = [...themen, ...(query.filter['thema'] || [])];
      }
      setQuery({...query, filter: addToFilter(query.filter, {thema: themen})});
    } else {
      themen = [...(query.filter['thema'] || [])];
      if (themen.includes(event.target.value)) {
        themen = removeItem(themen, event.target.value);
        setQuery({
          ...query,
          filter: addToFilter(removeFromFilter(query.filter, 'thema'), {
            thema: themen,
          }),
        });
      }
    }
  };

  return (
    <div
      className={classNames(
        'flex max-h-[943px] w-full grow flex-col gap-6 overflow-scroll bg-[#F7F7F7] px-6 py-4 lg:h-full lg:overflow-auto',
        {
          ['hidden']: activeFilterTab !== 'Themen',
        },
      )}
    >
      {newTags.map((tag, index) => {
        const [text, value] = tag;

        return (
          <div key={index} className="flex items-center">
            {/*https://bobbyhadz.com/blog/react-check-if-checkbox-is-checked*/}
            <input
              value={text}
              type="checkbox"
              onChange={handleChange}
              checked={query.filter['thema']?.includes(text as string)}
            />
            <p
              key={index}
              className="mb-0 ml-2 flex font-medium leading-6 text-gray-500"
            >
              {text} ({value})
            </p>
          </div>
        );
      })}
    </div>
  );
};

TagList.propTypes = TagListPropTypes;

export default TagList;
