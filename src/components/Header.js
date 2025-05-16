import './Components.css';

function Header() {
    return (
      <header className="container" style={{display: "flex", flexDirection: "row"}}>
        <div style={{width: "50%", display: "flex", justifyContent: "left"}}>
          <p>Epty</p>
        </div>
        <div style={{width: "50%", display: "flex", justifyContent: "right"}}>
          <button>Buy</button>
          <button>Sell</button>
        </div>
      </header>
    );
  }
  
  export default Header;
  