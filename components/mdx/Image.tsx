import NextImage, { ImageProps } from 'next/image'

const Image = ({ src, ...rest }: ImageProps) => {
  const isGif = typeof src === 'string' && src.endsWith('.gif')
  const isExternal = typeof src === 'string' && (src.startsWith('http') || src.startsWith('https'));

  if (!isExternal) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <NextImage
          src={src}
          {...rest}
          className="rounded"
          unoptimized={isGif}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
    )
  }

  return (
    <div className="imageContainer w-full aspect-[2/1]">
      <NextImage
        src={src}
        {...rest}
        fill
        className="nextImage p-0 rounded overflow-hidden"
        unoptimized={isGif}
      />
    </div>
  )
}

export default Image