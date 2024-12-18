import React, { useEffect } from "react";
import { ShareIcon } from "../../icons/ShareIcon";
import { Bin } from "../../icons/Bin";
import { Twitter } from "../../icons/Twitter";
import { Youtube } from "../../icons/Youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";

interface CardProps {
  title: string;
  contentType: "tweet" | "youtube";
  createdOn: any;
  size: "sm" | "md" | "lg";
  url: string;
  cardId: string
}

const sizeVariants = {
  sm: "w-[18vw] min-h-[21vw] rounded-sm shadow-lg",
  md: "w-[25vw] min-h-[29vw] rounded-md shadow-lg shadow-indigo-500/50",
  lg: "w-[32vw] min-h-[35vw] rounded-lg shadow-xl",
};

export const Card = (props: CardProps) => {
    const extractTweetId = (url: string) => {
        const match = url.match(/status\/(\d+)/);
        return match ? match[1] : null;
      };

    const getYouTubeId = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };

    const tweetId = props.contentType === "tweet" ? extractTweetId(props.url) : getYouTubeId(props.url);

  return (
    <div className={sizeVariants[props.size] + " flex flex-col justify-around"}>
      <div className="flex justify-between items-center border-2 px-2 min-h-[4vw]">
        <div>
          {props.contentType === "tweet" ? (
            <Twitter width="20" height="30" />
          ) : (
            <Youtube size="md" />
          )}
        </div>

        <div className="font-bold text-xl">{props.title}</div>

        <div className="flex justify-between w-[3vw]">
          <ShareIcon size="md" />
          <Bin size="md" type={props.contentType} url={props.url} contentId={props.cardId} />
        </div>
      </div>

      <div className="flex justify-center items-center">
        {props.contentType === "tweet" && tweetId ? (
            <div className="flex justify-center w-[24vw] min-h-[10vw]">
                <TwitterTweetEmbed tweetId={tweetId} />
            </div>
        ) : (
          <div className="flex flex-col justify-center">
            <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${tweetId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          </div>
        )}
      </div>

      <div className="flex ml-2 text-sm font-bold text-slate-600">
        Added On {props.createdOn}
      </div>
    </div>
  );
};