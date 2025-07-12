"use client"
import QuestionDetailsPage from '@/components/QuestionDetails';
import { useParams } from "next/navigation";
const page = () => {
  const params = useParams();
  const questionId = params['que-id'] ;
  return (
    <QuestionDetailsPage
      que={[]}
      ans={[]}
      questionId={questionId}
    />
  );
}

export default page;