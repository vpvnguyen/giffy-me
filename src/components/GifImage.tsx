import { useState } from "react";

interface IGifImageProps {
  gifUrl: string;
  stillUrl: string;
  title: string;
}

export const GifImageActions = () => {
  return (
    <>
      <div>Gif Image Actions</div>
    </>
  );
};

export const GifImage = (props: IGifImageProps) => {
  const [animate, setAnimate] = useState<boolean>(false);

  const handleClick = (event: any) => {
    event.preventDefault();
    setAnimate(!animate);
  };

  return (
    <div>
      <img
        src={animate ? props.gifUrl : props.stillUrl}
        alt={props.title}
        onClick={handleClick}
      />
      <GifImageActions />
    </div>
  );
};