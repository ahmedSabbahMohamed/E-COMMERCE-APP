const categoriesTableCols = [
  {
    name: "ID",
    selector: (row) => row.id,
  },
  {
    name: "Category Name",
    selector: (row) => row.name,
  },
  {
    name: "Category Picture",
    selector: (row) => row.picture,
  },
  {
    name: "Options",
    // selector: (row) => row.name,
  },
];

const categoriesTableRows = [
  {
    id: 1,
    name: "Category 1",
    picture: "https://picsum.photos/200/300",
  }
]

const productsTableCols = [
  {
    name: "ID",
    selector: (row) => row.id,
  },
  {
    name: "Product Name",
    selector: (row) => row.name,
  },
  {
    name: "Product Picture",
    selector: (row) => row.picture,
  },
  {
    name: "Options",
    // selector: (row) => row.name,
  },
];

  const customStyles = {
    rows: {
      style: {
        fontSize: "1rem",
        borderBottom: "none",
      },
    },
    headCells: {
      style: {
        fontSize: "1rem",
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#171f46",
        borderLeft: "1px solid white",
      },
    },
    pagination: {
      style: {
        display: "flex",
        justifyContent: "end",
        marginLeft: "auto",
        width: "fit-content",
        alignItems: "center",
        padding: ".65rem",
        borderTop: "none",
        borderRadius: "9999px",
        backgroundColor: "#e6f4ff",
        marginTop: "1rem",
        color: "#171f46",
        fontWeight: "bold",
      },
      pageButtonsStyle: {
        cursor: "pointer",
        margin: "0 0.25rem",
        transition:
          "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out",
        "&:hover": {
          color: "#0056b3",
          backgroundColor: "#e9ecef",
          borderColor: "#dee2e6",
        },
        "&:disabled": {
          color: "#6c757d",
          backgroundColor: "#fff",
          borderColor: "#dee2e6",
          cursor: "not-allowed",
        },
        "&:focus": {
          outline: "none",
          boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
        },
      },
      pageButtonActiveStyle: {
        color: "#fff",
        backgroundColor: "#007bff",
        borderColor: "#007bff",
      },
    },
    subHeader: {
      style: {
        padding: "10px 15px",
        color: "red"
      },
    },
  };

export { categoriesTableCols, productsTableCols, categoriesTableRows, customStyles };
