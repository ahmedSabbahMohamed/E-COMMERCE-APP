function SubmitBtn({ btnTxt, id, onClick = () => {}, disabled }) {
  return (
    <div>
        <button id={id} disabled={disabled} onClick={onClick} className="btn btn-outline-primary w-100 mt-2" type="submit">
            {btnTxt}
        </button>
    </div>
  )
}

export default SubmitBtn