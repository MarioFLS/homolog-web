function validaCPF(cpf) {
  let Soma = 0;
  let Resto;

  const strCPF = String(cpf).replace(/[^\d]/g, '');

  if (strCPF.length !== 11) { return false; }

  if ([
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ].indexOf(strCPF) !== -1) { return false; }

  for (let i = 1; i <= 9; i++) Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);

  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) { Resto = 0; }

  if (Resto != parseInt(strCPF.substring(9, 10))) { return false; }

  Soma = 0;

  for (let i = 1; i <= 10; i++) { Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i); }

  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) { Resto = 0; }

  if (Resto != parseInt(strCPF.substring(10, 11))) { return false; }

  return true;
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj == '') return false;

  if (cnpj.length != 14) { return false; }

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == '00000000000000'
    || cnpj == '11111111111111'
    || cnpj == '22222222222222'
    || cnpj == '33333333333333'
    || cnpj == '44444444444444'
    || cnpj == '55555555555555'
    || cnpj == '66666666666666'
    || cnpj == '77777777777777'
    || cnpj == '88888888888888'
    || cnpj == '99999999999999') { return false; }

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) { pos = 9; }
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0)) { return false; }

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) { pos = 9; }
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1)) { return false; }

  return true;
}

export { validaCPF, validarCNPJ }
