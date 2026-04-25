import { QuizEngine } from '@/components/quiz/quiz-engine';

export const metadata = { title: 'Quiz · In Progress' };

export default function QuizStartPage() {
  return (
    <div className="container-page pt-10 pb-16">
      <QuizEngine />
    </div>
  );
}
