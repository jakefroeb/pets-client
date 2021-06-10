import { useContext, useEffect, useState } from "react"
import { AnimalTypeContext } from "./AnimalTypeProvider"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Media, Input, Alert } from 'reactstrap';
import { PetContext } from "./PetProvider";

export const PetList = () =>{
    const {getAnimalTypes, animalTypes} = useContext(AnimalTypeContext)
    const {createPet, getPets, pets} = useContext(PetContext)
    const [modal, setModal] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [newPet, setNewPet] = useState({"animal":0, "name":""})

    useEffect(()=>{
        getAnimalTypes().then(()=> getPets())
    },[])
    const toggle = () => setModal(!modal)
    const toggleDropdown = () => setDropdown(!dropdown)
    const handleCreatePetClicked = () => {
        if(newPet.animal && newPet.name){
            toggle()
            createPet(newPet).then(()=>{
                setNewPet({"animal":0, "name":""})
            })
        }else{
            alert("please fill out all fields")
            }
    }
    
    return(
        <>{console.log(pets)}
        <div>
            <Button color="success" onClick={toggle}>Get a Pet</Button>
            <Modal isOpen={modal} className="petModal">
                <ModalHeader>Choose a Pet</ModalHeader>
                <ModalBody>
                <Dropdown isOpen={dropdown} toggle={toggleDropdown}>
                <DropdownToggle caret>
                    {newPet.animal?animalTypes[newPet.animal-1].name:"choose your pet"}
                </DropdownToggle>
                    <DropdownMenu>
                        {animalTypes.map(animalType => <DropdownItem onClick={()=>{let tempPet = {...newPet}
                                                                                    tempPet.animal = animalType.id
                                                                                    setNewPet(tempPet)}}>{animalType.name}</DropdownItem>)}
                    </DropdownMenu>
                </Dropdown>
                <Media object src="http://localhost:8000/media/dog_images/happy-dog.jpeg" style = {{maxHeight: 128,maxWidth: 128}} alt="doggo" />
                <Input placeholder="name" onChange={(e)=>{let tempPet = {...newPet}
                                    tempPet.name = e.target.value
                                    setNewPet(tempPet)}}></Input>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleCreatePetClicked}>Create Pet</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
    </div>
        
        </>
    )
}