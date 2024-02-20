import React, {useState} from 'react';
import {GetParameters} from '../utils/api';
import classNames from 'classnames';
import {Filter} from '../utils/handleFilter';

const TagList = ({
  getParameters,
  setGetParameters,
  fields,
  activeFilterTab,
}: {
  getParameters: GetParameters;
  setGetParameters: React.Dispatch<React.SetStateAction<GetParameters>>;
  fields: Array<any> | null;
  activeFilterTab: string;
}) => {
  // TO DO change with new API
  const newTags = fields
    ?.find(field => field.name === 'thema')
    ?.select_options?.map((option: any) => {
      return [option.value, option.id];
    });

  // https://stackoverflow.com/questions/40676343/typescript-input-onchange-event-target-value ; Event Type
  // https://bobbyhadz.com/blog/react-check-if-checkbox-is-checked ; If checkbox is checked
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let thema = event.target.value;
    const mainFilter = getParameters.filters || new Filter();
    const themenFilter = mainFilter.getOrAddToGroups('thema');
    // If the click checks the checkbox, add the value to the filter
    if (event.target.checked) {
      themenFilter.addToFilters({
        field: 'thema',
        type: 'contains',
        value: thema,
      });
    } else {
      // If the click unchecks the checkbox, remove the value from the filter
      themenFilter.removeSpecificFilters({
        field: 'thema',
        type: 'contains',
        value: thema,
      });
    }
    setGetParameters({...getParameters, filters: mainFilter});
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
      {newTags?.map((tag: string[], index: number) => {
        return <Tag key={index} tag={tag} handleChange={handleChange} />;
      })}
    </div>
  );
};

export default TagList;

const Tag = ({
  tag,
  handleChange,
}: {
  tag: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center">
      <input
        value={tag[0]}
        type="checkbox"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event);
          setChecked(!checked);
        }}
        checked={checked}
      />
      <p className="mb-0 ml-2 flex font-medium leading-6 text-gray-500">
        {tag[0]}
      </p>
    </div>
  );
};
