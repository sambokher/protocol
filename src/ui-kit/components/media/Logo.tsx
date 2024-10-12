import * as SampleLogos from '../../assets/brand/index';

type LogoProps = {
    type?: 'logo' | 'symbol',
    size?: '20px' | '24px' | '28px' | '36px' | '40px' | '48px' | '60px' | '96px',
    color?: 'normal' | 'inverted',
    customWidth?: number,
    customHeight?: number,
    selfAlign?: 'auto' | 'start' | 'center' | 'end',
    assets?: any,
    __juno?: any
}

/* TODO needs auto swap for inverted logo when dark mode is enabled */

export default function Logo({
        type = 'symbol',
        size = '28px',
        customWidth = null,
        customHeight = null,
        selfAlign = 'auto',
        color = 'normal',
        assets,
        __juno = {},
      }: LogoProps) {
    
    const useLogo = 'sample' 
    
    const sample_symbol = SampleLogos[useLogo+'_symbol']
    const sample_logo = SampleLogos[useLogo]
    const sample_symbol_inverted = SampleLogos[useLogo+'_symbol_inverted']
    const sample_logo_inverted = SampleLogos[useLogo+'_inverted']

    const asset_logo = getComputedStyle(document.documentElement).getPropertyValue('--logo').trim().replace(/^["']|["']$/g, "");
    const asset_logo_inverted = getComputedStyle(document.documentElement).getPropertyValue('--logo_inverted').trim().replace(/^["']|["']$/g, "");
    const asset_symbol = getComputedStyle(document.documentElement).getPropertyValue('--symbol').trim().replace(/^["']|["']$/g, "");
    const asset_symbol_inverted = getComputedStyle(document.documentElement).getPropertyValue('--symbol_inverted').trim().replace(/^["']|["']$/g, "");
    
    
const symbolAsset = assets?.find(asset => asset.api_name == 'symbol')?.file_url || asset_symbol
const symbolInvertedAsset = assets?.find(asset => asset.api_name == 'symbol_inverted')?.file_url || asset_symbol_inverted
const logoAsset = assets?.find(asset => asset.api_name == 'logo')?.file_url || asset_logo
const logoInvertedAsset = assets?.find(asset => asset.api_name == 'logo_inverted')?.file_url || asset_logo_inverted

    const imageOptions = [
        {option: 'symbol', url: color != 'inverted' ? symbolAsset : symbolInvertedAsset}, 
        {option: 'logo', url: color != 'inverted' ? logoAsset : logoInvertedAsset}
    ]
    const fallbackOptions = [
        {option: 'symbol', url: color != 'inverted' ? sample_symbol : sample_symbol_inverted},
        {option: 'logo', url: color != 'inverted' ? sample_logo : sample_logo_inverted}
    ]
    
    const imageURL = imageOptions.find(option => option.option === type)?.url || null;
    const fallbackLogo = fallbackOptions.find(option => option.option === type)?.url || null;
    
    const classes = `flex-shrink-0 self-${selfAlign}` 
    
    const wrapperInlineStyles = {
        width: customWidth ? customWidth : type == 'symbol' && size,
        height: customHeight || size,
        objectFit: 'contain' as React.CSSProperties['objectFit'], 
    }

    return (
        <div
            className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
            style={wrapperInlineStyles}
            > 
            
            <img 
                src={imageURL || fallbackLogo}
                style={wrapperInlineStyles} 
                draggable={false} 
                onError={(e) => { e.currentTarget.src = fallbackLogo}}
                
            />
        </div>   
    )
}

