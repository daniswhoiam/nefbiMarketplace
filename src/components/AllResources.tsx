import React, {useMemo, useState, useEffect, use} from 'react';
import TagList from './TagList';
import FilterList from './FilterList';
import ResourcesList from './ResourcesList';
import Pagination from './Pagination';
import {MdSearch} from 'react-icons/md';
import {FaWindowClose} from 'react-icons/fa';
import {LuSettings} from 'react-icons/lu';
import classNames from 'classnames';
import useFetchData from '../hooks/useFetchData';
import {Filter} from '../utils/handleFilter';

import type {Resource, FilterFields, searchResult} from '../utils/interfaces';
import {GetParameters} from '../utils/api';

const PAGE_SIZE = 6;

// https://tailwindcomponents.com/component/sidebar-2
const AllResources = () => {
  const [activeFilterTab, setActiveFilterTab] = useState('Filter');
  const [currentPage, setCurrentPage] = useState(1);
  // https://stackoverflow.com/questions/39713349/make-all-properties-within-a-typescript-interface-optional ; Partial
  // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input ; thema Initialisierung
  const [mobileSettingsOpen, setMobileSettingsOpen] = useState(false);
  const {resources, responseParams, fetchData} = useFetchData();
  const [getParameters, setGetParameters] = useState<GetParameters>({
    user_field_names: true,
    page: currentPage,
    size: PAGE_SIZE,
    exclude: 'Zuletzt geändert,Geändert von,Erstellt am,Erstellt von',
    search: '',
  });

  const filterTabs = ['Filter', 'Themen'];
  const noResults = resources.length === 0;

  // If search or filter changes, always go back to page one
  useEffect(() => {
    if (
      getParameters.filters?.getAllFilters().length == 0 &&
      getParameters.filters
        ?.getGroups()
        .every(group => group.getAllFilters().length == 0)
    ) {
      const newGetParameters = {...getParameters};
      delete newGetParameters.filters;
      setGetParameters(newGetParameters);
    }
    console.log(JSON.stringify(getParameters.filters));
    fetchData(getParameters);
    setCurrentPage(1);
  }, [getParameters]);

  // Pagination
  useEffect(() => {
    setGetParameters({...getParameters, page: currentPage});
  }, [currentPage]);

  // Disable background scrolling while mobile settings are open

  return (
    <section className="relative z-10 flex min-h-[120vh] flex-col gap-4 lg:grid lg:grid-cols-10">
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
              setGetParameters({
                ...getParameters,
                search: event.target.value,
              });
            }}
          />
        </label>
        <div
          className={classNames(
            {
              'fixed left-0 top-0 flex h-full w-full flex-col items-end bg-grey-black bg-opacity-50 px-10 pt-20 backdrop-blur-sm':
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
            getParameters={getParameters}
            setGetParameters={setGetParameters}
            resources={resources}
            mobileSettingsOpen={mobileSettingsOpen}
            setMobileSettingsOpen={setMobileSettingsOpen}
          />
          <TagList
            activeFilterTab={activeFilterTab}
            getParameters={getParameters}
            setGetParameters={setGetParameters}
            resources={resources}
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
            {responseParams.count} Ergebnisse
          </h4>
        </div>
        {noResults ? (
          <div className="grow">Es gibt keine Ergebnisse für diese Suche.</div>
        ) : (
          <div className="flex grow flex-col">
            <ResourcesList currentItems={resources} />
            <Pagination
              className="pagination-bar mt-8"
              currentPage={currentPage}
              totalCount={responseParams.count || 0}
              pageSize={PAGE_SIZE}
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
