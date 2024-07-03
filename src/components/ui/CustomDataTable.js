import DataTable from "react-data-table-component";

const CustomDataTable = ({
  title,
  columns,
  data,
  pagination = true,
  highlightOnHover = true,
  selectableRows = false,
  onRowSelected = () => {},
  customStyles = {},
  paginationPerPage = 10,
  paginationRowsPerPageOptions = [10, 20, 30],
  noHeader = false,
  subHeader = false,
  subHeaderComponent = null,
  persistTableHead = false,
}) => {
  return (
    <DataTable
      title={title}
      columns={columns}
      data={data}
      pagination={pagination}
      highlightOnHover={highlightOnHover}
      selectableRows={selectableRows}
      onSelectedRowsChange={onRowSelected}
      customStyles={customStyles}
      paginationPerPage={paginationPerPage}
      paginationRowsPerPageOptions={paginationRowsPerPageOptions}
      noHeader={noHeader}
      subHeader={subHeader}
      subHeaderComponent={subHeaderComponent}
      persistTableHead={persistTableHead}
    />
  );
};

export default CustomDataTable;
