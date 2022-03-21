import React, { useContext } from 'react'
import MultiStepFormContext from './MultiStepFormContext'

const Results = () => {
  const { data, setStep, formState, setFormState } =
    useContext(MultiStepFormContext)

  const onTryAgainClick = () => {
    setFormState([]) // reset
    setStep(0)
  }

  return (
    <div className="my-4">
      {formState.map(({ question, answer }, i) => (
        <div key={question}>
          <dl className="row">
            <dt className="col-sm-3">Question:</dt>
            <dd className="col-sm-9">{question}</dd>
          </dl>

          <dl className="row">
            <dt className="col-sm-3">Answer:</dt>
            <dd
              className={
                answer === data[i].correctAnswer
                  ? 'col-sm-9 text-success'
                  : 'col-sm-9 text-danger'
              }
            >
              {answer} {answer === data[i].correctAnswer ? '✔️' : '❌'}
            </dd>
          </dl>
        </div>
      ))}

      <button
        className="btn btn-primary"
        type="button"
        onClick={onTryAgainClick}
      >
        Try Again
      </button>
    </div>
  )
}

export default Results
