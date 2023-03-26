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

interface FileObject {
  name: string
  type: string
  file?: {
    url: string
    expiry_time: string
  }
  external?: {
    url: string
  }
}

interface FilesResponse {
  id: string
  type: "files"
  files: FileObject[]
}

export interface PostItem {
  Page: TitlePropertyValue
  Slug: RichTextPropertyValue
  Published: CheckboxPropertyValue
  Featured: CheckboxPropertyValue
  Date: DatePropertyValue
  Authors: { people: PersonUser[] }
  Image: URLPropertyValue
  FeaturedImage: FilesResponse
  Description: RichTextPropertyValue
  Category: SelectPropertyValue
}

export interface PostProps extends Omit<Page, "properties"> {
  properties: PostItem
}
