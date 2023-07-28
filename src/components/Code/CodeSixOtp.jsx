
import { useEffect, useRef } from "react";

/* eslint-disable react/no-array-index-key */
function CodeSixOtp({ styles, values, setValues }) {
  const inputs = Array(6).fill(null).map(() => useRef(null));
  const currentInputRef = useRef(0);

  useEffect(() => {
    inputs[0]?.current?.focus();
  }, []);

  const handleInputChange = (e, inputIndex) => {
    const { value } = e.target;
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[inputIndex] = value;
      return newValues;
    });
    if (inputIndex < 5 && value) {
      inputs[inputIndex + 1].current.focus();
      currentInputRef.current = inputIndex + 1;
    } else if (inputIndex > 0 && !value) {
      inputs[inputIndex - 1].current.focus();
      currentInputRef.current = inputIndex - 1;
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text/plain');

    const characters = pastedText.split('');

    setValues((prevValues) => {
      const newValues = [...prevValues];
      characters.forEach((character, index) => {
        if (index < 6) {
          newValues[index] = character;
        }
      });
      return newValues;
    });

    const lastFilledIndex = Math.min(characters.length, 5);
    if (inputs[lastFilledIndex]) {
      inputs[lastFilledIndex].current.focus();
      currentInputRef.current = lastFilledIndex;
    }
  };

  const handleKeyDown = (e, inputIndex) => {
    if (e.key === 'Backspace' && !values[inputIndex]) {
      if (inputIndex > 0) {
        inputs[inputIndex - 1].current.focus();
        currentInputRef.current = inputIndex - 1;
      }
    }
  };

  /*   const clickLoginConfirmCode = async () => {
    try {
      const infoUser = secureLocalStorage.getItem("user_information_session")
      const headers = {
        Authorization: `Bearer ${infoUser.accessToken}`,
        'Content-Type': 'application/json',
      };
      if (values?.join("")) {
        await axios.post(`${baseUrl}/user/associate/login`, {
          otp_code: values.join(""),
          email,
        }, { headers });
      }
      handleClose();
      setInputs({
        email: '',
        password: '',
      });
    } catch (error) {
      return Swal.fire({
        icon: 'error',
        title: error.response?.data.error,
      });
    }
  }; */

  return (
    <div className={styles.containerCode}>
      <div className={styles.containerInputs}>
        {values.map((value, index) => (
          <input
            key={index}
            ref={inputs[index]}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
          />
        ))}
      </div>
    </div>
  );
}

export default CodeSixOtp;
