import {useState, useEffect} from 'react';
import {Api} from '../utils/api';

import type {Resource} from '../utils/interfaces';
import type {GetParameters, GetResponseParams} from '../utils/api';

const useFetchData = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [responseParams, setResponseParams] = useState<GetResponseParams>({
    count: null,
    next: null,
    previous: null,
  });
  const apiClient = new Api();

  const fetchData = async (params: GetParameters) => {
    const getResult = await apiClient.getResources(params);
    if (getResult.results) {
      setResources(getResult.results);
    } else {
      setResources([]);
    }
    const paramsResult = {
      count: getResult.count,
      next: getResult.next,
      previous: getResult.previous,
    };
    setResponseParams(paramsResult);
  };

  // Fetch data on first render
  useEffect(() => {
    fetchData({
      user_field_names: true,
      page: 1,
      size: 10,
    });
  }, []);

  return {resources, responseParams, fetchData};
};

export default useFetchData;