import React from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom" 
  // sert de composant parent pour les autres composants 
  // utilisant Chakra UI.
  // fournit un thème à tous les composants enfants 
  // ( Header dans ce cas) via l' API Context de React.

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import TodosTable from "./components/TodosTable"
import AddTodo from "./components/AddTodo"

import {TodoProvider} from './ToDoContext'
import UpdateTodo from "./components/UpdateTodo";
import { UpdateTodoContextProvider } from "./UpdateTodoContext";
  // Import le Todos composant

function App() {
  return (
    <div>
        <Router>
            <Switch>
              <TodoProvider>
                <NavBar />
                <div className="row">
                  <div className="col-sm-11 col-xm-12 mr-auto ml-auto mt-4 mb-4">
                    <UpdateTodoContextProvider>
                      <Route exact path="/" component={TodosTable} />
                      <Route exact path="/addTodo" component={AddTodo} />
                      <Route exact path="/updateTodo" component={UpdateTodo} />
                    </UpdateTodoContextProvider>
                  </div>
                </div>
              </TodoProvider>
            </Switch>
        </Router>
    </div>
  );
}

export default App;


// version précéedente


// import { useEffect, useState } from "react";
// import { 
//     ChakraProvider, 
//     //Container, 
//     Heading, 
//     Center, 
//     VStack,
//     Text,
//     HStack,
//     Button,
//     SimpleGrid,
// } from "@chakra-ui/react";


// version précéedente

// export default function App() {
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