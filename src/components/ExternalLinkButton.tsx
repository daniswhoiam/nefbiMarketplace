import React from 'react';
import {MdLaunch} from 'react-icons/md';

const ExternalLinkButton = ({url}: {url: string}) => {
  return (
    <a
      className="mb-0 flex gap-2 rounded-lg bg-atomic-tangerine-light px-4 py-2 items-center"
      href={url}
      target="_blank"
    >
      <p className="m-0 hidden font-bold md:block">
        {url.includes('.pdf') ? 'Quelle öffnen' : 'Hier entlang'}
      </p>
      <MdLaunch className="h-[21px]" size="1rem" />
    </a>
  );
};

export default ExternalLinkButton;
