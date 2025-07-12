"use client";
import React from "react";
import { useParams } from "next/navigation";
import QuestionDetailsPage from "../../../components/QuestionDetails";
const Page = () => {
  const params = useParams();
  const questionId = params["que-id"];
  return <QuestionDetailsPage que={[]} ans={[]} questionId={questionId} />;
};

export default Page;
