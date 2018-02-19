import React, { Component } from 'react';
import './App.css';
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
  	const style = {
  		backgroundColor: 'green',
      color: "white",
  		font: 'inherit',
  		border: '1px solid blue',
  		padding: '8px',
  		cursor: 'pointer'
  	};

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index)  => {
            return <Person
                      changed={(event) => this.nameChangeHandler(event, person.id)}
                      key={person.id}
                      name={person.name} 
                      age={person.age}
                      click={() => this.deletePersonHandler(index)}/>
          })} 
        </div>
        );
      style.backgroundColor = "red";
    }

    let classes = [];
    if (this.state.persons.length <= 2) classes.push('red');
    if (this.state.persons.length <= 1) classes.push('bold');

    return (
        <div className="App">
          <h1>Hi I'm React app</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button
          	style={style}
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
