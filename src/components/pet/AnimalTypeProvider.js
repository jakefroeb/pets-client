import React, { useState } from "react"

export const AnimalTypeContext = React.createContext()

export const AnimalTypeProvider = (props) => {
    const [animalTypes, setAnimalTypes] = useState([])
    const getAnimalTypes = () => {
        return fetch("https://jakes-pets.herokuapp.com/animaltypes", {
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