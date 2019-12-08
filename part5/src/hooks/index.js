import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type, name) => {
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    name,
    value,
    onChange,
    reset
  };
};

export const useResource = baseUrl => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    let mounted = true;
    const getAll = async () => {
      const { data } = await axios.get(baseUrl);
      const sortedBlogs = data.sort(
        (firstBlog, nextBlog) => nextBlog.likes - firstBlog.likes
      );
      if (mounted) setResources(sortedBlogs);
    };
    getAll();
    return () => {
      mounted = false;
    };
  }, [baseUrl]);

  const create = resource => {
    const res = axios({
      method: 'post',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${resource.token}`
      },
      data: resource
    });
    res.then(res => {
      setResources(resources.concat(res.data));
    });
  };

  const setResource = resources => {
    setResources(resources);
  };

  const service = {
    create,
    setResource
  };

  return [resources, service];
};
