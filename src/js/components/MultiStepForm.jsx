import React, { useMemo, useState } from 'react'

import MultiStepFormContext from './MultiStepFormContext'
import QuestionRadio from './QuestionRadio'
import Results from './Results'

import data from '../data'

const MultiStepForm = () => {
  const [step, setStep] = useState(0)
  const [formState, setFormState] = useState([])

  const multiStepFormState = useMemo(
    () => ({
      data,
      step,
      setStep,
      formState,
      setFormState,
    }),
    [step, formState]
  )

  const steps = [
    ...data.map(item => (
      <QuestionRadio question={item.question} answers={item.answers} />
    )),
    ...[<Results />],
  ]

  return (
    <MultiStepFormContext.Provider value={multiStepFormState}>
      {steps[step]}
    </MultiStepFormContext.Provider>
  )
}

export default MultiStepForm
