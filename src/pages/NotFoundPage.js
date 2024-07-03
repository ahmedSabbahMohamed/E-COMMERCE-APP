import error from "../assets/images/404-error.gif";

function NotFoundPage() {
  return (
    <div className="vh-screen">
        <img className="w-100" src={ error } alt="not found page" style={{height: "100vh"}} />
    </div>
  )
}

export default NotFoundPage