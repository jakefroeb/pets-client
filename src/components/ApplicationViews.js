import React from "react"
import { Route } from "react-router-dom"
import { AnimalTypeProvider } from "./pet/AnimalTypeProvider"
import { PetList } from "./pet/PetList"
import { PetProvider } from "./pet/PetProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <PetProvider>
                <AnimalTypeProvider>
                    <Route exact path="/"><PetList/></Route>
                </AnimalTypeProvider>
            </PetProvider>
        </main>
    </>
}