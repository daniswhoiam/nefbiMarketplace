import React, {useMemo, useState, useEffect} from 'react';
import TagList from './TagList';
import FilterList from './FilterList';
import ResourcesList from './ResourcesList';
import Pagination from './Pagination';
import {MdSearch} from 'react-icons/md';
import {FaWindowClose} from 'react-icons/fa';
import {LuSettings} from 'react-icons/lu';
import classNames from 'classnames';
const {Document} = require('flexsearch');
import {
  Resource,
  filterFields,
  searchResult,
  Query,
  Filter,
} from '../utils/interfaces';

const PageSize = 6;

// https://tailwindcomponents.com/component/sidebar-2
const AllResources = (props: any) => {
  const [activeFilterTab, setActiveFilterTab] = useState('Filter');
  const [currentPage, setCurrentPage] = useState(1);
  // https://stackoverflow.com/questions/39713349/make-all-properties-within-a-typescript-interface-optional ; Partial
  // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input ; thema Initialisierung
  const [filterObject, setFilterObject] = useState<Partial<filterFields>>({
    thema: [],
  });
  const [results, setResults] = useState<Array<Resource>>([]);
  const [mobileSettingsOpen, setMobileSettingsOpen] = useState(false);
  const [query, setQuery] = useState<Query<Resource>>({
    search: '',
    filter: {thema: []},
    sort: {
      field: 'id',
      order: 'asc',
    },
  });
  // Get query data
  const data: Array<Resource> = props.props.resources;

  const index = new Document({
    tokenize: 'forward',
    document: {
      index: [
        'beschreibung',
        'thema',
        'titel',
        'url',
        'format',
        'author',
        'altersgruppe',
        'erscheinungsjahr',
        'herausgeber',
      ],
    },
  });

  data.forEach(el => index.add(el));

  useEffect(() => {
    const updateResults = async () => {
      const updatedResults = await searchFilterSort(data, query, index);
      setResults(updatedResults);
    };

    updateResults().catch(console.error);
  }, [query]);

  const filterTabs = ['Filter', 'Themen'];
  const noResults = results.length === 0;

  // Data to be displayed on the current page
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return results.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, results]);

  // If search or filter changes, always go back to page one
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // Disable background scrolling while mobile settings are open
  useEffect(() => {
    if (mobileSettingsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileSettingsOpen]);

  return (
    <section className="relative z-10 grid min-h-[120vh] grid-cols-10 gap-4">
      <div className="z-15 col-span-10 p-2 lg:col-span-3">
        <label className="relative block">
          <span className="sr-only">Suche</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <MdSearch size="20px" color="#686868" />
          </span>
          <input
            className="flex h-11 w-full flex-row items-start rounded-lg border border-solid border-[#DADADA] bg-white py-4 pl-8 pr-2"
            type="search"
            placeholder="Suche"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setQuery({
                ...query,
                search: event.target.value,
              });
            }}
          />
        </label>
        <div
          className={classNames(
            {
              'fixed bottom-0 left-0 flex w-full flex-col items-end justify-end bg-grey-black bg-opacity-50 px-10 backdrop-blur-sm':
                mobileSettingsOpen,
            },
            {hidden: !mobileSettingsOpen},
            'z-50 h-full lg:block lg:pb-[50%]',
          )}
        >
          <button
            className={classNames(
              {'relative bg-white p-6': mobileSettingsOpen},
              {hidden: !mobileSettingsOpen},
            )}
            onClick={() => setMobileSettingsOpen(!mobileSettingsOpen)}
          >
            <FaWindowClose
              className="absolute -left-2.5 -top-1.5"
              size="60px"
              color="rgb(40,40,40)"
            />
          </button>
          {/* Tab Buttons */}
          <div className="mt-4 flex w-full items-center justify-between">
            {filterTabs.map((tab, i) => {
              return (
                <button
                  key={i}
                  onClick={() => setActiveFilterTab(tab)}
                  className={classNames(
                    'min-w-[8rem] rounded-t-md px-8 py-3 font-bold tracking-wider text-white xl:min-w-[10rem]',
                    {'bg-light-sea-green': activeFilterTab == tab},
                    {'bg-[#B1B1B1]': activeFilterTab != tab},
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>
          <FilterList
            activeFilterTab={activeFilterTab}
            query={query}
            setQuery={setQuery}
            results={results}
          />
          <TagList
            activeFilterTab={activeFilterTab}
            query={query}
            setQuery={setQuery}
            resources={results}
          />
        </div>
      </div>
      <div className="z-10 col-span-10 flex flex-col justify-between p-2 lg:col-span-7">
        <div className="mb-4 flex lg:mb-0">
          <button
            className={classNames(
              {'  text-light-sea-green ': !mobileSettingsOpen},
              {'  bg-light-sea-green text-white ': mobileSettingsOpen},
              'mr-4 rounded-lg border-2 border-light-sea-green font-bold lg:hidden',
            )}
            onClick={() => setMobileSettingsOpen(!mobileSettingsOpen)}
          >
            <LuSettings className="h-[24px]" size="3rem" />
          </button>
          <h4 className="h-11 font-sans text-lg font-medium leading-10">
            {Math.max(currentData?.length, results?.length)} Ergebnisse
          </h4>
        </div>
        {noResults ? (
          <div className="grow">Es gibt keine Ergebnisse für diese Suche.</div>
        ) : (
          <div className="flex grow flex-col">
            <ResourcesList currentItems={currentData} />
            <Pagination
              className="pagination-bar mt-8"
              currentPage={currentPage}
              totalCount={results.length}
              pageSize={PageSize}
              siblingCount={2}
              onPageChange={(page: number) => {
                setCurrentPage(page);
                window.scrollTo(0, 0);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default AllResources;

function filterResults(
  baseResults: Array<Resource>,
  filterObject: Partial<filterFields> | Filter<Resource>,
) {
  const filterResults = baseResults.filter((resource: Resource) => {
    const filterResult: boolean[] = [];
    Object.keys(filterObject).forEach(key => {
      const filterValue = filterObject[key as keyof filterFields];
      // When filter is being removed, return all entries
      if (filterValue === 'Alle') {
        filterResult.push(true);
        return;
      }

      const resourceValue = resource[key as keyof Resource];
      // Comparison and handling if user filters for "no value" => show those without value
      if (Array.isArray(resourceValue)) {
        filterResult.push(handleResourceArray(resourceValue, filterValue));
      } else {
        if (filterValue === 'Kein Eintrag') {
          filterResult.push(resourceValue === '');
        } else {
          filterResult.push(resourceValue === filterValue);
        }
      }
    });

    const allFiltersTrue = filterResult.every(val => val);

    return allFiltersTrue;
  });

  return filterResults;
}

function handleResourceArray(
  resourceValue: Array<any>,
  filterValue?: string | string[],
) {
  // https://linguinecode.com/post/how-to-solve-typescript-possibly-undefined-value
  if (filterValue === 'Kein Eintrag') {
    return resourceValue.length == 0;
  } else {
    if (Array.isArray(filterValue)) {
      return handleFilterArray(resourceValue, filterValue);
    } else {
      return resourceValue.includes(filterValue!);
    }
  }
}

function handleFilterArray(resourceValue: Array<any>, filterValue: string[]) {
  if (filterValue.length === 0) {
    return true;
  } else {
    const filtered = filterValue.reduce<string[]>((prev, cur) => {
      if (resourceValue.includes(cur!)) {
        return [...prev, cur];
      } else {
        return prev;
      }
    }, []);
    return filtered.length === filterValue.length;
  }
}

async function getSearchResults(
  data: Resource[],
  index: any,
  searchQuery: string,
): Promise<Resource[]> {
  const searchResults: searchResult[] = await index.search(searchQuery);
  const resultIDs = searchResults.reduce<string[]>((acc, cur) => {
    cur.result.forEach(result => {
      if (!acc.includes(result)) {
        acc.push(result);
        getSearchResults;
      }
    });
    return acc;
  }, []);
  const results: Resource[] = data.filter(resource =>
    resultIDs.includes(resource.id),
  );
  return results;
}

async function searchFilterSort(
  data: Resource[],
  query: Query<Resource>,
  index: any,
): Promise<Resource[]> {
  let results: Resource[] = data;

  // Search
  if (query.search) {
    results = await getSearchResults(data, index, query.search);
  }

  // Filter
  if (
    query.filter &&
    (Object.keys(query.filter).length > 1 || query.filter['thema']!.length > 0)
  ) {
    results = filterResults(results, query.filter);
  }

  // Sort
  if (query.sort && query.sort.field && query.sort.order) {
    const compareFn = (a: Resource, b: Resource) => {
      const valueA = a[query.sort.field as keyof Resource];
      const valueB = b[query.sort.field as keyof Resource];
      if (valueA < valueB) {
        return query.sort.order === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return query.sort.order === 'asc' ? 1 : -1;
      }
      return 0;
    };
    results = [...results.sort(compareFn)];
  }

  return results;
}
