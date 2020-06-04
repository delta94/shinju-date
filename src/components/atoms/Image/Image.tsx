import clsx from 'clsx'
import React, {
  ForwardRefRenderFunction,
  ImgHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import styles from './Image.module.css'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  preSrc: string
}

const Image: ForwardRefRenderFunction<HTMLImageElement, Props> = (
  { className, preSrc, src, srcSet, ...props },
  ref
) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!imageRef.current || !imageRef.current.complete) return

    setIsLoading(false)
  }, [imageRef])

  useEffect(() => {
    if (!ref) return

    if (typeof ref === 'function') {
      ref(imageRef.current)
    } else {
      ref.current = imageRef.current
    }
  }, [ref, imageRef])

  useEffect(() => {
    setIsLoading(true)
  }, [src, srcSet])

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      className={clsx(styles.image, className, {
        [styles.imageLoading]: isLoading
      })}
      onError={handleError}
      onLoad={handleLoad}
      ref={imageRef}
      src={src}
      srcSet={srcSet}
      style={{ backgroundImage: `url('${preSrc}')` }}
      {...props}
    />
  )
}

export default forwardRef(Image)
