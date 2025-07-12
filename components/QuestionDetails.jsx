"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";

const QuestionDetailsPage = ({
  que,
  ans,
  questionId,
  isLoggedIn = true,
}) => {
  // Mock data - replace with actual data fetching
  const [question, setQuestion] = useState({
    id: 1,
    title:
      "How to join 2 columns in a data set to make a separate column in SQL?",
    description:
      "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name and column 2 consists of last name I want a column 3 to combine both.",
    tags: ["sql", "database", "beginner"],
    author: "John Doe",
    createdAt: "2024-01-15",
    votes: 5,
  });

  const [answers, setAnswers] = useState([
    {
      id: 1,
      content:
        "You can use the CONCAT function or the || operator to combine columns. Here's an example:\n\nSELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;\n\nOr using the || operator:\n\nSELECT first_name || ' ' || last_name AS full_name FROM users;",
      author: "Jane Smith",
      createdAt: "2024-01-15",
      votes: 8,
      userVote: null, // null, 'up', or 'down'
    },
    {
      id: 2,
      content:
        "Another approach is to use the CONCAT_WS function which handles NULL values better:\n\nSELECT CONCAT_WS(' ', first_name, last_name) AS full_name FROM users;",
      author: "Mike Johnson",
      createdAt: "2024-01-16",
      votes: 3,
      userVote: null,
    },
  ]);

  const [newAnswer, setNewAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Breadcrumb data
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Questions", href: "/questions" },
    { label: "Question Details", href: null },
  ];

  // Handle voting
  const handleVote = (answerId, voteType) => {
    if (!isLoggedIn) {
      alert("Please log in to vote");
      return;
    }

    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) => {
        if (answer.id === answerId) {
          let newVotes = answer.votes;
          let newUserVote = voteType;

          // If user already voted the same way, remove the vote
          if (answer.userVote === voteType) {
            newUserVote = null;
            newVotes = voteType === "up" ? answer.votes - 1 : answer.votes + 1;
          }
          // If user voted differently, change the vote
          else if (answer.userVote && answer.userVote !== voteType) {
            newVotes = voteType === "up" ? answer.votes + 2 : answer.votes - 2;
          }
          // If user hasn't voted, add the vote
          else {
            newVotes = voteType === "up" ? answer.votes + 1 : answer.votes - 1;
          }

          return {
            ...answer,
            votes: newVotes,
            userVote: newUserVote,
          };
        }
        return answer;
      })
    );
  };

  // Handle answer submission
  const handleSubmitAnswer = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Please log in to post an answer");
      return;
    }

    if (!newAnswer.trim()) {
      alert("Please enter your answer");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newAnswerObj = {
        id: answers.length + 1,
        content: newAnswer,
        author: "Current User", // Replace with actual user
        createdAt: new Date().toISOString().split("T")[0],
        votes: 0,
        userVote: null,
      };

      setAnswers((prev) => [...prev, newAnswerObj]);
      setNewAnswer("");
      alert("Answer posted successfully!");
    } catch (error) {
      alert("Error posting answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white">
        <Header />
      </div>

      <div className="min-h-screen bg-base-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="breadcrumbs text-sm mb-6">
            <ul>
              {breadcrumbs.map((crumb, index) => (
                <li key={index}>
                  {<span className="text-base-content/70">{crumb.label}</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* Question Card */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              {/* Question Title */}
              <h1 className="text-2xl font-bold text-base-content mb-4">
                {question.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="badge badge-primary badge-outline"
                  >
                    {tag}
                  </div>
                ))}
              </div>

              {/* Question Description */}
              <div className="prose max-w-none mb-6">
                <p className="text-base-content whitespace-pre-wrap">
                  {question.description}
                </p>
              </div>

              {/* Question Meta */}
              <div className="flex justify-between items-center text-sm text-base-content/70 border-t pt-4">
                <div>
                  Asked by{" "}
                  <span className="font-medium">{question.author}</span> on{" "}
                  {question.createdAt}
                </div>
                <div className="flex items-center gap-2">
                  <span>{question.votes} votes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Answers Section */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-6">
                {answers.length} Answer{answers.length !== 1 ? "s" : ""}
              </h2>

              {/* Answer List */}
              <div className="space-y-6">
                {answers.map((answer, index) => (
                  <div
                    key={answer.id}
                    className={`${
                      index !== answers.length - 1 ? "border-b pb-6" : ""
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Voting Section */}
                      <div className="flex flex-col items-center gap-2 min-w-[60px]">
                        <button
                          onClick={() => handleVote(answer.id, "up")}
                          disabled={!isLoggedIn}
                          className={`btn btn-ghost btn-sm p-2 ${
                            answer.userVote === "up"
                              ? "text-success bg-gray-300"
                              : "text-base-content/50"
                          } ${
                            !isLoggedIn
                              ? "cursor-not-allowed opacity-50"
                              : "hover:text-success"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </button>

                        <span className="text-lg font-bold">
                          {answer.votes}
                        </span>

                        <button
                          onClick={() => handleVote(answer.id, "down")}
                          disabled={!isLoggedIn}
                          className={`btn btn-ghost btn-sm p-2 ${
                            answer.userVote === "down"
                              ? "text-error bg-gray-300"
                              : "text-base-content/50"
                          } ${
                            !isLoggedIn
                              ? "cursor-not-allowed opacity-50"
                              : "hover:text-error"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Answer Content */}
                      <div className="flex-1">
                        <div className="prose max-w-none mb-4">
                          <p className="text-base-content whitespace-pre-wrap">
                            {answer.content}
                          </p>
                        </div>

                        {/* Answer Meta */}
                        <div className="text-sm text-base-content/70">
                          Answered by{" "}
                          <span className="font-medium">{answer.author}</span>{" "}
                          on {answer.createdAt}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Post Answer Section */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="text-xl font-bold mb-4">Your Answer</h3>

              {!isLoggedIn && (
                <div className="alert alert-info mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>
                    Please{" "}
                    <a href="/login" className="link link-primary">
                      log in
                    </a>{" "}
                    to post an answer.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmitAnswer} className="space-y-4">
                <div className="form-control">
                  <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Write your answer here..."
                    rows={8}
                    disabled={!isLoggedIn}
                    className={`textarea textarea-bordered w-full resize-y ${
                      !isLoggedIn ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!isLoggedIn || isSubmitting || !newAnswer.trim()}
                    className={`btn btn-primary px-8 ${
                      isSubmitting ? "loading" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm mr-2"></span>
                        Posting...
                      </>
                    ) : (
                      "Post Your Answer"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionDetailsPage;
