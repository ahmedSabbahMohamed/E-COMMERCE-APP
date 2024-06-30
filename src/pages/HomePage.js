import { Categories, Products } from "../features/productCatalog"

function HomePage() {
  return (
    <div className="container">
        <Categories />
        <Products />
    </div>
  )
}

export default HomePage