export const customStyles = {
  table: {
    style: {
      border: 0,
    },
  },
  headRow: {
    style: {
      fontSize: "18px",
      minHeight: "52px",
      display: "flex",
      alignItems: "start",
      paddingTop: "1rem",
      paddingBottom: "2rem",
    },
  },
  headCells: {
    style: {
      textAlign: "center",
    },
  },
  rows: {
    style: {
      minHeight: "48px",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      "&:not(:last-of-type)": {
        borderBottomStyle: "none",
        borderBottomWidth: "0",
        borderBottomColor: "white",
        paddingTop: ".5rem",
        paddingBottom: ".5rem",
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
  },
};
