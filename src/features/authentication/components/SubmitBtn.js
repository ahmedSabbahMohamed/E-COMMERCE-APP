function SubmitBtn({ btnTxt }) {
  return (
    <div>
        <button className="btn btn-outline-primary w-100 mt-2" type="submit">
            {btnTxt}
        </button>
    </div>
  )
}

export default SubmitBtn