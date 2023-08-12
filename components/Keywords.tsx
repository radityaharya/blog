import React from "react"
import { SelectOption } from "@notionhq/client/build/src/api-types"

interface Props {
  keywords: SelectOption[]
}

const Keywords: React.FC<Props> = ({ keywords }) => {
  return (
    <div className="flex flex-wrap">
      {keywords.map((keyword) => (
        <span
          key={keyword.id}
          className="text-sm bg-gray-200 text-gray-700 rounded-lg px-2 py-1 mr-2 mb-2 select-none"
        >
          {keyword.name}
        </span>
      ))}
    </div>
  )
}

export default Keywords
