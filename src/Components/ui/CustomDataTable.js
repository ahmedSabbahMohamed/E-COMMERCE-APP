import DataTable from "react-data-table-component";
import SubHeaderComponent from "./SubHeaderComponent";
import Pagination from "./Pagination";
import NoData from "./NoData";
import Loading from "./Loading";

const CustomDataTable = ({
  title,
  columns,
  data,
  pagination = false,
  highlightOnHover = true,
  selectableRows = false,
  onRowSelected = () => {},
  customStyles = {},
  paginationPerPage = 10,
  paginationRowsPerPageOptions = [10, 20, 50],
  progressPending,
  progressComponent,
  noHeader = false,
  fixedHeader = true,
  subHeader = true,
  queryString,
  modalBody,
  triggerText,
  heading,
  currentPage,
  pageCount,
  onPageChange,
  isError,
}) => {
  return (
    <>
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
        progressPending={progressPending}
        progressComponent={<div className="py-3">{progressComponent}</div>}
        noHeader={noHeader}
        subHeader={subHeader}
        fixedHeader={fixedHeader}
        subHeaderComponent={
          <SubHeaderComponent
            queryString={queryString}
            triggerText={triggerText}
            heading={heading}
            modalBody={modalBody}
          />
        }
        persistTableHead={true}
        noDataComponent={
          isError ? <Loading queryString={queryString} /> : <NoData />
        }
        responsive
      />
      <div className="mt-5 mb-2 d-flex justify-content-end">
        <Pagination
          pageCount={pageCount}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default CustomDataTable;
