import ButtonIcon from "./ButtonIcon";

type PriceRangeProps = {
    priceRange: { min: string, max: string },
    setPriceRange: (priceRange: { min: string, max: string }) => void
}

export default function PriceRange({priceRange, setPriceRange}: PriceRangeProps) {
    const inputClasses = `w-20 h-9 md:h-7 bg-current-5 text-center rounded focus:ring-1 focus:ring-accent text-xs appearance-none`;
    return (
            <div className="flex flex-row flex-nowrap w-full max-w-full self-auto gap-1 items-center justify-start h-auto text-sm">
                {
                    (priceRange.min || priceRange.max) && 
                    <ButtonIcon
                        size='small'
                        icon='xmark'
                        style='ghost'
                        onClick={() => setPriceRange({ min: '', max: '' })}
                    />
                }
                <span className='mr-2'>$</span>
                <input type="number" placeholder="min" className={inputClasses} 
                    value={priceRange.min} 
                    min={0}
                    max={99999}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                />
                <input type="number" placeholder="max" className={inputClasses} 
                    value={priceRange.max} 
                    min={0}
                    max={99999}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                />
            </div>
    )
}