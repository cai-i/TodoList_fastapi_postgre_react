import React, { useEffect, useState } from "react";
    // useState crochet est responsable de la gestion de l'état local 
        // de notre application
    // useEffect crochet nous permet d'effectuer des opérations 
        // telles que la récupération de données
import { 
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";

// crée un contexte pour gérer les activités d'état globales 
// dans tous les composants
const TodosContext = React.createContext({
    // def un objet de contexte via createContext 
    // qui prend deux valeurs de fournisseur :
    todos: [], fetchTodos: () => {}
  })

function AddTodo() {
    // created a new state variable that will hold the value from the form
    const [item, setItem] = React.useState("")
    // also retrieved the context values, todos and fetchTodos
    const {todos, fetchTodos} = React.useContext(TodosContext)
    // fonctions permettant d'obtenir les entrées du formulaire 
    // et de gérer la soumission du formulaire
    const handleInput = event  => {
        setItem(event.target.value)
    }
      
    const handleSubmit = (event) => {
        const newTodo = {
            "id": todos.length + 1,
            "item": item
        }
        
        fetch("http://localhost:5000/todo_v2", {
            // ajout une requête POST
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // envoyé des données au serveur avec les informations sur la tâche ??? ici ???
            body: JSON.stringify(newTodo)
        }).then(fetchTodos) // appel fetchTodos pour mettre à jour todos
    }

    // définissons l' écouteur d'événement de formulaire onSubmit sur la fonction handleSubmit
    return (
        <form onSubmit={handleSubmit}> 
            <InputGroup size="md">
                <Input
                    pr="4.5rem"
                    type="text"
                    placeholder="Add a todo item"
                    aria-label="Add a todo item"
                    onChange={handleInput} // La valeur de l'élément todo est également mise à jour lorsque la valeur d'entrée change via l'écouteur onChange.
                />
            </InputGroup>
        </form>
    )
}

// def le composant UpdateTodo
function UpdateTodo({item, id}) {
    // variables d'état ci-dessus sont pour le modal
    // and to hold the todo value to be updated
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [todo, setTodo] = useState(item)
    // fetchTodos context value is also imported for updating todos 
    // after the changes have been made
    const {fetchTodos} = React.useContext(TodosContext)

    // function responsible for sending PUT requests
    const updateTodo = async () => {
        await fetch(`http://localhost:8000/todo/${id}`, {
            // PUT request is sent to the backend
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item: todo })
        })
        onClose() // called to close the modal
        await fetchTodos()
    }

    return (
        // create a modal using Chakra UI's Modal components
        // listen for changes to the textbox
        // updated the state object todo
        // when the button "Update Todo" is clicked, the function updateTodo() is invoked and our todo is updated
        <>
            <Button h="1.5rem" size="sm" onClick={onOpen}>Update Todo</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Update Todo</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type="text"
                                placeholder="Add a todo item"
                                aria-label="Add a todo item"
                                value={todo}
                                onChange={event => setTodo(event.target.value)}
                            />
                        </InputGroup>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button h="1.5rem" size="sm" onClick={updateTodo}>Update Todo</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function DeleteTodo({id}) {
    const {fetchTodos} = React.useContext(TodosContext)
    // invoque la fetchTodos fonction à partir de l'objet d'état global
  
    const deleteTodo = async () => {
        // fonction asynchrone qui envoie une requête DELETE au serveur
        await fetch(`http://localhost:5000/todo_v2/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: { "id": id }
        })
        await fetchTodos()
        // met à jour la liste des tâches en appelant à nouveau fetchTodos
    }
  
    return (
        // bouton qui, lorsqu'il est cliqué, déclenche deleteTodo()
        <Button h="1.5rem" size="sm" onClick={deleteTodo}>Delete Todo</Button>
    )
}

// rendered the todo passed to the component and attached an update button to it
function TodoHelper({item, id, fetchTodos}) {
    return (
        <Box p={1} shadow="sm">
            <Flex justify="space-between">
                <Text mt={4} as="div">
                    {item}
                    <Flex align="end">
                        <UpdateTodo item={item} id={id} fetchTodos={fetchTodos}/>
                        <DeleteTodo id={id} fetchTodos={fetchTodos}/>
                    </Flex>
                </Text>
            </Flex>
        </Box>
    )
}

// ajoute le Todos composant
export default function Todos() {
    // crée un tableau de variables d'état vide todos, 
    // et une méthode d'état setTodos, 
    // afin que nous puissions mettre à jour la variable d'état
    const [todos, setTodos] = useState([])
    // def fonction fetchTodos
    const fetchTodos = async () => {
        // pour récupérer les tâches du backend de manière asynchrone
        const response = await fetch("http://localhost:5000")
        // mettre à jour la todo variable d'état à la fin de la fonction
        const todos = await response.json()
        setTodos(todos.data.data)
    }
    useEffect(() => {
        // récupère les todos à l'aide de la fetchTodos fonction
        fetchTodos()
    }, [])
    
    // récupérez les tâches à l'aide de la fetchTodosfonction 
    // et restituez les données en parcourant la variable d'état todos
    return (
        <TodosContext.Provider value={{todos, fetchTodos}}>
            <AddTodo />
            <Stack spacing={5}>
                <b> Marche ? </b>
                {
                    todos.map((todo) => (
                        <TodoHelper item={todo.item} id={todo.id} fetchTodos={fetchTodos} />
                    ))
                }
            </Stack>
        </TodosContext.Provider>
    )
}
//     const [allTodos, setAllTodos] = useState([])

//     // version test
//     const fetchTodos = async () => {
//         // pour récupérer les tâches du backend de manière asynchrone
//         const response = await fetch("http://localhost:5000")
//         // mettre à jour la todo variable d'état à la fin de la fonction
//         const todos = await response.json()
//         setAllTodos(todos)
//     }
//     useEffect(() => {
//         // récupère les todos à l'aide de la fetchTodos fonction
//         fetchTodos()
//     }, [])

    // version 3
    /*
    // is going to make the call
    useEffect(() => {
        fetch("http://localhost:5000/todos")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setAllTodos([data]);
            });
    }, [])
    */

    // center : background in black
        // frontcolor of white
    // VStack : vertical stack
    // Button
        // lg = large



//   return (
//     <ChakraProvider>
//         <Center bg="black" color="white" padding={8}>
//             <VStack spacing={7}>
//                 <Heading> Your ToDo List</Heading>
//                 <HStack>
//                     <Text>Take a look at all the things you need to do!</Text>
//                     <Button size="lg" colorScheme="red" isDisabled={null} onClick={null}>
//                         Add ToDo
//                     </Button> 
//                 </HStack>
//                 <Heading> What you need to do</Heading>
//                 <SimpleGrid columns={1} spacing={8}>
//                     {
//                         allTodos.map(todo =>{
//                             return (
//                                 <b> {todo.title} {todo.unit}</b>
//                             )
//                         })
//                     }
//                 </SimpleGrid>
//             </VStack>
//         </Center>
//     </ChakraProvider>
//   );
// }