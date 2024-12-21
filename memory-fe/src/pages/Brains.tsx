import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ShareIcon } from "../icons/ShareIcon";
import { AddIcon } from "../icons/AddIcon";
import { ContentModal } from "../components/ui/ContentModal";
import { ShareModal } from "../components/ui/ShareModal";

interface Brains {
  size: "md" | "sm" | "lg";
  content: any[];
}

const fontVariant = {
  sm: "flex text-[2vw] font-bold",
  md: "flex text-[2.5vw] font-bold",
  lg: "flex text-[5vw] font-bold",
};

export const Brains = (props: Brains) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false)

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const openShareModal  = () => setIsShareModalVisible(true)
  const closeShareModal = () => setIsShareModalVisible(false)

  return (
    <div className="flex flex-col h-[100%] relative">
      {isModalVisible && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeModal}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <ContentModal isOpen={isModalVisible} onClose={closeModal} />
          </div>
        </>
      )}

      {
        isShareModalVisible && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeShareModal}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <ShareModal isOpen={isShareModalVisible} onClose={closeShareModal} />
            </div>
          </>
        )
      }

      <div className="flex justify-between mt-[2vw] px-[2vw] shadow-xl">
        <span className={fontVariant[props.size]}>All Notes</span>
        <div className="flex justify-between min-w-[22vw]">
          <Button
            title={"Share Brain"}
            size="md"
            startIcon={<ShareIcon size="md" />}
            type="button"
            variant="secondary"
            onClick={openShareModal}
          />
          <Button
            title={"Add Content"}
            size="md"
            startIcon={<AddIcon size="md" />}
            type="button"
            variant="primary"
            onClick={openModal}
          />
        </div>
      </div>
      <ul className="flex overflow-y-auto h-[100%] gap-2 flex-wrap pt-2 justify-around">
        {props.content.map((item, index) => {
          const date = new Date(item.createdAt);
          const formattedDate1 = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          return (
            <div key={index}>
              {item.type === "tweet" ? (
                <Card
                title={item.title}
                contentType={item.type}
                url={item.link}
                size="md"
                createdOn={formattedDate1}
                cardId={item._id}
              />
              ) : (
                <Card
                  title={item.title}
                  contentType={item.type}
                  url={item.link}
                  size="sm"
                  createdOn={formattedDate1}
                  cardId={item._id}
                />
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
};
