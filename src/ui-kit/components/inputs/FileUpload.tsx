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
    __juno?: any,
    multiple?: boolean // New prop to indicate if multiple file uploads are allowed
}

export default function FileUpload({
        size = 'small',
        corners,
        width,
        label,
        icon = 'cloud-upload',
        dropAreaText = 'Drag your files here or browse files',
        secondaryText,
        state = 'placeholder',
        onChange = () => console.log('Files uploaded'),
        accept = '',
        __juno = {},
        multiple = false
      }: FileUploadProps ) {

    
    const [files, setFiles] = useState<File[]>([]);
    const [uploadProgresses, setUploadProgresses] = useState<number[]>([]);
    const [uploadStatuses, setUploadStatuses] = useState<string[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);

    const widthStyle = width != 'auto' ? `w-${width}` : 'w-auto'
    const sizeStyles = size == 'small' ? 'gap-0.5 text-xs' : size == 'large' ? 'gap-1.5 text-base' : 'gap-1 text-sm'
    const classes = `flex flex-col items-stretch justify-start ${sizeStyles} ${widthStyle}`

    const labelTextSize = size == 'small' ? `text-xs` :  size == 'large' ? `text-lg`: `text-sm`;
    const labelClasses = `text-base-content ${labelTextSize} font-medium`

    const iconSize = size == 'small' ? '20px' : size == 'large' ? '32px' : '24px'
    const IconComponent = icon ? <Icon icon={icon}  className='flex-shrink-0' size={iconSize}  /> : null;

    const stateStyles = (state === 'focused' || isDragOver) ? 'bg-accent/10 border-accent' : 'bg-current-5 hover:bg-current-10 hover:border-dashed border-current-10 hover:border-current-15';
    const cornerStyles = corners === 'none' ? '' : `rounded-${corners}`;
    const dropAreaSizeClasses = size === 'small' ? 'p-2 gap-0.5' : size === 'large' ? 'p-3 gap-1.5' : 'p-2 gap-1';

    const borderWidth = size == 'small' ? 'border' : size == 'large' ? 'border-2' : 'border-1.5' 
    const borderStyle = isDragOver ? `border-dashed` : ``
    const dropAreaClasses = `w-full h-full relative 
    ${borderWidth} ${borderStyle} transition-all duration-150
    flex flex-col items-center justify-center ${cornerStyles} ${stateStyles} ${dropAreaSizeClasses}`

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
        const newFiles = Array.from(event.dataTransfer.files);
        if (newFiles.length > 0) {
            setFiles(prevFiles => [...prevFiles, ...newFiles]);
            newFiles.forEach(file => handleFileUpload(file));
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(event.target.files || []);
        if (newFiles.length > 0) {
            setFiles(prevFiles => [...prevFiles, ...newFiles]);
            newFiles.forEach(file => handleFileUpload(file));
            if (onChange && event.target.files) {
                onChange(event.target.files); // Call onChange with FileList
            }
        }
    };

    const handleFileUpload = (file: File) => {
        const index = files.length;
        setUploadStatuses(prevStatuses => [...prevStatuses, 'uploading']);
        setUploadProgresses(prevProgresses => [...prevProgresses, 0]);

        const formData = new FormData();
        formData.append('file', file);

        // Simulate an API call
        fetch('/upload-endpoint', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    setUploadStatuses(prevStatuses => [...prevStatuses.slice(0, index), 'success', ...prevStatuses.slice(index + 1)]);
                } else {
                    throw new Error('Failed to upload');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setUploadStatuses(prevStatuses => [...prevStatuses.slice(0, index), 'error', ...prevStatuses.slice(index + 1)]);
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
                    multiple={multiple} // Support multiple files based on prop
                />
                {IconComponent}
                
                {dropAreaText ? <div className={'font-medium'}>{dropAreaText}</div> : null}
                {secondaryText ? <div className={'font-light'}>{secondaryText}</div> : null}
            

            </div>
            {files.length > 0 && 
            files.map((file, index) => (
            <div key={index} className={`flex flex-col items-center gap-1.5 p-2 bg-current-10 ${cornerStyles}`}>
                <div className='flex flex-row gap-2 w-full justify-between'>
                <Icon icon='page'  size={'16px'}  className='flex-shrink-0 w-4 h-4' />
                <div className='text-base-content text-sm flex-grow' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {file.name}
                </div>
                    <Icon icon='close' size={'16px'} className='flex-shrink-0 w-4 h-4' 
onClick={() => setFiles(prevFiles => prevFiles.filter((_, fIndex) => fIndex !== index))}
                    />
                </div>
                {uploadStatuses[index] === 'uploading' && 
                <div className={`flex flex-row h-1 w-full rounded-full justify-start bg-base-0`}>
                  <div className={`rounded-full h-full`} style={{ 
                    minWidth: '5px',
                    width: `${uploadProgresses[index]}%`, 
                    backgroundColor: `var(--${uploadStatuses[index] === 'uploading' ? 'info-content' : uploadStatuses[index] === 'uploaded' ? 'success-content' : 'error-content'})` 
                    }} />
                </div>}
            </div>
            ))}
        
        </div>
    );
}