import mime from 'mime-types'
import { DEFAULT_FILE_TYPE, DEFAULT_MIME_TYPE } from './constants'

export const lookup = (url: string): string => (
  mime.lookup(url) || DEFAULT_FILE_TYPE
)

// thin wrapper around the mime-type module, provide a default value
export const getContentType = (content: string): string => (
  mime.contentType(content) || DEFAULT_MIME_TYPE
)
