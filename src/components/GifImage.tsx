import { useState } from "react";

interface IGifImageProps {
  gifUrl: string;
  stillUrl: string;
  title: string;
}

export const GifImageActions = () => {
  return (
    <>
      <button>Action</button>
    </>
  );
};

export const GifImage = (props: IGifImageProps) => {
  const [animate, setAnimate] = useState<boolean>(true);

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
