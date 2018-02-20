import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  
  state = {
  	persons: [
  		{id: 'sdasd1', name: "Max", age: 28},
  		{id: 'sdfdf2', name: "Manu", age: 29},
  		{id: 'ggsdf3', name: "Stephanie", age: 26}
  	],
  	otherState: 'some other state',
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    //zawsze trzeba tworzyc kopie stanu !!!
    //const persons = this.state.persons.slice(); //slice bez agumentow tworzy kopie
    const persons = [...this.state.persons]; //spread operator tez tworzy kopie
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })
    const person = {
      ...this.state.persons[personIndex]
    };//spread zeby nie zmieniac obiektu w stanie !!!

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

  	this.setState({persons: persons })
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  render() {
    let persons = null;
    if (this.state.showPersons) {
      persons = (
          <Persons
            persons = {this.state.persons}
            changed = {this.nameChangeHandler}
            click = {this.deletePersonHandler} />
        );
    }
    return (
        <div className={classes.App}>
          <Cockpit
            appTitle = {this.props.title}
            showPersons = {this.state.showPersons}
            persons = {this.state.persons}
            toggle = {this.togglePersonsHandler}
          />
          {persons}
        </div>
    );
    //return React.createElement('div', {className: 'App'}, 
    		//React.createElement('h1', null, "Hi Iam happy"));
  }
}

export default App;
