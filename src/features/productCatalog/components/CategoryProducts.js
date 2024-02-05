import { useParams } from "react-router-dom"

function CategoryProducts() {
    const { categoryProducts } = useParams()

  return (
    <div className="container">{categoryProducts}</div>
  )
}

export default CategoryProducts