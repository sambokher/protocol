import { Icon } from '../';

type ImageProps = {
    src?: string;
    placeholderThumbnail?: 'default' | 'ecom_product' | 'vector_illustration',
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down',
    altText?: string,
    width?: '100%' | '50%' | '33%' | '25%' | '75%' | '36px' | '48px' | '64px' | '80px' | '120px',
    maxWidth?: number,
    minWidth?: number,
    height?: '100%' | '50%' | '33%' | '25%' | '75%' | '36px' | '48px' | '64px' | '80px' | '120px',
    maxHeight?: number,
    minHeight?: number,
    corners?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full',
    selfAlign?: 'auto' | 'start' | 'center' | 'end',
    __juno?: any
}

export default function Image({
        src = null,
        placeholderThumbnail = 'default',
        objectFit = 'cover',
        altText = '',
        width = '120px',
        height = '120px',
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        corners = 'none',
        selfAlign = 'auto',
        __juno = {}
      }: ImageProps) {
    
    const noImage = !src || !src.startsWith('https')
    const classes = `flex-shrink-0 rounded-${corners} self-${selfAlign}`
    
    const imageStyles = {
        width: width,
        height: height,
        minWidth: minWidth,
        maxWidth: maxWidth,
        minHeight: minHeight,
        maxHeight: maxHeight,
        backgroundImage: !noImage && `url(${src})`,
        backgroundSize: objectFit,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (<div
            className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
            aria-label={altText} 
            style={imageStyles}
            >
                {noImage && <div className={`relative w-full h-full flex items-center justify-center oveflow-hidden flex-col gap-2 text-xs border rounded-${corners}`}
                style={{ 
                    backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                    color: 'var(--accent)',
                    borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)',
                }}>
                {<Icon icon='image' className='w-5 h-5' />}
                </div>}
            </div>
    )
}


