import clsx from 'clsx'
import {
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

const Image = forwardRef<HTMLImageElement, Props>(
  ({ alt = '', className, preSrc, src, srcSet, ...props }, ref) => {
    const imageRef = useRef<HTMLImageElement>(null)
    const [isLoading, setIsLoading] = useState(true)

    const handleError = useCallback(() => {
      setIsLoading(false)
    }, [])

    const handleLoad = useCallback(() => {
      setIsLoading(false)
    }, [])

    useEffect(() => {
      if (!imageRef.current?.complete) return

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

    useEffect(() => {
      if (!isLoading || imageRef.current?.complete) return

      const requestID = requestAnimationFrame(() => {
        if (imageRef.current?.complete) {
          setIsLoading(false)
        }
      })

      return (): void => {
        cancelAnimationFrame(requestID)
      }
    }, [isLoading, imageRef])

    return (
      <img
        alt={alt}
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
)

Image.displayName = 'Image'

export default Image