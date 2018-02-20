import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass';


class App extends PureComponent {
  
  constructor(props) {
    super(props);
    console.log('App.js inside constructor');
    this.state = {
      persons: [
        {id: 'sdasd1', name: "Max", age: 28},
        {id: 'sdfdf2', name: "Manu", age: 29},
        {id: 'ggsdf3', name: "Stephanie", age: 26}
      ],
      otherState: 'some other state',
      showPersons: false,
      toggleClicked: 0
    }
  }

  componentWillMount() {
    console.log('App.js insiede componentWillMount');

  }

  componentDidMount() {
    console.log('App.js inside componentDidMount')
  }
  
  // dziedziczenie po PureComponent zalatwia sprawe
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('App.js inside shouldComponentUpdate', nextProps, nextState);
  //   return nextState.person !== this.state.person ||
  //          nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('App.js inside componentWillUpdate')
  }

  componentDidUpdate() {
    console.log('App.js inside componentDidUpdate')
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
    const doesShow = this.state.showPersons;
    this.setState((previousState, props) => { //jezeli zalezymy od poprzedniego stanu, setState jest niesynchroniczny
      return {
        showPersons: !doesShow,
        toggleClicked: previousState.toggleClicked + 1
      }
    });
  }

  render() {
    console.log('App.js inside render');
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
        <Aux>
          <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
          <Cockpit
            appTitle = {this.props.title}
            showPersons = {this.state.showPersons}
            persons = {this.state.persons}
            toggle = {this.togglePersonsHandler}
          />
          {persons}
        </Aux>
    );
    //return React.createElement('div', {className: 'App'}, 
    		//React.createElement('h1', null, "Hi Iam happy"));
  }
}

export default withClass(App, classes.App);
