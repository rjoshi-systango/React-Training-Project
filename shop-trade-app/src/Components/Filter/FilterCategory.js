const DUMMY_CATEGORY = ["Denim", "Jeans", "Tee-Shirt", "Jackets"]

const FilterCategory = () => {
    return (    
        <>
            {DUMMY_CATEGORY.map((item) => {
                return <div class="" style={{margin: "10px"}} >
                    <p>{item}</p>
                </div>
            })}
        </>
    )
}

export default FilterCategory;