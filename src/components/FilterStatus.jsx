import React from 'react'

const FilterStatus = ({filterObject ,label}) => {
 
    if(label==="TaskStatus"){
        return (
            <div>{filterObject == 0
                ? "Accepted"
                : filterObject == -1
                ? "Not Accepted"
                : filterObject == -2
                ? "Partial Completed"
                : filterObject == 100
                ? "Completed"
                : ""}</div>
          )
    }
    else if(label==="Priority"){
        return <span>{filterObject}</span>
    }
    else if(label==="FromDueDate"){
        return <span>{filterObject}</span>
    }
    else {
        return <span>{filterObject}</span>
    }

    
}

export default FilterStatus