import {useEffect, useState} from 'react';
import {SignStatuses} from '../services/validation/SignStatuses';
import {Validator} from '../services/validation/Validator';

export function useAuthInput(
  type: 'email' | 'password',
  initialValue: string = '',
) {
  const [value, setValue] = useState(initialValue);
  const [fallback, setFallback] = useState(SignStatuses.SUCCESS);

  const setter = (newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value.length === 0) {
        setFallback(SignStatuses.SUCCESS);
        return;
      }
      if (type === 'email') {
        setFallback(new Validator(value).matchMail().getStatus());
      }
      if (type === 'password') {
        setFallback(new Validator(value).matchPassword().getStatus());
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return {value, setter, fallback};
}
