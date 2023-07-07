import React, {useMemo, useRef, useState} from 'react';
import Select, {ActionMeta, MultiValue, SingleValue} from 'react-select';
import {Query, Resource, filterFields, Sort} from '../utils/interfaces';
import {array} from 'prop-types';
import classNames from 'classnames';
import {removeFromFilter, addToFilter} from '../utils/handleFilter';
import {FORMATS} from '../utils/constants';

export interface AddToFilter {
  (partialFilter: Partial<filterFields>): void;
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
  query,
  setQuery,
  results,
  activeFilterTab,
  mobileSettingsOpen,
  setMobileSettingsOpen,
}: {
  query: Query<Resource>;
  setQuery: React.Dispatch<React.SetStateAction<Query<Resource>>>;
  results: Array<Resource>;
  activeFilterTab: string;
  mobileSettingsOpen: boolean;
  setMobileSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  let distinctValues = calcDistinctValues(results, [
    'altersgruppe',
    'erscheinungsjahr',
    'format',
  ]);
  const altersgruppen = ['0-3 Jahre', '3-6 Jahre', '6-10 Jahre'];
  const altersgruppenOptions = resultsToOptions(altersgruppen);
  const erscheinungsjahre = distinctValues.erscheinungsjahr;
  const erscheinungsjahreOptions = resultsToOptions(erscheinungsjahre);
  // Why does deconstruct not work?
  const filterResetDisabled = Object.keys(query.filter).length === 0;

  const altersgruppeRef = useRef<any>();
  const erscheinungsjahrRef = useRef<any>();
  const sortRef = useRef<any>();
  const [activeFormats, setActiveFormats] = useState<Array<string>>([]);

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

  distinctValues = useMemo(() => {
    return calcDistinctValues(results, ['altersgruppe', 'erscheinungsjahr']);
  }, [query]);

  function handleFilterChange(
    newValue: SingleValue<{value: string}>,
    triggerAction: ActionMeta<{value: string}>,
    filterField: keyof filterFields,
  ) {
    let value: string | undefined;
    if (newValue === null || newValue === undefined) {
      value = undefined;
    } else {
      value = newValue.value;
    }
    // https://github.com/JedWatson/react-select/issues/1309
    if (triggerAction.action === 'clear') {
      setQuery({
        ...query,
        filter: removeFromFilter(query.filter, filterField),
      });
    } else {
      setQuery({
        ...query,
        filter: addToFilter(query.filter, {
          [filterField as keyof filterFields]: value,
        }),
      });
    }
  }

  function handleMultiFilterChange(
    newValues: MultiValue<{value: string}>,
    actionMeta: ActionMeta<{value: string}>,
    filterField: keyof filterFields,
  ) {
    let values = newValues.map(value => value.value);
    switch (actionMeta.action) {
      case 'clear':
        setQuery({
          ...query,
          filter: removeFromFilter(query.filter, filterField),
        });
      default:
        setQuery({
          ...query,
          filter: addToFilter(query.filter, {
            [filterField as keyof filterFields]: values,
          }),
        });
    }
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
          handleMultiFilterChange(newValue, actionMeta, 'altersgruppe');
        }}
        isClearable={true}
      />
      <Divider />
      <label htmlFor="erscheinungjahr">Erscheinungsjahr</label>
      <Select
        id="erscheinungsjahr"
        name="erscheinungsjahr"
        ref={erscheinungsjahrRef}
        options={erscheinungsjahreOptions}
        placeholder="Alle Erscheinungsjahre"
        onChange={(newValue: SingleValue<{value: string}>, triggerAction) => {
          handleFilterChange(newValue, triggerAction, 'erscheinungsjahr');
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
            query={query}
            setQuery={setQuery}
            active={activeFormats.includes(option.value)}
            toggleActiveFormat={toggleActiveFormat}
          />
        ))}
      </div>
      <Divider />
      <label htmlFor="sortierung">Sortieren nach</label>
      <Select
        id="sortierung"
        name="sortierung"
        ref={sortRef}
        defaultValue={sortOptions[0]}
        options={sortOptions}
        getOptionLabel={option => option.label}
        onChange={option => {
          setQuery({
            ...query,
            sort: option!.value,
          });
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
          setQuery({
            search: '',
            filter: {thema: []},
            sort: {
              field: 'id',
              order: 'asc',
            },
          });
        }}
      >
        Filter zurücksetzen
      </button>
    </div>
  );
};

function calcDistinctValues(resourceArray: Array<Resource>, keys: string[]) {
  const distinctResults: {[k: string]: any} = {};
  keys.forEach(key => {
    const allKeyValues = resourceArray.reduce<string[]>((prev, cur) => {
      const currentKeyValue: string | string[] = cur[key as keyof Resource];
      if (typeof currentKeyValue == 'string') {
        return [...prev, currentKeyValue];
      } else {
        return [...prev, ...currentKeyValue];
      }
    }, []);
    distinctResults[key as keyof object] = [...new Set(allKeyValues)].sort();
  });
  return distinctResults;
}

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
  query,
  setQuery,
  active,
  toggleActiveFormat,
}: {
  format: Option;
  query: Query<Resource>;
  setQuery: React.Dispatch<React.SetStateAction<Query<Resource>>>;
  active: boolean;
  toggleActiveFormat: (format: string) => void;
}) => {
  return (
    <button
      className={classNames(
        'rounded-md border-2 border-solid border-light-sea-green-light p-2 font-bold text-light-sea-green-light',
        {['bg-white']: !active},
        {['bg-light-sea-green-light']: active},
        {['bg-opacity-10']: active},
      )}
      onClick={() => {
        if (active) {
          {
            /* To fix multiple Format filters problem */
          }
          let formatFilters = query.filter.format || [];
          formatFilters = formatFilters.filter(
            element => element !== format.value,
          );

          setQuery({
            ...query,
            filter: addToFilter(query.filter, {
              ['format' as keyof filterFields]: formatFilters,
            }),
          });
        } else {
          let formatFilters = query.filter.format || [];
          formatFilters = [...formatFilters, format.value];

          setQuery({
            ...query,
            filter: addToFilter(query.filter, {
              ['format' as keyof filterFields]: formatFilters,
            }),
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
