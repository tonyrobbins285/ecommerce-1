import React, { useEffect, useState } from 'react';

export default function Checkbox() {
  const [isMounted, setIsMounted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;
  console.log('clicked');

  return (
    <div className="flex" onClick={() => setIsChecked(!isChecked)}>
      <div className="flex h-5 items-center">
        <input
          id="remember"
          aria-describedby="remember"
          type="checkbox"
          checked={isChecked}
          className="h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-300 dark:border-gray-600  dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          required
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
          Remember me
        </label>
      </div>
    </div>
  );
}
