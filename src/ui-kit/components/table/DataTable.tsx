import React, { useState } from 'react';
import { Pagination, Icon } from '../'; 

const sampleColumns = [
  {
      accessor: 'name', 
      header: 'Person',
      width: '40%',
      direction: 'flex-row',
      alignItems: 'center',
      justifyContent: 'start',
      isSortable: true, 
      hideOnMobile: false
  },
  { 
      accessor: 'role', 
      header: 'Role',
      width: '30%', 
      direction: 'flex-row',
      alignItems: 'center', 
      justifyContent: 'start',
      isSortable: true,
      hideOnMobile: false
  },
  { 
      accessor: 'email', 
      header: 'Email',
      width: '20%', 
      direction: 'flex-col',
      alignItems: 'center', 
      justifyContent: 'start',
      isSortable: false, 
      hideOnMobile: true
  },
]

const dummyData = [
    ['John Doe', 'Developer', 'john.doe@example.com'],
    ['Jane Smith', 'Designer', 'jane.smith@example.com'],
    ['Samuel Green', 'Project Manager', 'samuel.green@example.com']
]

type DataTableProps = {
  textSize?: 'auto' | 'xs' | 'sm' | 'base' | 'md',
  cellPaddingX?: '4px' | '6px' | '8px' | '12px' | '16px' | '24px',
  cellPaddingY?: '4px' | '6px' | '8px' | '12px' | '16px' | '24px',
  pagination?: 'none' | 'mini' | 'standard',
  showHeader?: boolean,
  corners?: 'none' | 'sm' | 'md' | 'lg' | 'xl',
  borders?: 'none' | 'all' | 'horiz' | 'vert' | 'onlyHeader',
  columnData?: Array<{
    accessor: string,
    header?: string,
    width: string,
    direction?: string,
    alignItems?: string,
    justifyContent?: string,
    isSortable?: boolean,
    hideOnMobile?: boolean,
  }>,
  rowData?: Array<any[]>,
  hasOutline?: boolean,
  __juno?: any
}

export default function DataTable({
    textSize = 'sm',
    cellPaddingX = '8px',
    cellPaddingY = '6px',
    pagination = 'none',
    showHeader = true,
    corners = 'md',
    borders = 'horiz',
    columnData = sampleColumns, 
    rowData = dummyData,        
    __juno = {}
  }: DataTableProps) {
    
    const isMobile = false
    const [ sortState, setSortState ] = useState({ accessor: 'name', direction: 'asc' })
    
    // Pre-process data
    let columns = columnData
    let data = [...rowData].sort((a, b) => {
      const sortIndex = sortState.direction === 'asc' ? 1 : -1
      if (a[columns.findIndex(col => col.accessor === sortState.accessor)] < b[columns.findIndex(col => col.accessor === sortState.accessor)]) {
        return -1 * sortIndex
      } else if (a[columns.findIndex(col => col.accessor === sortState.accessor)] > b[columns.findIndex(col => col.accessor === sortState.accessor)]) {
        return 1 * sortIndex
      } else {
        return 0
      }
    })


    // STYLING 
    const cornerStyles = corners != 'none' ? `rounded-${corners}` : ''
    const textSizeStyles = textSize != 'auto' ? `text-${textSize}` : ''
    
    const tableContainerClasses = `w-full table-auto border-collapse ${textSizeStyles} ${cornerStyles}`
    
    const lighterBorder = borders == 'none' ? 'none' : `1px solid color-mix(in srgb, currentColor 10%, transparent)`
    const darkerBorder = borders == 'none' ? 'none' : `1px solid color-mix(in srgb, currentColor 15%, transparent)`
    const borderRadius = corners == 'none' ? '0' : `var(--border-radius-${corners})` || '4px'
    
    // Background color for the table rows
    function getRowStyles(index) {
      let rowStyles = ``
      // leaving room for zebra background
      return rowStyles
    }

    const padding = {
      paddingLeft: cellPaddingX,
      paddingRight: cellPaddingX,
      paddingTop: cellPaddingY,
      paddingBottom: cellPaddingY
    }
    
    // This function helps style the cells based on the column configuration
    const styleFromColumn = (column, isHeader=false) => ({
        ...(isHeader && !showHeader ? {} : padding),
        display: isHeader && !showHeader && 'none',
        height: isHeader ? showHeader ? 'auto' : 0 : '100%',
        textAlign: column?.textAlign,
        whiteSpace: column?.nowrap ? 'nowrap' : 'normal', 
        alignItems: column?.alignItems,
        justifyContent: column?.justifyContent,
        flexDirection: column?.direction,
      });
    
    // This function ensures that the total width of the columns is 100%
    const totalVisibleWidth = columns?.reduce((total, column) => {
      if (!isMobile || !column.hideOnMobile) {
        const widthValue = parseFloat(column.width);
        return total + widthValue;
      }
      return total;
    }, 0);

    return (
      <div 
      className={`relative w-full flex-shrink-0 border-spacing-0 ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
      {...__juno?.attributes}
      >
        <table className={tableContainerClasses}
         style={{
          // tableLayout: 'fixed',  
          borderCollapse: 'separate',  
          borderSpacing: 0,
          border: darkerBorder,
          borderRadius
        }}
        
        >
        
          {/* TABLE HEADER */}
          <thead >
          <tr>
            {columns?.map((column, index) => {
              if (isMobile && column.hideOnMobile) {
                return null; // Don't render this column on mobile
              }
              const originalWidthPercent = parseFloat(column.width);
              const adjustedWidth = (originalWidthPercent / totalVisibleWidth) * 100;
              const isSortable = column.isSortable 
              const isSorted = sortState.accessor == column.accessor;
              
              return (<th key={index} 
                className={`${column?.hideOnMobile ? 'hidden md:table-cell' : 'table-cell'} relative`}
                style={{ 
                width: `${adjustedWidth.toFixed(2)}%`,
                borderRight: (borders == 'vert' || borders == 'all') ? lighterBorder : 'none',
                borderBottom: showHeader && borders !== 'none' && borders != 'vert' ? darkerBorder : 'none',
                
                ...(showHeader && index == 0 ? { borderTopLeftRadius: borderRadius } : {}),
                ...(showHeader && index === columns.length - 1 ? { borderTopRightRadius: borderRadius } : {}),
                // Ensure that the right border is not applied to the last header cell
                ...(index === columns.length - 1 ?  { borderRight: 'none'} : {}),
                }}>
                  <div 
                    className='flex gap-1.5 h-full relative group items-center select-auto'  
                    style={styleFromColumn(column, true)} >
                  {column.header}
                  {isSorted ?
                  <div className={`rounded-full hover:bg-current-10 cursor-pointer flex-shrink-0`} 
                  style={{order: column.justifyContent == 'end' ? -2 : 2}}
                  onClick={(e) => 
                      {e.stopPropagation();
                      setSortState({ 
                      accessor: column.accessor, 
                      direction: sortState.direction === 'asc' ? 'desc' : 'asc' })}}>
                  
                  {sortState.direction == 'asc' ? 
                    <Icon icon='arrow-up' className='scale-75 w-4 h-4 select-none' /> : 
                    <Icon icon='arrow-down' className='scale-75 w-4 h-4 select-none'  />
                  }
                  </div> : isSortable && 
                  <div className={`rounded-full hover:bg-current-10 cursor-pointer opacity-0 group-hover:opacity-100`} 
                  style={{order: column.justifyContent == 'end' ? -2 : 2}}
                  onClick={(e) => 
                    {e.stopPropagation();
                    setSortState({ 
                      accessor: column.accessor, 
                      direction: 'asc' })}}>
                  <Icon icon='arrow-down' className='scale-75 w-4 h-4 select-none'  />
                  </div>
                  }
                  </div>
              </th>
            )
            })}
          </tr>
        </thead>

      {/* TABLE BODY */}
      <tbody>
        {data?.map((item, rowIndex) => (
          <tr key={rowIndex} 
          // onClick={() => onRowClick(item.id)} 
          className={`${getRowStyles(rowIndex)} relative group`} >
            {columns.map((column, colIndex) => { 
              
              if (isMobile && column.hideOnMobile) {
                return null; 
              }

              const originalWidthPercent = parseFloat(column.width);
              const adjustedWidth = (originalWidthPercent / totalVisibleWidth) * 100;
              return (<td 
                key={colIndex} 
                
                className={`${column?.hideOnMobile ? 'hidden md:table-cell' : 'table-cell'} relative`}
                style={{   
                  borderRight: (borders == 'all' || borders == 'vert') ? lighterBorder : 'none',
                  borderBottom: (borders == 'horiz' || borders == 'all') ? rowIndex < data.length - 1 ? lighterBorder : pagination == 'none' ? 'none' : darkerBorder : 'none',
                  width: `${adjustedWidth.toFixed(2)}%`,
                  alignContent: column.alignItems || 'start',
                  justifyContent: column.justifyContent || 'start',
                  height: '100%',
                    ...(colIndex === 0 && rowIndex === data.length - 1 ? { borderBottomLeftRadius: pagination == 'none' &&  borderRadius } : {}),
                    ...(colIndex === columns.length - 1 && rowIndex === data.length - 1 ? { borderBottomRightRadius: pagination == 'none' && borderRadius } : {}),
                    ...(colIndex === columns.length - 1 ? { borderRight: 'none' } : {}),
                }}>
              <div className={`flex gap-1 h-full w-full`} style={styleFromColumn(column)} >
              {data[rowIndex]?.[colIndex]}
              </div>
            </td>)}
            )}
          </tr>
        ))}
      </tbody>
      {
        pagination !== 'none' && 
        <tfoot><tr>
        <td colSpan={columns.length} style={{overflow: 'hidden'}}>

        <Pagination 
          type={pagination}  
          paddingX={cellPaddingX} 
          paddingY={cellPaddingY} 
          currentPage={1} // add a variable
          totalPages={8} // add a variable          
          />

      </td>
      </tr>
      </tfoot>
      }

        </table>
        </div>
    );
}




