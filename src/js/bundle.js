import React from 'react'
import ReactDOM from 'react-dom'
import MultiStepForm from './components/MultiStepForm'
import autoTrackLinks from './util/tracking'

ReactDOM.render(
  <React.StrictMode>
    <MultiStepForm />
  </React.StrictMode>,
  document.getElementById('multi-step-form')
)

autoTrackLinks()
