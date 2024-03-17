import React from 'react'

const Question =(props) => {

        let { question, answer, incorrect_answers } = props;
        return (
            <div className="my-3">
                <div className="card">
                    <div className="card-body">
                        <h5>{question}</h5>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                <label class="form-check-label" for="flexRadioDefault1">
                                <p>{answer}</p>
                                </label>
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                <label class="form-check-label" for="flexRadioDefault1">
                                <p>{incorrect_answers}</p>
                                </label>
                        </div>
                    </div>
                </div>
            </div>

            
            
        )
}

export default Question
