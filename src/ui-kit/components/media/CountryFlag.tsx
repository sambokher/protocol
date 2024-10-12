import { allFlags } from '../../assets/flags/flags';
import * as Flags from '../../assets/flags/index';

const countryNames = allFlags.map(f => f.name); 

type CountryFlagProps = {
    country: string;
    corners: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'full',
    aspectRatio: 'square' | '4x3',
    height: '12px' | '16px' | '20px' | '24px' | '28px' | '32px',
    __juno?: any
}

export default function CountryFlag({
        country = 'United States of America',
        corners = 'none',
        aspectRatio = '4x3',
        height = '16px',
        __juno = {},
      }: CountryFlagProps) {
    
    const classes = `flex-shrink-0 flex-grow-0 rounded-${corners}`

    // Find correct flag SVG
    const flag = allFlags.find(f => f.name === country);
    const aspectSuffix = aspectRatio === 'square' ? '1By1' : '4By3';
    const flagCodeCamel = flag.code
    const flagSvg = Flags[`${flagCodeCamel}${aspectSuffix}`];
    const imageStyles = {
        backgroundImage: flagSvg ? `url(${flagSvg})` : placeholderImg(),
        backgroundSize: 'cover',
        height: height, 
        aspectRatio: aspectRatio === 'square' ? '1 / 1' : '4 / 3'
    };
    
    return (
        <div
        className={`${classes} ${__juno?.outlineStyle}`}
            {...__juno?.attributes}
            style={imageStyles}
        />
    );
}

function placeholderImg() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <rect x="1" y="1" width="100" height="32" fill="#EEEEEE" /> <!-- Top rectangle with lightest grey -->
                    <rect x="1" y="33" width="100" height="34" fill="#CCCCCC" /> <!-- Middle rectangle with medium grey -->
                    <rect x="1" y="67" width="100" height="33" fill="#AAAAAA" /> <!-- Bottom rectangle with darkest grey -->
                 </svg>`;
    return `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
}



