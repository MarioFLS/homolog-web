import { useEffect } from "react";

function TesteWallet() {
  const doSearch = async () => {
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
