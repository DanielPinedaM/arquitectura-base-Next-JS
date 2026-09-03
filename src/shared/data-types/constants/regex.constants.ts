const CONST_REGEX = {
  number: {
    // valida numeros enteros, negativos y decimales con coma y punto
    integerOrDecimal: /^(-?\d{0,}(\,|\.)?){0,}$/,

    // solamente admite numero entero NO negativo
    positiveInteger: /^[0-9]+$/,
  },
  text: {
    // admite mayuscula, minuscula, tilde, Ñ, ñ
    any: /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/,

    // contraseña segura, minimo un caracter y debe contener un caracter especial, un numero, una mayuscula y una minuscula
    strongPassword:
      /^(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])(?=.*[0-9])(?=.*[A-ZÁÉÍÓÚÜÑ])(?=.*[a-záéíóúüñ]).+$/,
  },
};

export default CONST_REGEX;
