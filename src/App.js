import React, { Component } from 'react'
import logo from './logo.svg'
import firebase from 'firebase'
import 'firebase/firestore'
import json2csv from 'json2csv'
import faker from 'faker'
import './App.css'

firebase.initializeApp({
  apiKey: 'AIzaSyDfx2_h-Bw6Nw3fAk0BThBOf5m1lXSur9Q',
  authDomain: 'my-project-1-7df54.firebaseapp.com',
  projectId: 'my-project-1-7df54',
})

const db = firebase.firestore()
const things = db.collection('things')

faker.locale = 'fr'

class App extends Component {
  state = {
    csv: '',
  }

  write = (e) => {
    e.preventDefault()

    const now = new Date()
    things.add({
      name: faker.name.findName(),
      company: faker.company.companyName(),
      email: faker.internet.email(),
      mobile: faker.phone.phoneNumber(faker.random.arrayElement([
          '06########',
          '07########',
        ]),
      ),
      created: now.toISOString(),
    })

  }

  read = async () => {
    const querySnapshot = await things.orderBy('created').get()
    const data = querySnapshot.docs.map(doc => doc.data())
    this.setState({ csv: data.length > 0 ? json2csv({ data }) : '' })
  }

  render() {
    const { csv } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          <button onClick={this.write}>write</button>
        </p>
        <p>
          <button onClick={this.read}>read</button>
        </p>
        <textarea value={csv} />
      </div>
    )
  }
}

export default App
