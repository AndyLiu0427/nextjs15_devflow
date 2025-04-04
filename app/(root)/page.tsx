import Link from "next/link";

import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import HomeFilter from "@/components/filters/HomeFilter";
import QuestionCard from "@/components/cards/QuestionCard";

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "react" }
    ],
    author: { _id: "1", name: "John Doe", image: "https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg" },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date()
  },
  {
    _id: "2",
    title: "How to learn Next.js?",
    tags: [
      { _id: "1", name: "Next.js" },
    ],
    author: { _id: "1", name: "John Doe", image: "https://www.shutterstock.com/image-vector/black-woman-smiling-portrait-vector-600nw-2281497689.jpg" },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2020-01-01")
  }
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = "", filter = "" } = await searchParams;

  const filterQuestions = questions.filter((question) => {
    const matchesQuery = question.title.toLowerCase().includes(query?.toLowerCase());
    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter?.toLowerCase()
      : true;
    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filterQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
