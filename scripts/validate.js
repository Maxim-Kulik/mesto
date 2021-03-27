const hasInvalidInput = (inputList)=> {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  if(hasInvalidInput(inputList)){
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
  }else{
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
  };

  const showInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
   
  inputElement.classList.add(inputErrorClass);
  
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
  };

  const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
   
  inputElement.classList.remove(inputErrorClass);

  errorElement.classList.remove(errorClass);
  };
 
  const checkInput = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    if(inputElement.validity.valid){
      hideInputError(formElement, inputElement, {inputErrorClass, errorClass} );
    } else{
      showInputError(formElement, inputElement, {inputErrorClass, errorClass} );
    }
  };

  const setInputListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {

    checkInput(formElement, inputElement, rest);
    toggleButtonState(inputList, buttonElement, rest);
      })
    });
  };
  
  const enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    
    formList.forEach(formElement => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setInputListeners(formElement, rest);
    }
      );
  };

  enableValidation({
    formSelector: '.form__profile',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_invalid',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
  });

  

  