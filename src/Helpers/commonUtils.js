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

function convertToFormData(obj, formData = new FormData(), parentKey = "") {
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

const showDeleteConfirm = ({ onOK, title = undefined }) => {
  Modal.confirm({
    title: title,
    icon: <ExclamationCircleFilled />,
    content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      return onOK;
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

const closeModal = () => {
  const escEvent = new KeyboardEvent("keydown", {
    key: "Escape",
    keyCode: 27,
    code: "Escape",
    which: 27,
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(escEvent);
};

const getSrc = (file) => {
  if (!file) {
    return "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
  }
  if (typeof file === "string") {
    return file;
  }
  if (file.type && file.type.match("image.*")) {
    return URL.createObjectURL(file);
  }
  if (typeof file === "object") {
    return file?.path;
  }
  return "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"; // Default fallback
};

function getImageBrightness(imageElement) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = imageElement.naturalWidth;
  canvas.height = imageElement.naturalHeight;
  context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  let r, g, b, avg;
  let colorSum = 0;

  for (let x = 0, len = data.length; x < len; x += 4) {
    r = data[x];
    g = data[x + 1];
    b = data[x + 2];
    avg = Math.floor((r + g + b) / 3);
    colorSum += avg;
  }

  const brightness = Math.floor(
    colorSum / (imageElement.naturalWidth * imageElement.naturalHeight)
  );
  return brightness;
}

export {
  convertToFormData,
  showDeleteConfirm,
  truncateDescription,
  closeModal,
  getSrc,
  getImageBrightness,
};
