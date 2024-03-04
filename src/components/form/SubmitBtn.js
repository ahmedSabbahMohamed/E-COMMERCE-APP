function SubmitBtn({ btnTxt, onClick = () => {}, disabled }) {
  return (
    <div>
        <button disabled={disabled} onClick={onClick} className="btn btn-outline-primary w-100 mt-2" type="submit">
            {btnTxt}
        </button>
    </div>
  )
}

export default SubmitBtn