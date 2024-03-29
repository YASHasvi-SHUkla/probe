
import React, { useState, useEffect } from "react";
import he from "he"; // a JS library for coding and decoding

const MCQ = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        // react hook used here for data fetching
        const fetchQuestions = async () => {
            try {
                const response = await fetch("https://opentdb.com/api.php?amount=10");
                const data = await response.json();
                // Added the selectedOption property as null, using the spread operator
                // console.log(data.results);
                const updatedQuestions = data.results.map((question) => ({
                    ...question,
                    selectedOption: null, // added this
                }));
                setQuestions(updatedQuestions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, []); // the closed [] indicate that it will not re run unless the component unmounts or mounts

    const handleOptionSelect = (option) => {
        if (selectedOption === null) {
            setSelectedOption(option);
            const currentQuestion = questions[currentQuestionIndex];
            if (option === currentQuestion.correct_answer) {
                setScore(score + 10);
            } else {
                setScore(Math.max(score - 5, 0)); // Ensure the score does not go below 0
            }

            const updatedQuestions = [...questions]; // Create a copy of questions
            updatedQuestions[currentQuestionIndex].selectedOption = option; // Set selected option for the current question
            setQuestions(updatedQuestions);
        }
    };

    const handleNextQuestion = () => {
        if (
            selectedOption !== null &&
            currentQuestionIndex < questions.length - 1 // the indexing in array starts from 0
        ) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(questions[currentQuestionIndex + 1].selectedOption); // Retrieving the  selected option
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(questions[currentQuestionIndex - 1].selectedOption); // Retrieving the  selected option
        }
    };

    const currentQuestion = questions[currentQuestionIndex];
    const actualQuestionNumber = currentQuestionIndex + 1;

    return (
        <div className="container">
            {questions.length > 0 && (
                <div>
                    <h3 className="question_num">{"Question " + actualQuestionNumber}</h3>
                </div>
            )}

            {currentQuestion && (
                <div>
                    <h2 className="question">{he.decode(currentQuestion.question)}</h2>{" "}
                    {/*used for decoding the question*/}
                    <div className="option-container">
                        {currentQuestion.incorrect_answers
                            .concat(currentQuestion.correct_answer)
                            .sort(() => Math.random() - 0.5)
                            .map((option, index) => {
                                const isCorrect = option === currentQuestion.correct_answer;
                                const isSelected = selectedOption === option;
                                let buttonStyle = {};

                                if (selectedOption !== null) {
                                    if (isCorrect) {
                                        buttonStyle.backgroundColor = "#90EE90"; // Set correct answer to green
                                        buttonStyle.color = "black";
                                    } else if (isSelected) {
                                        buttonStyle.backgroundColor = "#EE9090"; // Set selected wrong answer to red
                                        buttonStyle.color = "black";
                                    }
                                }

                                return (
                                    <ul key={index}>
                                        <li>
                                            <button
                                                className="options"
                                                onClick={() => handleOptionSelect(option)}
                                                disabled={selectedOption !== null}
                                                style={buttonStyle}
                                            >
                                                {he.decode(option)}
                                            </button>
                                        </li>
                                    </ul>
                                );
                            })}
                    </div>
                    <p className="score">Score: {score}</p>
                    <button
                        className="footer"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                    >
                        &larr; Previous
                    </button>
                    <button
                        className="footer"
                        onClick={handleNextQuestion}
                        disabled={
                            selectedOption === null ||
                            currentQuestionIndex === questions.length - 1
                        }
                    >
                        Next &rarr;
                    </button>
                </div>
            )}
        </div>
    );
};

export default MCQ;
