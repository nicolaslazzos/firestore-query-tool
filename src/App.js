import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    //metodo que se inicializa primero cuando se carga el componente
    super(); //para que herede toda la funcionalidad de Component, va siempre que se cree un constructor
    this.state = {
      ruta: '',
      consulta: '',
      propiedades: '',
      result: []
    }
  }

  componentWillMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyDerl2Rg8I9UfUPltZ65WNTAf_JqZ9ZVyE",
      authDomain: "manager-nico.firebaseapp.com",
      databaseURL: "https://manager-nico.firebaseio.com",
      projectId: "manager-nico",
      storageBucket: "manager-nico.appspot.com",
      messagingSenderId: "1077801360329",
      appId: "1:1077801360329:web:e678ef212f7b652a"
    };
    // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
  }

  handleInput(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    })
  }

  propsFilter(propiedades, doc) {
    if (propiedades !== '') {
      var props = propiedades.split(',').map(i => i.replace(/ /g, ""));
      var object = '{ ';

      for (var i = 0; i < props.length; i++) {
        object += `"${props[i]}": ${doc.data()[props[i]]}`;
        if (i < props.length - 1) {
          object += ', ';
        }
      }

      object += ' }'
    } else {
      object = JSON.stringify(doc.data());
    }

    return object;
  }

  executeQuery = () => {
    this.setState({ result: [] })

    const db = firebase.firestore();
    var ref;

    if (this.state.ruta) {
      var docQuery = !(this.state.ruta.split('/').length % 2);
      //tipo de consulta: ruta par = doc / ruta impar = collection
      if (docQuery) {
        //doc
        ref = db.doc(this.state.ruta);
      } else {
        //collection
        ref = db.collection(this.state.ruta);
      }

      //si hay filtros where o no
      if (this.state.consulta) {
        var wheres = this.state.consulta.split('.');
        var params = wheres.map(i => i.split("'"));
  
        for (var i = 0; i < wheres.length; i++) {
          var prop = params[i][1];
          var compare = params[i][3];
          var value = params[i][5];
          ref = ref.where(prop, compare, value);
        }
      }
  
      ref.get().then(snapshot => {
        var result = [];
        
        //tipo de consulta: ruta par = doc / ruta impar = collection
        if (docQuery) {
          //doc
          result.push(this.propsFilter(this.state.propiedades, snapshot));
        } else {
          //collection
          snapshot.forEach(doc => {
            result.push(this.propsFilter(this.state.propiedades, doc));
            //console.log(doc.data());
          })
        }

        this.setState({ result: result });
      });
    }
  }

  render() {
    const res = this.state.result.map((obj, i) => {
      return (
        <div className="row" key={i}>
          <textarea className='form-control' rows='1' defaultValue={obj} />
        </div>
      )
    })

    return (
      //este metodo retorna el componente, antes se pueden ejecutar otras cosas
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand text-light" href='#./'>
            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""></img>
            Firestore Query Executer [Beta]
          </a>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 mt-4">
              <div className="card bg-dark text-white">
                <div className="card-header">
                  <h5 className="card-title mb-0">Query</h5>
                </div>
                <div className="card-body text-left">
                  <div>
                    <div className="form-group">
                      <label htmlFor="ruta">Ruta:</label>
                      <input type="text" className="form-control" placeholder="collection/id/subcollection/id" name="ruta" onChange={this.handleInput.bind(this)}></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="consulta">Consulta (comillas simples):</label>
                      <input type="text" className="form-control" placeholder="where('name', '==', 'Nico').where('last', '==', 'Lazzos')" name="consulta" onChange={this.handleInput.bind(this)}></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="propiedades">Propiedades (beta):</label>
                      <input type="text" className="form-control" placeholder="name, last, id" name="propiedades" onChange={this.handleInput.bind(this)}></input>
                    </div>
                    <button className="btn btn-primary" onClick={this.executeQuery}>Ejecutar</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8" >
              <div style={{ margin: 25, marginLeft: 10 }}>
                {res}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
