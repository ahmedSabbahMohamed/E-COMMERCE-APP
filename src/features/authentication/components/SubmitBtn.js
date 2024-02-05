function SubmitBtn({ btnTxt, onClick = () => {} }) {
  return (
    <div>
        <button onClick={onClick} className="btn btn-outline-primary w-100 mt-2" type="submit">
            {btnTxt}
        </button>
    </div>
  )
}

export default SubmitBtn