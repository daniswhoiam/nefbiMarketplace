import React from 'react';
import {Resource} from '../utils/interfaces';
import setupTags from '../utils/setupTags';
import {GetParameters} from '../utils/api';
import classNames from 'classnames';
import {Filter} from '../utils/handleFilter';

const TagList = ({
  getParameters,
  setGetParameters,
  resources = [],
  activeFilterTab,
}: {
  getParameters: GetParameters;
  setGetParameters: React.Dispatch<React.SetStateAction<GetParameters>>;
  resources: Array<Resource>;
  activeFilterTab: string;
}) => {
  // TO DO change with new API
  const newTags = setupTags(resources);

  // https://stackoverflow.com/questions/40676343/typescript-input-onchange-event-target-value ; Event Type
  // https://bobbyhadz.com/blog/react-check-if-checkbox-is-checked ; If checkbox is checked
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let thema = event.target.value;
    const mainFilter = getParameters.filters || new Filter();
    const themenFilter = mainFilter.getOrAddToGroups('thema');
    // If the click checks the checkbox, add the value to the filter
    if (event.target.checked) {
      themenFilter.addToFilters({field: 'thema', type: 'equal', value: thema});
    } else {
      // If the click unchecks the checkbox, remove the value from the filter
      themenFilter.removeSpecificFilters({
        field: 'thema',
        type: 'equal',
        value: thema,
      });
    }
    setGetParameters({...getParameters, filters: mainFilter});
  };

  const isChecked = (tag: string) => {
    const mainFilter = getParameters.filters;
    if (mainFilter?.hasGroups()) {
      const groups = mainFilter.getGroups();
      const themenFilter = groups.find(group =>
        group.hasIncludedField('thema'),
      );
      if (themenFilter) {
        const tagFilters = themenFilter.getSpecificFilters({
          field: 'thema',
          type: 'equal',
          value: tag,
        });
        return tagFilters ? true : false;
      } else {
        return false;
      }
    } else {
      return false;
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
              checked={isChecked(text as string)}
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

export default TagList;
