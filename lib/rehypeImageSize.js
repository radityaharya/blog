// sourced from : https://mmazzarolo.com/blog/2023-07-29-nextjs-mdx-image-size/

import { visit } from 'unist-util-visit'
import getImageSize from 'image-size'

/**
 * Analyzes local markdown/MDX images & videos and rewrites their `src`.
 * Supports both markdown-style images, MDX <Image /> components, and `source`
 * elements. Can be easily adapted to support other sources too.
 * @param {string} options.root - The root path when reading the image file.
 */
const rehypeImageSize = (options) => {
  return (tree) => {
    visit(tree, { type: 'element', tagName: 'img' }, (node) => {
      if (node.properties.width || node.properties.height) {
        return
      }
      // omit external images
      // TODO: maybe find some way to get the image size of external images
      if (node.properties.src.startsWith('http') || node.properties.src.startsWith('https')) {
        return
      }
      const imagePath = `${options?.root ?? ''}${node.properties.src}`
      const imageSize = getImageSize(imagePath)
      node.properties.width = imageSize.width
      node.properties.height = imageSize.height
    })
    visit(tree, { type: 'mdxJsxFlowElement', name: 'Image' }, (node) => {
      const srcAttr = node.attributes?.find((attr) => attr.name === 'src')
      // omit external images
      // TODO: maybe find some way to get the image size of external images
      if (srcAttr.value.startsWith('http') || srcAttr.value.startsWith('https')) {
        return
      }
      const imagePath = `${options?.root ?? ''}${srcAttr.value}`
      const imageSize = getImageSize(imagePath)
      const widthAttr = node.attributes?.find((attr) => attr.name === 'width')
      const heightAttr = node.attributes?.find((attr) => attr.name === 'height')
      if (widthAttr || heightAttr) {
        return
      }
      node.attributes.push({
        type: 'mdxJsxAttribute',
        name: 'width',
        value: imageSize.width
      })
      node.attributes.push({
        type: 'mdxJsxAttribute',
        name: 'height',
        value: imageSize.height
      })
    })
  }
}

export default rehypeImageSize
