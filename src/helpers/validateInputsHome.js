import { validaCPF, validarCNPJ } from './validateCPFAndCNPJ';

export const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const validateInputs = (inputs, setInputErro) => {
  const {
    telephone, password, cpf, name, company, email
  } = inputs;

  // eslint-disable-next-line prefer-regex-literals
  const regexPhone = /^\+?[0-9\s-()]{8,}$/;
  if (!name.trim()) {
    setInputErro((prev) => ({ ...prev, name: true }));
    return false;
  }
  if (name.trim() !== '') {
    setInputErro((prev) => ({ ...prev, name: false }));
  }

  if (!regexEmail.test(email)) {
    setInputErro((prev) => ({ ...prev, email: true }));
    return false;
  }
  if (regexEmail.test(email)) {
    setInputErro((prev) => ({ ...prev, email: false }));
  }
  if (!password.trim()) {
    setInputErro((prev) => ({ ...prev, password: true }));
    return false;
  }
  if (password.trim()) {
    setInputErro((prev) => ({ ...prev, password: false }));
  }
  if (!company.trim()) {
    setInputErro((prev) => ({ ...prev, company: true }));
    return false;
  }
  if (company.trim()) {
    setInputErro((prev) => ({ ...prev, company: false }));
  }

  if (!regexPhone.test(telephone)) {
    setInputErro((prev) => ({ ...prev, telephone: true }));
    return false;
  }
  if (regexPhone.test(telephone)) {
    setInputErro((prev) => ({ ...prev, telephone: false }));
  }
  if (!validaCPF(cpf) && !validarCNPJ(cpf)) {
    setInputErro((prev) => ({ ...prev, cpf: true }));
    return false;
  }
  if (validaCPF(cpf) && validarCNPJ(cpf)) {
    setInputErro((prev) => ({ ...prev, cpf: false }));
  }
  return true;
};

export default validateInputs;
