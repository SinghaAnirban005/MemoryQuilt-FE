import { ShareIcon } from "../../icons/ShareIcon";
import { Button } from "./Button";
import { AddIcon } from "../../icons/AddIcon";
import { useState } from "react";
import { ShareModal } from "./ShareModal";

const fontVariant = {
  sm: "text-2xl font-bold",
  md: "text-3xl font-bold",
  lg: "text-5xl font-bold",
};

interface HeaderProps {
    size: "md" | "sm" | "lg";
    content: any[];
    openModal?: () => void;
}

export const Header = (props: HeaderProps) => {
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);

    const openShareModal = () => setIsShareModalVisible(true);
    const closeShareModal = () => setIsShareModalVisible(false);

    return (        
    <>
      {isShareModalVisible && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={closeShareModal}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <ShareModal isOpen={isShareModalVisible} onClose={closeShareModal} />
          </div>
        </>
      )}

        <div className="relative z-10 flex justify-between items-center p-8 border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-1 h-12 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full" />
          <div>
            <h1 className={`${fontVariant[props.size]} bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent`}>
              Your Brain
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {props.content.length} items saved • Keep building your knowledge base
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button
            title="Share Brain"
            size="md"
            startIcon={<ShareIcon size="md" />}
            type="button"
            variant="secondary"
            onClick={openShareModal}
          />
          <Button
            title="Add Content"
            size="md"
            startIcon={<AddIcon size="md" />}
            type="button"
            variant="primary"
            onClick={props.openModal}
          />
        </div>
    </div>
    </>
    )
}