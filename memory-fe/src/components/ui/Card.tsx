import React, { useEffect } from "react";
import { ShareIcon } from "../../icons/ShareIcon";
import { Bin } from "../../icons/Bin";
import { Twitter } from "../../icons/Twitter";
import { Youtube } from "../../icons/Youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";

interface CardProps {
  title: string;
  contentType: "tweet" | "youtube";
  createdOn?: Date;
  size: "sm" | "md" | "lg";
  url: string;
}

const sizeVariants = {
  sm: "w-[18vw] min-h-[21vw] rounded-sm shadow-xl",
  md: "w-[25vw] min-h-[29vw] rounded-md shadow-xl shadow-indigo-500/50",
  lg: "w-[32vw] min-h-[35vw] rounded-lg shadow-xl",
};

export const Card = (props: CardProps) => {
    const extractTweetId = (url: string) => {
        const match = url.match(/status\/(\d+)/);
        return match ? match[1] : null;
      };

    const tweetId = props.contentType === "tweet" ? extractTweetId(props.url) : props.url;

  return (
    <div className={sizeVariants[props.size] + " flex flex-col"}>
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
          <Bin size="md" type={props.contentType} url={props.url} />
        </div>
      </div>

      <div className="flex justify-center items-center">
        {props.contentType === "tweet" && tweetId ? (
            <div className="flex justify-center w-[24vw] min-h-[10vw]">
                <TwitterTweetEmbed tweetId={tweetId} />
            </div>
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${new URLSearchParams(
              new URL(props.url).search
            ).get("v")}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};
