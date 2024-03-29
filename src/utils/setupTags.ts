import {Resource} from './interfaces';

const setupTags = (
  resources: Array<Resource>,
): Array<Array<string | number>> => {
  if (resources == undefined || resources.length == 0) return [];

  // https://stackoverflow.com/questions/42723922/can-you-declare-a-object-literal-type-that-allows-unknown-properties-in-typescri
  const allTags: {[key: string]: number} = {};

  resources.forEach(resource => {
    if (!resource.thema) return;
    resource.thema.forEach(thema => {
      if (allTags[thema]) {
        allTags[thema] = allTags[thema] + 1;
      } else {
        allTags[thema] = 1;
      }
    });
  });

  const newTags: Array<Array<string | number>> = Object.entries(allTags).sort(
    (a, b) => {
      const [firstTag] = a;
      const [secondTag] = b;
      return firstTag.localeCompare(secondTag);
    },
  );

  return newTags;
};

export default setupTags;
