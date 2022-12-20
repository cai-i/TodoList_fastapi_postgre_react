import react from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom" ;

import NavBar from "./components/NavBar";
import TodosTable from "./components/TodosTable";
import AddTodo from "./components/AddTodo";
import UpdateTodo from "./components/UpdateTodo";
import {TodoProvider} from './ToDoContext';
import { UpdateTodoContextProvider } from "./UpdateTodoContext";

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