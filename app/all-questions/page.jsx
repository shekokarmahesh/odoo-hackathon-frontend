"use client";
import { useState } from "react";
import FilterBar from "@/components/FilterBar";
import QuestionCard from "@/components/QuestionCard";
import Pagination from "@/components/Pagination";
import { sampleQuestions } from "@/data/sampleQue";
import Header from "@/components/Header";

const page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;
  const totalPages = Math.ceil(sampleQuestions.length / questionsPerPage);

  const getCurrentQuestions = () => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    return sampleQuestions.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-white">
        <Header />
      </div>
      <FilterBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {getCurrentQuestions().map((question) => (
            <QuestionCard
              key={question.id}
              title={question.title}
              description={question.description}
              tags={question.tags}
              userName={question.userName}
              answerCount={question.answerCount}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default page;
