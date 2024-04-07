import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const toFormData = (jsonData) => {
  const formData = new FormData();

  for (let key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      let value = jsonData[key];

      if (Array.isArray(value)) {
        // If the value is an array, convert it to a string
        value = value.join(",");
      } else if (typeof value === "object") {
        // If the value is an object, convert it to JSON
        value = JSON.stringify(value);
      }

      formData.append(key, value);
    }
  }

  return formData;
};

const logOut = () => {
  localStorage.clear();
  window.location.pathname = "/";
  return;
};

const showDeleteConfirm = (id, deleteFn = () => {}, item, invalidateQuery) => {
  Modal.confirm({
    title: "Are you sure delete this category?",
    icon: <ExclamationCircleFilled />,
    content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      deleteFn(item, id, invalidateQuery)
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

export { toFormData, logOut, showDeleteConfirm };
