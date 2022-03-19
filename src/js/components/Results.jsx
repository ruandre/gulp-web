import React from 'react'
import PropTypes from 'prop-types'

const Results = ({ data, formState, setFormState, setStep }) => {
  const onTryAgainClick = () => {
    // reset
    setFormState([])
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

Results.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answers: PropTypes.arrayOf(PropTypes.string),
      correctAnswer: PropTypes.string.isRequired,
    })
  ).isRequired,

  formState: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,

  setFormState: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
}

export default Results
