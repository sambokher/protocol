import { useRef, useState } from 'react';
import { Icon } from '../'; 
import { IconType, allIconNames } from '../iconMap';

type FileUploadProps = {
    size?: 'small' | 'medium' | 'large',
    corners?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl',
    fileName?: string,
    width?: 'auto' | '1/2' | 'full',
    label?: string,
    icon?: Extract<IconType, 'cloud-upload' | 'page' | 'close'>;
    dropAreaText?: string,
    secondaryText?: string,
    state?: 'placeholder' | 'focused',
    fileStatus?: 'uploading' | 'uploaded' | 'error',
    onChange?: (files: FileList) => void,
    accept?: string,
    hasOutline?: boolean,
    __juno?: any
}

export default function FileUpload({
        size = 'small',
        corners = "none",
        fileName = "file-name.txt",
        width = "auto",
        label,
        icon = 'cloud-upload',
        dropAreaText = 'Drag your file here or browse files',
        secondaryText,
        state = 'placeholder',
        fileStatus = 'uploading',
        onChange = () => console.log('File uploaded'),
        accept = '',
        hasOutline,
        __juno = {}
      }: FileUploadProps ) {

    
    const [file, setFile] = useState({ name: '' });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('idle'); // 'uploading', 'success', 'error'
    const [isDragOver, setIsDragOver] = useState(false); // Track if drag is over the drop area

    const widthStyle = width != 'auto' ? `w-${width}` : 'w-auto'
    const borderStyles = hasOutline ? `border border-current-20` : '';
    const sizeStyles = size == 'small' ? 'gap-0.5 text-xs' : size == 'large' ? 'gap-1.5 text-base' : 'gap-1 text-sm'
    const classes = `flex flex-col items-stretch justify-start ${sizeStyles} ${widthStyle} ${borderStyles}`

    const labelTextSize = size == 'small' ? `text-xs` :  size == 'large' ? `text-lg`: `text-sm`;
    const labelClasses = `text-base-content ${labelTextSize} font-medium`

    const iconSize = size == 'small' ? '20px' : size == 'large' ? '32px' : '24px'
    const IconComponent = icon ? <Icon icon={icon}  className='flex-shrink-0' size={iconSize}  /> : null;

    const stateStyles = (state === 'focused' || isDragOver) ? 'bg-accent/20 border-accent' : 'bg-current-10 border-current-20';
    const cornerStyles = corners === 'none' ? '' : `rounded-${corners}`;
    const dropAreaSizeClasses = size === 'small' ? 'p-2 gap-0.5' : size === 'large' ? 'p-3 gap-1.5' : 'p-2 gap-1';
    const dropAreaClasses = `w-full h-full relative border-dashed flex flex-col items-center justify-center ${cornerStyles} ${stateStyles} ${dropAreaSizeClasses}`

    
    const barColor = (fileStatus === 'uploading') ? 'info-content' : fileStatus === 'uploaded' ? 'success-content' : 'error-content';
    const truncateStyle = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}
    
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragOver(false);
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            setFile(files[0]);
            handleFileUpload(files[0]);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
            handleFileUpload(files[0]);
            if (onChange) {
                onChange(files); // Only call onChange if files is not null
            }
        }
    };

    const handleFileUpload = (file: File) => {
        setUploadStatus('uploading');
        const formData = new FormData();
        formData.append('file', file);

        // Simulate an API call
        fetch('/upload-endpoint', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    setUploadStatus('success');
                } else {
                    throw new Error('Failed to upload');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setUploadStatus('error');
            });
    };


    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        >
            {label && <label className={labelClasses}>{label}</label>}
            <div className={dropAreaClasses}
                style={{
                    borderWidth: size == 'small' ? '1px' : size == 'large' ? '2px' : '1.5px', 
                    minWidth: size == 'small' ? '120px' : size == 'large' ? '200px' : '160px',
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    style={{ 
                        opacity: '0', 
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                    }}
                    onChange={handleFileChange}
                    accept={accept}
                />
                {IconComponent}
                
                {dropAreaText ? <div className={'font-medium'}>{dropAreaText}</div> : null}
                {secondaryText ? <div className={'font-light'}>{secondaryText}</div> : null}
            

            </div>
            {file && 
            <div className={`flex flex-col items-center gap-1.5 p-2 bg-base-100 ${cornerStyles}`}>
                <div className='flex flex-row gap-2 w-full justify-between'>
                <Icon icon='page'  size={'16px'}  className='flex-shrink-0 w-4 h-4' />
                <div className='text-base-content text-sm flex-grow' style={truncateStyle}>
                    {file?.name}
                </div>
                    <Icon icon='close' size={'16px'} className='flex-shrink-0 w-4 h-4' 
onClick={() => setFile({ name: '' })}
                    />
                </div>
                {uploadStatus === 'uploading' && 
                <div className={`flex flex-row h-1 w-full rounded-full justify-start bg-base-0`}>
                  <div className={`rounded-full h-full`} style={{ 
                    minWidth: '5px',
                    width: `${uploadProgress}%`, 
                    backgroundColor: `var(--${barColor})` 
                    }} />
                </div>}
            </div>}
        
        </div>
    );
}


