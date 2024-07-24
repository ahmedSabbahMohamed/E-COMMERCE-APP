import noData from "../../Assets/images/noData.gif";
function NoData() {
  return (
    <div className="d-flex flex-column align-itmes-center justify-content-center">
      <img
        style={{ width: "16rem", height: "auto" }}
        className="mx-auto"
        src={noData}
        alt="No Data"
      />
      <h3 className="text-center text-primary">No Data To Show</h3>
    </div>
  );
}

export default NoData;