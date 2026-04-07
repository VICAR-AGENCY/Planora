import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

const suppliers = [
  'Daikin', 'Vaillant', 'Mitsubishi', 'Bosch', 'Viessmann',
  'Atlantic', 'Toshiba', 'LG', 'Samsung', 'Panasonic',
]

export function LogoCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [AutoScroll({ speed: 1, stopOnInteraction: false })]
  )

  return (
    <section className="bg-primary-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-primary-600 mb-8">
          Vertrouwde merken en leveranciers
        </p>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {suppliers.map((name) => (
              <div
                key={name}
                className="flex-none flex h-16 w-40 items-center justify-center rounded-xl bg-white border border-primary-100 px-6"
              >
                <span className="text-sm font-semibold text-primary-400">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
