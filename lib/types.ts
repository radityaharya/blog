import {
  CheckboxPropertyValue,
  DatePropertyValue,
  Page,
  PersonUser,
  RichTextPropertyValue,
  TitlePropertyValue,
  URLPropertyValue,
  SelectPropertyValue,
  FilesPropertyValue,
} from "@notionhq/client/build/src/api-types"

export interface checkboxValue {
  type: "checkbox"
  checkbox: boolean
}

export interface PostItem {
  Page: TitlePropertyValue
  Slug: RichTextPropertyValue
  Published: CheckboxPropertyValue
  Featured: CheckboxPropertyValue
  Date: DatePropertyValue
  Authors: { people: PersonUser[] }
  Image: URLPropertyValue
  FeaturedImage: FilesPropertyValue
  Description: RichTextPropertyValue
  Category: SelectPropertyValue
  Mailed: checkboxValue
  FeaturedImageUrl: RichTextPropertyValue
}

export interface PostProps extends Omit<Page, "properties"> {
  properties: PostItem
}
