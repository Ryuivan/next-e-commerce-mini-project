'use client'

import { useState } from 'react'

import Image from 'next/image'

// Third-party Components
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import classnames from 'classnames'
import { IconButton } from '@mui/material'

type HomeSliderProps = {
  productImages: string[]
}

const HomeSlider = ({ productImages }: HomeSliderProps) => {
  // States
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // Hooks
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      }
    },
    [
      slider => {
        let mouseOver = false
        let timeout: number | ReturnType<typeof setTimeout>

        const clearNextTimeout = () => {
          clearTimeout(timeout as number)
        }

        const nextTimeout = () => {
          clearTimeout(timeout as number)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 3000)
        }

        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      }
    ]
  )

  return (
    <div className='relative w-full rounded-md overflow-hidden'>
      <div ref={sliderRef} className='keen-slider w-full'>
        {productImages &&
          productImages.map((image, index) => (
            <div key={index} className='keen-slider__slide bg-[#f6f6f6] flex justify-center items-center'>
              <Image src={image} alt={`swiper ${index}`} width={500} height={500} />
            </div>
          ))}
      </div>

      {/* Navigation Controls */}
      {loaded && instanceRef.current && (
        <>
          <IconButton
            className={classnames(
              'absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 flex justify-center items-center',
              {
                'opacity-50 cursor-not-allowed': currentSlide === 0
              }
            )}
            onClick={() => instanceRef.current?.prev()}
          >
            <i className='tabler-arrow-left' />
          </IconButton>

          <IconButton
            className={classnames(
              'absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 flex justify-center items-center',
              {
                'opacity-50 cursor-not-allowed': currentSlide === instanceRef.current.track.details.slides.length - 1
              }
            )}
            onClick={() => instanceRef.current?.next()}
          >
            <i className='tabler-arrow-right' />
          </IconButton>
        </>
      )}
    </div>
  )
}

export default HomeSlider
