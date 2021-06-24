import { useContext, useEffect, useState } from "react"
import { AnimalTypeContext } from "./AnimalTypeProvider"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Media, Input, Alert } from 'reactstrap';
import { PetContext } from "./PetProvider";

export const PetList = () =>{
    const {getAnimalTypes, animalTypes} = useContext(AnimalTypeContext)
    const {createPet, getPets, pets, deletePet, interactWithPet} = useContext(PetContext)
    const [modal, setModal] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [newPet, setNewPet] = useState({"animal":0, "name":""})
    const [selectedPetId, setSelectedPetId] = useState(0)

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
    const handleDeleteClicked = (petId) => {
        setDeleteModal(!deleteModal)
        setSelectedPetId(petId)
    }
    const handleActionClicked = (petId, actionId) => {
        interactWithPet(petId, actionId)
    }
    
    return(
        <>
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
                <Media object src={newPet.animal === 1 ?"https://res.cloudinary.com/dx1wu27jf/image/upload/v1624455177/happy-dog_fn6esq.jpg" : "https://res.cloudinary.com/dx1wu27jf/image/upload/v1624455886/happy_turtle_jlqymf.jpg"} style = {{maxHeight: 128,maxWidth: 128}} alt="doggo" />
                <Input placeholder="name" onChange={(e)=>{let tempPet = {...newPet}
                                    tempPet.name = e.target.value
                                    setNewPet(tempPet)}}></Input>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleCreatePetClicked}>Create Pet</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
                <h2>Your Pets</h2>
                {pets.map(pet => {
                    return(
                        <Media>
                            <Media left top>
                                <Media object src={pet.image_url} style = {{maxHeight: 256,maxWidth: 256}} alt="doggo" />
                            </Media>
                            <Media body>
                                <Media heading>
                                    {pet.name}
                                </Media>
                                <Button color="danger" onClick={(e)=>{e.preventDefault()
                                                                handleDeleteClicked(pet.id)}}>Delete</Button>
                                {pet.available_actions.map(actionId => {
                                    let action = pet.animal_type.actions.find(action => action.id === actionId)
                                    if(action){
                                    return(<Button color="info" onClick={(e)=>{
                                    e.preventDefault()
                                    handleActionClicked(pet.id, action.id)
                                    }}>{action.name}</Button>)
                                }})}
                            </Media>
                        </Media>
                    )
                })}
                <Modal isOpen={deleteModal} className="deleteModal">
                    <ModalHeader>Are You Sure</ModalHeader>
                    <ModalFooter>
                        <Button color="danger" onClick={(e)=>{e.preventDefault()
                                                            deletePet(selectedPetId).then(()=>handleDeleteClicked(0))}}>Delete Pet</Button>{' '}
                        <Button color="secondary" onClick={(e)=>{ e.preventDefault()
                                                            handleDeleteClicked(0)}}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    )
}