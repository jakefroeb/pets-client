import React, { useState } from "react"

export const PetContext = React.createContext()

export const PetProvider = (props) => {
    const [pets, setPets] = useState([])
    const createPet = (pet) => {
        return fetch("https://jakes-pets.herokuapp.com/pets", { 
            method:"POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(pet)
        })
            .then(getPets)
    }
    const getPets = () => {
        return fetch("https://jakes-pets.herokuapp.com/pets", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setPets)
    }
    const deletePet = (petId) => {
        return fetch(`https://jakes-pets.herokuapp.com/pets/${petId}`,{
            method:"DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(()=> getPets())
    }
    const interactWithPet = (petId, actionId) => {
        return fetch(`https://jakes-pets.herokuapp.com/pets/${petId}/interact`,{
            method:"POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({"action":actionId})
        })
        .then(()=> getPets())
    }

    return (
        <PetContext.Provider value={{pets, getPets, createPet, deletePet, interactWithPet}} >
            { props.children }
        </PetContext.Provider>
    )
}