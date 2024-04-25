import {useEffect, useState} from 'react';
import {Api} from '../utils/api';

const useFetchFields = () => {
  const [fields, setFields] = useState(null);
  const apiClient = new Api();

  useEffect(() => {
    apiClient.getFields().then(fields => {
      setFields(fields);
    });
  }, []);

  return fields;
};

export default useFetchFields;
