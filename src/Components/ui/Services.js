import { services } from "../../Helpers";

function Services() {
  return (
    <div className="d-flex flex-row flex-wrap gap-4 justify-content-center align-items-center">
      {services.map((service, index) => (
        <div key={index} className="d-flex flex-column gap-3 align-items-center">
          <div
            className="rounded-pill bg-light d-flex align-items-center justify-content-center"
            style={{ width: "80px", height: "80px" }}
          >
            <div
              className="rounded-pill bg-dark d-flex align-items-center justify-content-center"
              style={{ width: "58px", height: "58px" }}
            >
                <img src={service.icon} />
            </div>
          </div>
          <div>
            <h6 className="text-center fw-bold">{service?.title}</h6>
            <p className="text-center">{service?.paragraph}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Services