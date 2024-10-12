import * as FintechLogos from '../../assets/fintechs/index';

const allFintechs= ['alipay', 'amex', 'code-front', 'code', 'diners', 'discover', 'elo', 'generic', 'hiper', 'hipercard', 'jcb', 'maestro', 'mastercard', 'mir', 'paypal', 'unionpay', 'visa']

type FintechLogoProps = {
    company: string;
    corners: 'none' | 'sm' | 'md' | 'lg' | 'xl',
    style: 'mono' | 'flat' | 'logo',
    height: '12px' | '16px' | '20px' | '24px' | '28px' | '32px' | '40px' | '60px',
    hasOutline: boolean;
    __juno?: any
}

export default function FintechLogo({
        company = 'visa',
        corners = 'none',
        style = 'logo',
        height = '16px',
        hasOutline = false,
        __juno = {},
      }: FintechLogoProps) {
    
    const logoType = style || 'logo';
    const logoKey = `${company}${logoType.charAt(0).toUpperCase() + logoType.slice(1)}`;
    const logoSvg = FintechLogos[logoKey];

    const borderStyle = hasOutline ? 'border border-base-200' : '';

    const classes = `flex-shrink-0 flex-grow-0 rounded-${corners} ${borderStyle}`;

    const aspect = 780 / 500
    const heightInt: number = parseInt(height)
    const imageStyles = {
        backgroundImage: logoSvg ? `url(${logoSvg})` : placeholderImg(),
        backgroundSize: 'cover',
        height: height,
        width: `${Math.round(heightInt * aspect)}px`
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
                    <rect x="0" y="0" width="100" height="100" fill="#EEEEEE" />
                    <circle cx="50" cy="50" r="30" fill="#CCCCCC" /> 
                 </svg>`;
    return `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
}




