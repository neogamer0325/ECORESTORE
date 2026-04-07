import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, Trophy, RefreshCcw } from "lucide-react";
import { Button } from "./Button";
import { Card } from "./Card";
import { cn } from "../lib/utils";

const questions = [
  {
    question: "Which of these items is typically NOT compostable in a home bin?",
    options: ["Eggshells", "Coffee grounds", "Meat scraps", "Fruit peels"],
    correct: 2,
    explanation: "Meat and dairy can attract pests and create odors in home compost bins. They are better suited for industrial composting."
  },
  {
    question: "What does the number inside the recycling triangle on plastic items represent?",
    options: ["How many times it can be recycled", "The type of plastic resin used", "The item's weight", "The recycling priority"],
    correct: 1,
    explanation: "The number is a Resin Identification Code that tells recyclers what kind of plastic the item is made of."
  },
  {
    question: "How much water does the average person save by turning off the tap while brushing their teeth?",
    options: ["2 liters", "8 liters", "15 liters", "30 liters"],
    correct: 1,
    explanation: "Turning off the tap can save up to 8 liters of water per minute!"
  }
];

import { useUser } from "../contexts/UserContext";

export function SustainabilityQuiz() {
  const { addPoints } = useUser();
  const [currentStep, setCurrentStep] = React.useState<"start" | "quiz" | "result">("start");
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [score, setScore] = React.useState(0);
  const [showExplanation, setShowExplanation] = React.useState(false);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      addPoints(score * 15);
      setCurrentStep("result");
    }
  };

  const resetQuiz = () => {
    setCurrentStep("start");
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowExplanation(false);
  };

  return (
    <Card className="p-8 border border-eco-leaf/20 relative overflow-hidden min-h-[400px] flex flex-col">
      <AnimatePresence mode="wait">
        {currentStep === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-3xl bg-eco-green/10 flex items-center justify-center text-eco-green">
              <HelpCircle size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif">Sustainability IQ Quiz</h3>
              <p className="text-sm text-eco-dark/60 max-w-xs mx-auto">
                Test your knowledge and earn up to <span className="font-bold text-eco-green">50 points</span> for the leaderboard!
              </p>
            </div>
            <Button onClick={() => setCurrentStep("quiz")} className="px-12">
              Start Quiz
            </Button>
          </motion.div>
        )}

        {currentStep === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 space-y-8"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <div key={i} className={cn(
                    "w-8 h-1 rounded-full transition-colors",
                    i === currentQuestion ? "bg-eco-green" : i < currentQuestion ? "bg-eco-green/40" : "bg-eco-leaf/20"
                  )} />
                ))}
              </div>
            </div>

            <h4 className="text-xl font-serif leading-tight">
              {questions[currentQuestion].question}
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {questions[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(i)}
                  disabled={selectedOption !== null}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group",
                    selectedOption === null ? "border-eco-leaf/10 hover:border-eco-green hover:bg-eco-leaf/5" :
                    i === questions[currentQuestion].correct ? "border-eco-green bg-eco-green/5" :
                    selectedOption === i ? "border-red-200 bg-red-50" : "border-eco-leaf/5 opacity-50"
                  )}
                >
                  <span className="font-medium text-sm">{option}</span>
                  {selectedOption !== null && i === questions[currentQuestion].correct && (
                    <CheckCircle2 size={18} className="text-eco-green" />
                  )}
                  {selectedOption === i && i !== questions[currentQuestion].correct && (
                    <XCircle size={18} className="text-red-500" />
                  )}
                </button>
              ))}
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4"
              >
                <div className="p-4 rounded-xl bg-eco-leaf/5 text-xs text-eco-dark/60 leading-relaxed italic border-l-4 border-eco-green">
                  {questions[currentQuestion].explanation}
                </div>
                <Button onClick={handleNext} className="w-full gap-2">
                  {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                  <ArrowRight size={18} />
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}

        {currentStep === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-green">
                <Trophy size={48} />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-eco-earth flex items-center justify-center text-white font-bold text-xs border-4 border-white"
              >
                +{score * 15}
              </motion.div>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-serif">Great Job!</h3>
              <p className="text-sm text-eco-dark/60">
                You scored <span className="font-bold text-eco-dark">{score} out of {questions.length}</span>. 
                Your points have been added to your profile.
              </p>
            </div>

            <div className="flex gap-4 w-full">
              <Button variant="outline" onClick={resetQuiz} className="flex-1 gap-2">
                <RefreshCcw size={18} />
                Try Again
              </Button>
              <Button onClick={resetQuiz} className="flex-1">
                Back to Learning
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
