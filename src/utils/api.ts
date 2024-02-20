import {ApisauceInstance, create, ApiResponse} from 'apisauce';
import {Resource} from './interfaces';
import {Filter} from './handleFilter';
import getConfig from 'next/config';

const {publicRuntimeConfig: config} = getConfig();

export type GetParameters = {
  user_field_names: boolean;
  page: number;
  size: number;
  search?: string;
  order_by?: string;
  filters?: Filter;
  exclude?: string;
};

export type GetResponseParams = {
  count: number | null;
  next: string | null;
  previous: string | null;
};

export interface GetResults extends GetResponseParams {
  results: Resource[] | null;
}

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  constructor() {
    // Get the token based on the environment
    const token =
      'ROLbnzmXhD3YL9wlnGFNVDnN22P76Et8' ||
      process.env.DATABASE_TOKEN ||
      config.DATABASE_TOKEN;

    // Construct the apisauce instance
    this.apisauce = create({
      baseURL: 'https://api.baserow.io/api/',
      timeout: 10000,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  }

  async getResources(params: GetParameters): Promise<GetResults> {
    const {filters, ...otherParams} = params;

    const apiParams = filters
      ? {
          ...otherParams,
          filters: String(JSON.stringify(filters)).replace(
            /filterType/g,
            'filter_type',
          ),
        }
      : otherParams;

    const response: ApiResponse<any> = await this.apisauce.get(
      'database/rows/table/248102/',
      apiParams,
    );

    // https://api.baserow.io/api/database/rows/table/248102/?user_field_names=true&page=1&size=6&exclude=Zuletzt+ge%C3%A4ndert,Ge%C3%A4ndert+von,Erstellt+am,Erstellt+von&search=&filters=%7B%22filterType%22:%22AND%22,%22filters%22:[],%22groups%22:[%7B%22filterType%22:%22OR%22,%22filters%22:[%7B%22field%22:%22thema%22,%22type%22:%22equal%22,%22value%22:%22Inklusion+und+Diversit%C3%A4t%22%7D],%22groups%22:[]%7D]%7D

    const zeroResult = {
      count: null,
      next: null,
      previous: null,
      results: null,
    };

    // the typical ways to die when calling an api
    if (!response.ok) {
      return zeroResult;
    }

    // transform the data into the format we are expecting
    try {
      const results = response.data.results.map((resource: any) => {
        resource = {
          beschreibung: resource.beschreibung,
          id: resource.id,
          thema: resource.thema.map((thema: any) => thema.value),
          titel: resource.titel,
          url: resource.link,
          format: resource.format.value,
          author: resource.author,
          altersgruppe: resource.altersgruppe.map(
            (altersgruppe: any) => altersgruppe.value,
          ),
          erscheinungsjahr: resource.erscheinungsjahr,
          herausgeber: resource.herausgeber,
        } as Resource;
        return isResourceComplete(resource) ? resource : null;
      });

      // Filter all null values from results
      results.filter((result: Resource) => result !== null);

      return {
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
        results: results,
      };
    } catch {
      return zeroResult;
    }
  }
}

function isResourceComplete(resource: Resource): boolean {
  for (const value of Object.values(resource)) {
    if (
      typeof value === 'string' &&
      (value === '' || value === 'null' || value === 'undefined')
    ) {
      return false;
    }

    if (
      Array.isArray(value) &&
      (value.length === 0 || value === null || value === undefined)
    ) {
      return false;
    }
  }

  return true;
}
