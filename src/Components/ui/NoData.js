import noData from "../../Assets/images/noData.gif";
function NoData() {
  return (
    <div>
      <img
        style={{ width: "16rem", height: "auto" }}
        src={noData}
        alt="No Data"
      />
      <h3 className="text-center text-primary">No Data To Show</h3>
    </div>
  );
}

export default NoData;