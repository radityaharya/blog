import NextImage, { ImageProps } from 'next/image'

const Image = ({ src, ...rest }: ImageProps) => {
  const isGif = typeof src === 'string' && src.endsWith('.gif')
  return (
    <div className="imageContainer w-full">
      <NextImage
        src={src}
        {...rest}
        fill
        className="nextImage p-0 rounded overflow-hidden"
        unoptimized={isGif || process.env.NODE_ENV !== 'production'}
      />
    </div>
  )
}

export default Image