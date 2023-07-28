import { useEffect } from "react";

function TesteWallet() {
  const doSearch = async () => {
    console.log(window.ethereum);
    if (!window.ethereum) {
      return console.log('Instale o metamask');
    }
  };

  useEffect(() => {
    doSearch();
  }, []);
  return (
    <div>
      <h1>Olá</h1>
    </div>
  );
}

export default TesteWallet;
