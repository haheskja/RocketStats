import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Layout from './components/Layout'

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Layout>
          </Layout>
        </Switch>  
      </BrowserRouter>
  )
}

export default App
