import { useParams } from "react-router-dom"

function CategoryProducts() {
    const { categoryProducts } = useParams()

  return (
    <div className="container min-vh-100">{categoryProducts}</div>
  )
}

export default CategoryProducts