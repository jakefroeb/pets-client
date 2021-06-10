import React, { useState } from "react"

export const AnimalTypeContext = React.createContext()

export const AnimalTypeProvider = (props) => {
    const [animalTypes, setAnimalTypes] = useState([])
    const getAnimalTypes = () => {
        return fetch("http://localhost:8000/animaltypes", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setAnimalTypes)
    }

    return (
        <AnimalTypeContext.Provider value={{animalTypes, getAnimalTypes}} >
            { props.children }
        </AnimalTypeContext.Provider>
    )
}