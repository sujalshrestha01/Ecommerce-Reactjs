import { useState } from "react"
import { useFilter } from "./FilterContext"

const MainContent = () => {
  const {searchQuery,selectedCategory,minPrice,maxPrice,keyword}=useFilter()
  const [products,setProducts]=useState([])
  const [filter,setFilter]=useState('all')
  const [currentPage, setCurrentPage] = useState(false)
  const[dropdownOpen,setDropdownOpen]=useState(false)
  const itemsPerPage=12
  return (
    <section>
      
    </section>
  )
}

export default MainContent