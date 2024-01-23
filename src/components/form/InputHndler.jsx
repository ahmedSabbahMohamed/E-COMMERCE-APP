function InputHndler({labelStyle, name, label, inputStyle, type, placeholder, id}) {
  return (
    <label className={labelStyle} htmlFor={name}>
        {label}
        <input
            className={inputStyle}
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
        />
    </label>
  )
}

export default InputHndler