import { Button, ButtonIcon } from './index';

type Props = {
    bgColor?: 'base-0' | 'base-100' | 'none' | string,
    type?: 'mini' | 'standard',
    textSize?: 'auto' | 'xs' | 'sm' | 'base' | 'md',
    paddingX?: '4px' | '6px' | '8px' | '12px' | '16px' | '24px' | '32px',
    paddingY?: '4px' | '6px' | '8px' | '12px' | '16px' | '24px' | '32px',
    currentPage?: number,
    totalPages?: number,
    onChange?: any,
    attributes?: any,
    listeners?: any,
}

export default function Pagination({
        type = 'standard',
        textSize = 'base',
        paddingX,
        paddingY,
        currentPage = 1,
        totalPages = 3,
        onChange = () => {},
        attributes,
        listeners, 
      }: Props) {

    const selectedIndex = currentPage
    // local state to imitate page selection, move this state up to the parent and adjust local functions

    const justifyStyle = type == 'mini' ? 'justify-end' : 'justify-between'
    const textStyles = textSize != 'auto' ? `text-${textSize}` : ''
    let wrapperClasses = `w-full flex flex-row ${justifyStyle} items-center gap-2 ${textStyles}`

    function handlePageChange(page: number) {
        if (page < 1 || page > totalPages) return
        onChange(page)
    }
    
    const LeftButton =
      type == "standard" ? (
        <Button
          text="Back"
          size="small"
          color={'base-700'}
          style={"ghost"}
          state={selectedIndex == 1 ? 'disabled' : 'default'}
          leftIcon="chevron-left"
          onClick={() => handlePageChange(selectedIndex - 1)}
        />
      ) : (
        <ButtonIcon
          icon='chevron-left'
          size="small"
          color={'base-700'}
          style={"ghost"}
          state = {selectedIndex == 1 ? 'disabled' : 'default'}
          onClick={() => handlePageChange(selectedIndex - 1)}
        />
      );

    const RightButton =
      type == "standard" ? (
        <Button
          text="Next"
          size="small"
          color={'base-700'}
          style={"ghost"}
          state={selectedIndex >= totalPages ? 'disabled' : 'default'}
          rightIcon="chevron-right"
          onClick={() => handlePageChange(selectedIndex + 1)}
        />
      ) : (
        <ButtonIcon
          icon='chevron-right'
          size="small"
          color={'base-700'}
          style={"ghost"}
          state={selectedIndex >= totalPages ? 'disabled' : 'default'}
          onClick={() => handlePageChange(selectedIndex + 1)}
        />
      );
    
    const padding = `${paddingY ? paddingY : '0px'} ${paddingX ? paddingX : '0px'}`
    return (
        <div
        {...attributes} {...listeners} 
            className={wrapperClasses} 
            style={{padding: padding}}
        >
                        {LeftButton}
                        {type == 'standard' ? 
                        <PaginationArray
                            totalPages={totalPages}
                            currentPage={selectedIndex}
                            handlePageChange={handlePageChange}
                        /> : 
                        <div className='flex flex-row gap-2'>
                            {currentPage} of {totalPages}
                        </div>}
                        {RightButton}
        </div>
    );
}

type PaginationArrayProps = {
    totalPages: number,
    currentPage: number,
    handlePageChange: any,
}

function PaginationArray ({ totalPages, currentPage, handlePageChange }: PaginationArrayProps) {
    const createPaginationArray = (totalPages: number, currentPage: number) => {
        let paginationArray = [];

        if (totalPages <= 5) {
            // If the total number of pages is less than or equal to 5, show all pages
            for (let i = 1; i <= totalPages; i++) {
                paginationArray.push(i);
            }
        } else {
            
            // needs to be refactored into a more elegant solution
            if (currentPage < 4) {
                paginationArray =[1, 2, 3, 4, '...', totalPages];
            } else if (currentPage == 4) {
                paginationArray =[1, '...', 3, 4, 5, '...', totalPages];
            } else if (totalPages - currentPage < 3) {
                paginationArray = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else if (totalPages - currentPage == 3) {
                paginationArray = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, '...', totalPages];
            } else {
                paginationArray = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        return paginationArray;
    };

    const paginationArray = createPaginationArray(totalPages, currentPage);

    return (
        <div className='flex flex-row gap-2'>
            {paginationArray.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${index}`}>
                            ...
                        </span>
                    );
                }
                return (
                    <Button
                        key={page}
                        text={`${page}`}
                        size="small"
                        color={currentPage == page ? 'base-200' : 'base-700'}
                        style={currentPage == page ? 'light' : 'ghost'}
                        onClick={() => handlePageChange(page)}
                    />
                );
            })}
        </div>
    );
};



