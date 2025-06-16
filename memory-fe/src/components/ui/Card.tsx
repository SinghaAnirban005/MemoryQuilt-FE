import { ShareIcon } from "../../icons/ShareIcon";
import { Bin } from "../../icons/Bin";
import { Twitter } from "../../icons/Twitter";
import { Youtube } from "../../icons/Youtube";
import { Tweet } from "react-tweet"

interface CardProps {
  title: string;
  contentType: "t" | "youtube" | "tweet";
  createdOn: any;
  size: "sm" | "md" | "lg";
  url: string;
  cardId: string
}

const sizeVariants = {
  sm: "w-[18vw] min-h-[21vw]",
  md: "w-[25vw] min-h-[29vw]",
  lg: "w-[32vw] min-h-[35vw]",
};

export const Card = (props: CardProps) => {
    const extractTweetId = (url: string) => {
    const match = url.match(/(?:twitter\.com|x\.com)\/(?:#!\/)?\w+\/status\/(\d+)/i);
    return match ? match[1] : null;
  };

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const tweetId = props.contentType === "t" || "tweet" ? extractTweetId(props.url) : null;
  const youtubeId = props.contentType === "youtube" ? getYouTubeId(props.url) : null;


  return (
    <div className={`${sizeVariants[props.size]} group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 hover:border-violet-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/20`}>
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/5 to-cyan-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex flex-col justify-between h-full">
        <div className="flex justify-between items-center p-4 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            {props.contentType === "t" || "tweet" ? (
              <div className="p-2 rounded-full bg-blue-500/20">
                <Twitter height="16" width="16" />
              </div>
            ) : (
              <div className="p-2 rounded-full bg-red-500/20">
                <Youtube size="sm" />
              </div>
            )}
            <span className="text-xs font-medium text-slate-400 tracking-wider">
              {props.contentType === 't' ? "TWEET" : "YOUTUBE"}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <button className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors duration-200 group/btn">
              <ShareIcon size="sm" className="text-slate-400 group-hover/btn:text-violet-400 transition-colors" />
            </button>
            <button className="p-2 rounded-full bg-slate-700/50 hover:bg-red-500/20 transition-colors duration-200 group/btn">
              <Bin size="sm" type={props.contentType} url={props.url} contentId={props.cardId} />
            </button>
          </div>
        </div>

        <div className="px-4 py-3">
          <h3 className="font-bold text-lg text-white line-clamp-2 leading-tight">
            {props.title}
          </h3>
        </div>

        <div className="flex-1 flex justify-center items-center p-4">
          {props.contentType === "t" && tweetId ? (
            <div className="w-full max-w-[22vw] rounded-xl overflow-hidden border border-slate-700/30">
              <Tweet id={tweetId} />
            </div>
          ) : props.contentType === "youtube" && youtubeId ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700/30">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
            </div>
          ) : (
            <p className="text-sm text-slate-400">Invalid content URL</p>
          )}
        </div>

        <div className="p-4 bg-slate-800/30 backdrop-blur-sm border-t border-slate-700/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Added {props.createdOn}
            </span>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};