import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const query = graphql`
  {
    allDataJson {
      distinct(field: altersgruppe)
    }
  }
`

const Filter = ({setFilter}: {setFilter: any}) => {
  const data = useStaticQuery(query)
  const altersgruppen = data.allDataJson.distinct

  return (
    <div className="bg-[#F7F7F7] w-full flex flex-col py-4 px-6">
      {/* Altersgruppe */}
      <div>
        <label
          htmlFor="Altersgruppe"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Altersgruppe
        </label>
        <select
          id="Altersgruppe"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={event => {setFilter(event.target.value)}}
        >
          <option selected={true}>Wähle eine Altersgruppe</option>
          {altersgruppen && altersgruppen.length > 0 && altersgruppen.map((entry: string) => {
            return <option value={entry || "Kein Eintrag"}>{entry || "Kein Eintrag"}</option>
          })}
        </select>
      </div>
    </div>
  )
}

export default Filter
