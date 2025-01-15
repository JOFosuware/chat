import React from 'react';

type Props = {}

export default function Spinner({}: Props) {
  return (
    <div className="border-2 animate-spin border-t-myBlue w-5 h-5 rounded-full"></div>
  );
}