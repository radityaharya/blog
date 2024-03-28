import NextImage, { ImageProps } from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import path from 'path'
import fs from 'fs'

const root = process.cwd()

/**
 * Retrieves an image from a given source.
 * If the source is an external URL, it fetches the image and returns its metadata.
 * If the source is a local file path, it reads the file and returns its metadata.
 * The metadata includes the image dimensions and a low-resolution placeholder.
 * 
 * Reference:
 *  - https://github.com/joe-bell/plaiceholder/blob/main/examples/next/app/(example)/base64/single/page.tsx
 *
 * @param src - The source of the image (URL or file path).
 * @param imageRoot - The root directory for local images. Defaults to 'public'.
 * @returns An object containing the image metadata and a placeholder image.
 * @throws Error if the file path is invalid.
 */
const getImage = async (src: string, imageRoot = 'public') => {
  let buffer: Buffer
  const isExternal = src.startsWith('http')
  if (isExternal) {
    buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()))
  } else {
    let imagePath = path.join(root, imageRoot, src)
    imagePath = path.resolve(imagePath)
    if (!imagePath.startsWith(path.join(root, 'public'))) {
      throw new Error('Invalid path')
    }
    buffer = await fs.promises.readFile(imagePath)
  }

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 })

  return {
    ...plaiceholder,
    img: { src, height, width }
  }
}

/**
 * MDX Image component.
 * Fetches the image and generates a base64 placeholder.
 * @component
 * @param {ImageProps} props - The props for the Image component.
 * @returns {JSX.Element} The rendered Image component.
 */
const Image = async ({ src, ...rest }: ImageProps) => {
  const { img, base64 } = await getImage(src as string)
  const isGif = typeof src === 'string' && src.endsWith('.gif')

  return (
    <div className="flex flex-col justify-start items-start">
      <NextImage
        src={src}
        {...rest}
        className="rounded"
        unoptimized={isGif}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={base64}
        width={img.width}
        height={img.height}
        style={{
          width: '100%',
          height: 'auto'
        }}
      />
    </div>
  )
}

export default Image
