import React, { useState } from 'react'

import data from '../data'
import QuestionRadio from './QuestionRadio'
import Results from './Results'

const MultiStepForm = () => {
  const [step, setStep] = useState(0)
  const [formState, setFormState] = useState([])

  const steps = [
    ...data.map(item => (
      <QuestionRadio
        question={item.question}
        answers={item.answers}
        step={step}
        setStep={setStep}
        formState={formState}
        setFormState={setFormState}
      />
    )),
    ...[
      <Results
        data={data}
        formState={formState}
        setFormState={setFormState}
        setStep={setStep}
      />,
    ],
  ]

  return steps[step]
}

export default MultiStepForm
