import React from 'react'
import ReactDOM from 'react-dom/client'
import MultiStepForm from './components/MultiStepForm'
import autoTrackLinks from './util/tracking'

const rootNode = document.getElementById('multi-step-form')

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <MultiStepForm />
  </React.StrictMode>
)

autoTrackLinks()
