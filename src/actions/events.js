import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

function appendFormData(formData, key, value) {
  if (value instanceof File) {
    formData.append(key, value);
  } else if (value instanceof Date) {
    formData.append(key, value.toISOString());
  } else if (typeof value === "boolean") {
    formData.append(key, value ? "true" : "false");
  } else {
    formData.append(key, value.toString());
  }
}

function convertToFormData(
  obj,
  formData = new FormData(),
  parentKey = ""
) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const propName = parentKey ? `${parentKey}[${key}]` : key;
      if (value === null || value === undefined) {
        formData.append(propName, "");
      } else if (
        typeof value === "object" &&
        !(value instanceof File) &&
        !(value instanceof Date)
      ) {
        convertToFormData(value, formData, propName);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const arrayKey = `${propName}[${index}]`;
          appendFormData(formData, arrayKey, item);
        });
      } else {
        appendFormData(formData, propName, value);
      }
    }
  }
  return formData;
}

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

const truncateDescription = (description) => {
  const maxLength = 70;
  return description && description.length > maxLength
    ? description.slice(0, maxLength) + "..."
    : description;
};

export { convertToFormData, logOut, showDeleteConfirm, truncateDescription };
