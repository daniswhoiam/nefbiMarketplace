import React, {useMemo, useRef, useState} from 'react';
import Select, {ActionMeta, MultiValue, SingleValue} from 'react-select';
import {Resource, FilterFields, Filters, Sort} from '../utils/interfaces';
import {GetParameters} from '../utils/api';
import classNames from 'classnames';
import {Filter} from '../utils/handleFilter';
import {FORMATS} from '../utils/constants';
import {format} from 'path';

export interface AddToFilter {
  (partialFilter: Partial<FilterFields>): void;
}
interface SortOption {
  value: Sort;
  label: string;
}
interface Option {
  value: string;
  label: string;
}

const FilterList = ({
  getParameters,
  setGetParameters,
  resources,
  activeFilterTab,
  mobileSettingsOpen,
  setMobileSettingsOpen,
}: {
  getParameters: GetParameters;
  setGetParameters: React.Dispatch<React.SetStateAction<GetParameters>>;
  resources: Array<Resource>;
  activeFilterTab: string;
  mobileSettingsOpen: boolean;
  setMobileSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const altersgruppen = ['0-3 Jahre', '3-6 Jahre', '6-10 Jahre'];
  const altersgruppenOptions = resultsToOptions(altersgruppen);
  const erscheinungsjahre = ['2013', '2016', '2017', '2018', '2020', '2021', '2022'];
  const erscheinungsjahreOptions = resultsToOptions(erscheinungsjahre);
  // Why does deconstruct not work?
  const filterResetDisabled = Object.keys(getParameters as Object).includes(
    'filters',
  );

  const altersgruppeRef = useRef<any>();
  const erscheinungsjahrRef = useRef<any>();
  const sortRef = useRef<any>();
  const [activeFormats, setActiveFormats] = useState<Array<string>>([]);

  // TO-DO: Get from API
  const sortOptions: Array<SortOption> = [
    {value: {field: 'id', order: 'asc'}, label: 'Relevanz'},
    {
      value: {field: 'titel', order: 'asc'},
      label: 'Alphabetisch - aufsteigend',
    },
    {
      value: {field: 'titel', order: 'desc'},
      label: 'Alphabetisch - absteigend',
    },
    {
      value: {field: 'erscheinungsjahr', order: 'asc'},
      label: 'Erscheinungsjahr - aufsteigend',
    },
    {
      value: {field: 'erscheinungsjahr', order: 'desc'},
      label: 'Erscheinungsjahr - absteigend',
    },
  ];

  /**
   * Handle Change of SingleValue Selects. These create a Filters element in the filter.
   * @param newValue
   * @param triggerAction
   * @param filterField
   */
  function handleSingleValueChange(
    newValue: SingleValue<{value: string}>,
    triggerAction: ActionMeta<{value: string}>,
    filterField: keyof FilterFields,
  ) {
    const value = newValue?.value || undefined;
    let mainFilter = getParameters.filters || new Filter();

    // https://github.com/JedWatson/react-select/issues/1309
    if (triggerAction.action === 'clear') {
      mainFilter = new Filter();
    } else if (value) {
      mainFilter.addToFilters({
        field: filterField,
        type: 'equal',
        value: value,
      });
    } else {
      mainFilter.removeFiltersByField(filterField);
    }

    setGetParameters({
      ...getParameters,
      filters: mainFilter,
    });
  }

  /**
   * Handle change of MultiValue Selects. These ALWAYS create a group in the filter and not only a Filters element.
   * @param newValue
   * @param triggerAction
   * @param filterField
   */
  function handleMultiValueChange(
    newValue: MultiValue<{value: string}>,
    triggerAction: ActionMeta<{value: string}>,
    filterField: keyof FilterFields,
  ) {
    const value = newValue?.map(val => val.value) || undefined;
    let mainFilter = getParameters.filters || new Filter();

    if (triggerAction.action === 'clear') {
      mainFilter = new Filter();
    } else {
      const fieldFilter = mainFilter.getOrAddToGroups(filterField);

      if (value) {
        fieldFilter.setFilters(
          value.map(val => ({
            field: filterField,
            type: 'contains',
            value: val,
          })),
        );
      } else {
        mainFilter.removeSpecificGroup(fieldFilter);
      }
    }

    setGetParameters({
      ...getParameters,
      filters: mainFilter,
    });
  }

  function toggleActiveFormat(format: string) {
    activeFormats.includes(format)
      ? setActiveFormats(activeFormats.filter(element => element !== format))
      : setActiveFormats([...activeFormats, format]);
  }

  return (
    <div
      className={classNames(
        'flex max-h-[943px] w-full grow flex-col gap-6 overflow-scroll bg-[#F7F7F7] px-6 py-4 lg:h-full lg:overflow-auto',
        {['hidden']: activeFilterTab !== 'Filter'},
      )}
    >
      <label htmlFor="altersgruppe">Altersgruppen</label>
      <Select
        instanceId={'altersgruppe'}
        id="altersgruppe"
        name="altersgruppe"
        ref={altersgruppeRef}
        options={altersgruppenOptions}
        placeholder="Alle Altersgruppen"
        isMulti
        closeMenuOnSelect={false}
        onChange={(
          newValue: MultiValue<{value: string}>,
          actionMeta: ActionMeta<{value: string}>,
        ) => {
          handleMultiValueChange(newValue, actionMeta, 'altersgruppe');
        }}
        isClearable={true}
      />
      <Divider />
      <label htmlFor="erscheinungjahr">Erscheinungsjahr</label>
      <Select
        instanceId={'erscheinungsjahr'}
        id="erscheinungsjahr"
        name="erscheinungsjahr"
        ref={erscheinungsjahrRef}
        options={erscheinungsjahreOptions}
        placeholder="Alle Erscheinungsjahre"
        onChange={(newValue: SingleValue<{value: string}>, triggerAction) => {
          handleSingleValueChange(newValue, triggerAction, 'erscheinungsjahr');
        }}
        isClearable={true}
      />
      <Divider />
      <label htmlFor="formate">Formate</label>
      <div className="flex flex-row flex-wrap gap-2">
        {FORMATS.map((option: Option, i) => (
          <Format
            key={i}
            format={option}
            getParameters={getParameters}
            setGetParameters={setGetParameters}
            active={activeFormats.includes(option.value)}
            toggleActiveFormat={toggleActiveFormat}
          />
        ))}
      </div>
      <Divider />
      <label htmlFor="sortierung">Sortieren nach</label>
      <Select
        instanceId={'sortierung'}
        id="sortierung"
        name="sortierung"
        ref={sortRef}
        defaultValue={sortOptions[0]}
        options={sortOptions}
        getOptionLabel={option => option.label}
        onChange={option => {
          if (option == sortOptions[0]) {
            delete getParameters.order_by;
          } else {
            const field = option?.value.field;
            const order = option?.value.order;
            const orderSign = order === 'asc' ? '+' : '-';
            const formattedSortField = field
              ? field.charAt(0).toUpperCase() + field.slice(1)
              : '';
            const orderBy = orderSign + formattedSortField;
            if (formattedSortField !== '') {
              setGetParameters({
                ...getParameters,
                order_by: orderBy,
              });
            }
          }
        }}
      />
      <Divider />
      {/* https://stackoverflow.com/questions/31163693/how-do-i-conditionally-add-attributes-to-react-components */}
      {mobileSettingsOpen ? (
        <button
          className="btn btn-primary text-white"
          onClick={() => setMobileSettingsOpen(false)}
        >
          Suche
        </button>
      ) : (
        ''
      )}
      <button
        className="btn btn-secondary"
        disabled={filterResetDisabled}
        onClick={() => {
          altersgruppeRef.current.clearValue();
          erscheinungsjahrRef.current.clearValue();
          sortRef.current.setValue(sortOptions[0]);
          activeFormats.length = 0;
          delete getParameters.order_by;
          delete getParameters.filters;
          delete getParameters.search;
          setGetParameters({
            ...getParameters,
            search: '',
          });
        }}
      >
        Filter zurücksetzen
      </button>
    </div>
  );
};

function resultsToOptions(arr: Array<any>) {
  return arr.map((val: any) => {
    return {
      value: val == '' ? 'Kein Eintrag' : val,
      label: val == '' ? 'Kein Eintrag' : val,
    } satisfies Option;
  });
}

const Divider = () => {
  //https://larainfo.com/blogs/tailwind-css-divider-line-example
  return <span className="h-[1px] w-full bg-[#DADADA]"></span>;
};

const Format = ({
  format,
  getParameters,
  setGetParameters,
  active,
  toggleActiveFormat,
}: {
  format: Option;
  getParameters: GetParameters;
  setGetParameters: React.Dispatch<React.SetStateAction<GetParameters>>;
  active: boolean;
  toggleActiveFormat: (format: string) => void;
}) => {
  return (
    <button
      className={classNames(
        'grow rounded-md border-2 border-solid border-light-sea-green-light p-2 font-bold text-light-sea-green-light',
        {['bg-white']: !active},
        {['bg-light-sea-green-light']: active},
        {['bg-opacity-10']: active},
      )}
      onClick={() => {
        const mainFilter = getParameters.filters;
        {
          /* If Format is active, remove it from filter */
        }
        if (active) {
          {
            /* To fix multiple Format filters problem */
          }
          const formatFilter = mainFilter
            ?.getGroups()
            .filter(group => group.hasIncludedField('format'))[0];
          const formatFilters = formatFilter
            ?.getAllFilters()
            .find(el => el.value === format.value);
          if (formatFilters) {
            formatFilter?.removeSpecificFilters(formatFilters);
          }
          setGetParameters({
            ...getParameters,
            filters: mainFilter,
          });
        } else {
          {
            /* Otherwise, add it to filter */
          }
          const formatFilter = mainFilter?.getOrAddToGroups('format');
          formatFilter?.addToFilters({
            field: 'format',
            type: 'equal',
            value: format.value,
          });
        }
        toggleActiveFormat(format.value);
      }}
    >
      {format.label}
    </button>
  );
};

export default FilterList;
