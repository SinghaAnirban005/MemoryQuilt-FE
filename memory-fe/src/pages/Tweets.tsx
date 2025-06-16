import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { AddIcon } from "../icons/AddIcon";
import { Header } from "../components/ui/Header";
import { ContentModal } from "../components/ui/ContentModal";

interface Tweets {
  size: "md" | "sm" | "lg";
  content: any[];
}

export const Tweets = (props: Tweets) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/5 via-transparent to-cyan-900/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

      {isModalVisible && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={closeModal}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <ContentModal isOpen={isModalVisible} onClose={closeModal} />
          </div>
        </>
      )}

      <Header size={props.size} content={props.content} />

      <div className="flex-1 relative z-10 overflow-hidden">
        {props.content.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-32 h-32 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Your Tweets are Empty</h3>
              <p className="text-slate-400 max-w-md">
                Start curating knowledge by saving insightful tweets and links
              </p>
            </div>
            <Button
              title="Add Your First Content"
              size="lg"
              startIcon={<AddIcon size="md" />}
              type="button"
              variant="primary"
              onClick={openModal}
            />
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {props.content.map((item, index) => {
                const date = new Date(item.createdAt);
                const formattedDate = date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div
                    key={index}
                    className="transform transition-all duration-300 hover:scale-105"
                  >
                    <Card
                      title={item.title}
                      contentType={item.type}
                      url={item.link}
                      size={item.type === "tweet" ? "md" : "sm"}
                      createdOn={formattedDate}
                      cardId={item._id}
                    />
                  </div>
                );
              })}
            </div>
            <div className="h-8" />
          </div>
        )}
      </div>

      <div className="fixed bottom-8 right-8 md:hidden z-30">
        <button
          onClick={openModal}
          className="w-16 h-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full shadow-lg shadow-violet-500/25 flex items-center justify-center hover:scale-110 transition-transform duration-200"
        >
          <AddIcon size="md" className="text-white" />
        </button>
      </div>
    </div>
  );
};
