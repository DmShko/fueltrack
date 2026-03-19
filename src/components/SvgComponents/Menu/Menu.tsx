const Menu = (props: React.SVGProps<SVGSVGElement>) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-beetwen",
        }}
      >
        <svg fill="#1C274C" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" {...props}>
            <title>menu</title>
            <path d="M8 24h16v-4h-16v4zM8 18.016h16v-4h-16v4zM8 12h16v-4h-16v4z"></path>
        </svg>
      </div>
    );
  };
  
  export default Menu;
  