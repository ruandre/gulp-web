import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import shuffle from 'lodash-es/shuffle'
import sha1 from 'crypto-js/sha1'

const hash = str => sha1(str).toString()
const isAvailableAnswer = (answer, availableAnswers) =>
  availableAnswers.includes(answer)

const QuestionRadio = ({ question, answers, setStep, setFormState }) => {
  const id = hash(question)
  const shuffledAnswers = useMemo(() => shuffle(answers), [answers])
  const [hasError, setHasError] = useState(false)
  const [choice, setChoice] = useState(null)

  const onRadioChange = e => {
    if (e.target.value && isAvailableAnswer(e.target.value, answers)) {
      setHasError(false)
      setChoice({ question, answer: e.target.value })
    }
  }

  const onNextClick = () => {
    if (choice && isAvailableAnswer(choice.answer, answers)) {
      setStep(prev => prev + 1)
      setFormState(prev => [...prev, choice])
    } else {
      setHasError(true)
    }
  }

  return (
    <div>
      <h2 className="my-4">{question}</h2>

      <div className="my-4" onChange={onRadioChange}>
        {shuffledAnswers.map((answer, i) => (
          <div key={answer} className="form-check my-2">
            <input
              className="form-check-input"
              type="radio"
              name={id}
              id={`${id}-${i}`}
              value={answer}
            />{' '}
            <label
              className="form-check-label"
              key={answer}
              htmlFor={`${id}-${i}`}
            >
              {answer}
            </label>
          </div>
        ))}
      </div>

      {hasError && (
        <div className="text-danger my-2">Please select an answer.</div>
      )}

      <button className="btn btn-primary" type="button" onClick={onNextClick}>
        Next Question
      </button>
    </div>
  )
}

QuestionRadio.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  setStep: PropTypes.func.isRequired,
  setFormState: PropTypes.func.isRequired,
}

export default QuestionRadio
