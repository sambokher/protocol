import React, { useState } from 'react';
import * as UIKit from '../'; 
import { Pagination, Icon, Checkbox } from '../'; 

const sampleColumns = [
  {
      accessor: 'name', 
      header: 'Person',
      width: '40%',
      type: 'text',
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
      type: 'object',
      direction: 'flex-row',
      alignItems: 'center', 
      justifyContent: 'start',
      isSortable: true,
      hideOnMobile: true
  },
  { 
      accessor: 'tags', 
      header: 'Status',
      width: '20%', 
      direction: 'flex-col',
      type: 'arrayOfObjects',
      alignItems: 'center', 
      justifyContent: 'start',
      isSortable: false, 
      hideOnMobile: true
  },
  {
      accessor: 'actions', 
      header: '',
      width: '10%',
      type: 'arrayOfObjects', 
      direction: 'flex-row',
      alignItems: 'center',
      justifyContent: 'end',
      displayOnHoverOnly: true,
      isSortable: false, 
  }
]

const dummyData = [
  {
    id: 1,
    name: 'John Doe', 
    role: { component: "Select", props: { size: "small", currentOption: "Manager", } },
    tags: { component: "Status", props: { text: "Online", color: "success", size: "small", showIndicator: true } },
    actions: [
      { component: "IcoNoirIcon", props: { name: "EditPencil", size: "20" } },
      { component: "IcoNoirIcon", props: { name: "Trash", size: "20" } }
    ],
  },
  {
    id: 2, 
    name: 'Apple Doe',
    role: { component: "Select", props: { size: "small", currentOption: "Engineer", } },
    tags: { component: "Status", props: { text: "Offline", color: "error", size: "small", showIndicator: true } },
    actions: [
      { component: "IcoNoirIcon", props: { name: "EditPencil", size: "20" } },
      { component: "IcoNoirIcon", props: { name: "Trash", size: "20" } }
    ],
  },
  {
    id: 3,
    name: 'Jane Doe',
    role: { component: "Select", props: { size: "small", currentOption: "Analyst", } },
    tags: { component: "Status", props: { text: "Busy", color: "warning", size: "small", showIndicator: true } },
    actions: [
      { component: "IcoNoirIcon", props: { name: "EditPencil", size: "20" } },
      { component: "IcoNoirIcon", props: { name: "Trash", size: "20" } }
    ],
  },
  {
    id: 4,
    name: 'John Doe',
    role: { component: "Select", props: { size: "small", currentOption: "Consultant" } },
    tags: { component: "Status", props: { text: "Away", color: "info", size: "small", showIndicator: true } },
    actions: [
      { component: "IcoNoirIcon", props: { name: "EditPencil", size: "20" } },
      { component: "IcoNoirIcon", props: { name: "Trash", size: "20" } }
    ],
  }
]

type TableWidgetProps = {
  bgColor?: 'base-0' | 'base-100' | 'zebra' | string,
  textSize?: 'auto' | 'xs' | 'sm' | 'base' | 'md',
  cellPaddingX?: '4px' | '6px' | '8px' | '12px' | '16px' | '24px',
  cellPaddingY?: '4px' | '6px' | '8px' | '12px' | '16px' | '24px',
  pagination?: 'none' | 'mini' | 'standard',
  showHeader?: boolean,
  corners?: 'none' | 'sm' | 'md' | 'lg' | 'xl',
  borders?: 'none' | 'all' | 'horiz' | 'vert' | 'onlyHeader',
  hasRowSelect?: boolean,
  columnData?: Array<{
    accessor: string,
    type: 'text' | 'number' | 'datetime' | 'object' | 'arrayOfObjects' | string,
    header?: string,
    width: string,
    direction?: string,
    alignItems?: string,
    justifyContent?: string,
    isSortable?: boolean,
    hideOnMobile?: boolean,
    displayOnHoverOnly?: boolean
  }>,
  rowData?: Array<{
    id: number,
  }>,
  hasOutline?: boolean,
  onRowClick?: (rowId: number) => void,
  __juno?: any
}

export default function TableWidget({
    bgColor,
    textSize = 'sm',
    cellPaddingX = '8px',
    cellPaddingY = '6px',
    pagination = 'none',
    showHeader = true,
    corners = 'md',
    borders = 'horiz',
    hasRowSelect = false,
    columnData = sampleColumns, 
    rowData = dummyData,        
    hasOutline = false,
    onRowClick= () => {},
    __juno = {}
  }: TableWidgetProps) {
    
    const isMobile = false
    const [selectedRows, setSelectedRows] = useState([])
    const [ sortState, setSortState ] = useState({ accessor: 'name', direction: 'asc' })
    
    function handleAllRowsSelect () {
      const rowIds = rowData.map((item) => item.id) || []
      const newSelectedRows = selectedRows.length < rowIds.length ? rowIds : [] 
      setSelectedRows(newSelectedRows)
    }
    function handleRowSelect (rowId) {
      let newRows = [...selectedRows]
      if (selectedRows.includes(rowId)) {
        newRows = selectedRows.filter((row) => row !== rowId)
      } else {
        newRows = [...selectedRows, rowId]
      }
      setSelectedRows(newRows)
    }
    // Pre-process data
    let columns = columnData
    let data = [...rowData].sort((a, b) => {
    if (a[sortState.accessor] < b[sortState.accessor]) {
      return sortState.direction === 'asc' ? -1 : 1;
    }
    if (a[sortState.accessor] > b[sortState.accessor]) {
      return sortState.direction === 'asc' ? 1 : -1;
    }})

    
    const addSelection = hasRowSelect
    if (addSelection) {
        const newColumn = {
            accessor: 'checkbox',
            header: 'hello',
            width: '6%',
            type: 'checkbox',
            direction: 'flex-row',
            alignItems: 'center',
            justifyContent: 'start',
            isSortable: false,
            hideOnMobile: false
        }
        columns = [newColumn, ...columns]
        
        data = data.map((row) => {
            return { checkbox: { 
              component: "Checkbox", 
              props: { 
                checked: selectedRows.includes(row?.id),
                size: "small", 
                label: null, 
                onChange: () => handleRowSelect(row?.id)
                } 
              }, 
              ...row,
            }
        })
    }

    // STYLING 
    const textColor = (!bgColor || bgColor == 'none') ? '' : `text-base-content`
    const cornerStyles = corners != 'none' ? `rounded-${corners}` : ''
    const textSizeStyles = textSize != 'auto' ? `text-${textSize}` : ''
    
    const tableContainerClasses = `w-full table-auto border-collapse ${textSizeStyles} ${textColor} ${cornerStyles}`
    
    const lighterBorder = borders == 'none' ? 'none' : `1px solid color-mix(in srgb, currentColor 10%, transparent)`
    const darkerBorder = borders == 'none' ? 'none' : `1px solid color-mix(in srgb, currentColor 15%, transparent)`
    const borderRadius = corners == 'none' ? '0' : `var(--border-radius-${corners})` || '4px'
    
    // Background color for the table rows
    function getRowStyles(index, rowId) {
      const rowSelected = selectedRows.includes(rowId)
      let rowStyles = ``
      if (!bgColor || bgColor == 'none') {
        rowStyles = rowSelected ? 'bg-base-50' : 'hover:bg-base-50' // transparent bg only highlights on hover or when selected
      } else if (bgColor == 'zebra') {
        rowStyles = index % 2 === 0 ? 'bg-base-50' : 'bg-base-0 hover:bg-base-50' // zebra stripes
      } else {
        rowStyles = bgColor == 'base-0' ? 
        rowSelected ? `bg-base-50` : `bg-base-0 hover:bg-base-50` : 
        bgColor == 'base-50' ? rowSelected ? `bg-base-100` : `bg-base-50 hover:bg-base-100` : ''
      }
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

    // This function renders the content of each cell
    function renderCell({ content, columnType='text' }){
      if (columnType === 'object' || columnType === 'arrayOfObjects' || columnType === 'checkbox') {
        if (!Array.isArray(content)) {
          content = [content]; // Convert non-array content to an array
        }
    
        return (
          <>
            {content.map((item, idx) => {
              if (item && typeof item === 'object' && item.component && item.props) {
                const Component =  UIKit[item.component]
                if (Component) return (
                  <React.Fragment key={idx}>
                    {React.createElement(Component, item.props)}
                  </React.Fragment>
                );
              } else {
                return <span key={idx}>{String(item)}</span>;
              }
            })}
          </>
        );
      } else {
        // For 'text', 'number', 'datetime', render the content directly
        return <span>{String(content)}</span>;
      }
    };    

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
              const isSortable = column.isSortable && column.type !== 'object' && column.type !== 'arrayOfObjects';
              const isSorted = sortState.accessor == column.accessor;
              
              return (<th key={index} 
                className={`${column?.hideOnMobile ? 'hidden md:table-cell' : 'table-cell'} relative`}
                style={{ 
                width: `${adjustedWidth.toFixed(2)}%`,
                backgroundColor: (!bgColor || bgColor == 'none') ? '' : bgColor == 'base-100' ? 'var(--base-100)' : 'var(--base-0)',
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
                  {column.type === 'checkbox' ? 
                    <Checkbox 
                      size='small' 
                      checked={selectedRows.length > 0}
                      label={''} 
                      indeterminate={selectedRows.length != rowData.length}
                      onChange={handleAllRowsSelect}
                    /> : 
                  column.header}
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
          <tr key={item.id} 
          onClick={() => onRowClick(item.id)} 
          className={`${getRowStyles(rowIndex, item.id)} relative group`} >
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
              <div className={`flex gap-1 h-full w-full ${column.displayOnHoverOnly ? 'opacity-0 group-hover:opacity-100' : ''}`} style={styleFromColumn(column)} >
              {renderCell({
                content: item[column?.accessor], 
                columnType: column?.type})}
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
          bgColor={bgColor}
          paddingX={cellPaddingX} 
          paddingY={cellPaddingY} 
          onChange={() => console.log('Change page')} // change to your function
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




