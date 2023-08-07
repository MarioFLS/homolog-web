function addZero(n) {
  if (n <= 9) { return `0${n}`; }
  return n;
}
const formatDate = (date) => {
  const dateToFormat = new Date(date); // 02/10/2020
  const formattedDate = (`${addZero(dateToFormat.getDate().toString())}/${addZero(dateToFormat.getMonth() + 1).toString()}/${dateToFormat.getFullYear()}`);
  return formattedDate;
};

export function reverseDate(data) {
  // Dividindo a data em dia, mês e ano
  const [dia, mes, ano] = data.split('/');

  // Criando a nova string da data no formato "MM/dd/aaaa"
  const novaData = `${mes}/${dia}/${ano}`;

  return novaData;
}

export default formatDate;
