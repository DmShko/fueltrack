const Mark = (props: React.SVGProps<SVGSVGElement>) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-beetwen",
        }}
      >
        <svg fill="#1C274C" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" {...props}
            viewBox="0 0 512 512" enableBackground="new 0 0 512 512" xmlSpace="preserve">
        <path d="M213.3,0h-128C38.2,0,0,38.2,0,85.3v128L298.7,512L512,298.7L213.3,0z M85.3,128c-23.6,0-42.7-19.1-42.7-42.7
            s19.1-42.7,42.7-42.7S128,61.8,128,85.3S108.9,128,85.3,128z M170.7,320L320,170.7l42.7,42.7L213.3,362.7L170.7,320z M256,405.3
            L405.3,256l42.7,42.7L298.7,448L256,405.3z"/>
        </svg>
      </div>
    );
  };
  
  export default Mark;
  