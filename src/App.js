import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

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
    let btnClass = '';
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index)  => {
            return <Person
                      key={person.id}
                      changed={(event) => this.nameChangeHandler(event, person.id)}
                      name={person.name} 
                      age={person.age}
                      click={() => this.deletePersonHandler(index)}/>
          })} 
        </div>
        );
      btnClass = classes.red;
    }

    let assignedClasses = [];
    if (this.state.persons.length <= 2) assignedClasses.push(classes.red);
    if (this.state.persons.length <= 1) assignedClasses.push(classes.bold);

    return (
        <div className={classes.App}>
          <h1>Hi I'm React app</h1>
          <p className={assignedClasses.join(' ')}>This is really working!</p>
          <button
            className={btnClass}
          	onClick={this.togglePersonsHandler}>Toggle Persons
          </button>
          {persons}
        </div>
    );
    //return React.createElement('div', {className: 'App'}, 
    		//React.createElement('h1', null, "Hi Iam happy"));
  }
}

export default App;
