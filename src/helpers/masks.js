// NIF = Número de Identificação Fiscal
export const maskNIF = (NIF) => {
  NIF = NIF?.replace(/\D/g, "")

  if (NIF?.length <= 11) {
    NIF = NIF?.replace(/(\d{3})(\d)/, "$1.$2")
    NIF = NIF?.replace(/(\d{3})(\d)/, "$1.$2")
    NIF = NIF?.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  } else {
    NIF = NIF?.replace(/^(\d{2})(\d)/, "$1.$2")
    NIF = NIF?.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    NIF = NIF?.replace(/\.(\d{3})(\d)/, ".$1/$2")
    NIF = NIF?.replace(/(\d{4})(\d)/, "$1-$2")
  }
  return NIF
}