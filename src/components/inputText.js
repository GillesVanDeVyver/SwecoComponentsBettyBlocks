(() => ({
  name: 'InputText',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      disabled,
      error,
      multiline,
      state,
      rows,
      showLabel,
      placeholder,
      inputType,
      size,
      premadeRegex,
      usePremadeRegex,
      fullWidth,
      partOfInputGroup,
      helperText,
      pattern,
      minlength,
      maxlength,
      validationTypeMismatch,
      validationPatternMismatch,
      validationValueMissing,
      validationTooLong,
      validationTooShort,
      hideLabel,
      customModelAttribute: customModelAttributeObj,
      nameAttribute,
    } = options;

    //const { Typeahead } = window.SwecoBettyBlocks.Typeahead;
    const { useText, env, getCustomModelAttribute } = B;
    const isDev = env === 'dev';
    const isNumberType = inputType === 'number';
    const [isDisabled, setIsDisabled] = useState(disabled);
    const [errorState, setErrorState] = useState(error);
    const [afterFirstInvalidation, setAfterFirstInvalidation] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));
    const {
      id: customModelAttributeId,
      label = [],
      value: defaultValue = [],
    } = customModelAttributeObj;
    const [currentValue, setCurrentValue] = useState(useText(defaultValue));
    const labelText = useText(label);
    const customModelAttribute = getCustomModelAttribute(
      customModelAttributeId,
    );

    const { name: customModelAttributeName, validations: { required } = {} } =
      customModelAttribute || {};
    const nameAttributeValue = useText(nameAttribute);

    const validPattern = usePremadeRegex ? premadeRegex : pattern || null;
    const validMinlength = minlength || null;
    const validMaxlength = maxlength || null;


    const validationMessage = validityObject => {
      if (validityObject.valid) {
        return '';
      }
      if (validityObject.typeMismatch && validationTypeMismatch) {
        return useText(validationTypeMismatch);
      }
      if (validityObject.patternMismatch && validationPatternMismatch) {
        return useText(validationPatternMismatch);
      }
      if (validityObject.valueMissing && validationValueMissing) {
        return useText(validationValueMissing);
      }
      if (validityObject.tooLong && validationTooLong) {
        return useText(validationTooLong);
      }
      if (validityObject.tooShort && validationTooShort) {
        return useText(validationTooShort);
      }
      return '';
    };

    const handleValidation = validation => {
      setErrorState(!validation.valid);
      const message = validationMessage(validation) || useText(helperText);
      setHelper(message);
    };

    const onKeyDown = event => {
      if (isNumberType && (event.key === '.' || event.key === ',')) {
        event.preventDefault();
      }
    };

    const changeHandler = event => {
      const {
        target: { value: eventValue, validity },
      } = event;

      let numberValue;
      if (isNumberType) {
        numberValue = parseInt(eventValue, 10);
      }

      if (afterFirstInvalidation) {
        handleValidation(validity);
      }
      setCurrentValue(isNumberType ? numberValue : eventValue);
    };

    B.defineFunction('Clear', () => setCurrentValue(''));
    B.defineFunction('Disable', () => setIsDisabled(true));

    const inputSize = `form-control-${size}`;
    const inputProperties = {
      type: inputType,
      id: labelText,
      className: ['form-control', inputSize].join(' '),
    };

    const stateAttribute = { [state]: state };
    const Tag = multiline ? "textarea" : "input";


    const inputElement = (
      <Tag
        {...stateAttribute}
        {...inputProperties}
        name={nameAttributeValue || customModelAttributeName}
        placeholder={useText(placeholder)}
        value={currentValue}
        onKeyDown={onKeyDown}
        onChange={changeHandler}
      />
    )

    // no wrapping when part of input group
    if (partOfInputGroup) {
      return inputElement;
    } else {
      return (
        <div className="row form-group">
          {showLabel && <label htmlFor={nameAttributeValue || customModelAttributeName} className="col-lg-4 col-form-label">{labelText}</label>}
          <div className="col-lg-8">
            {inputElement}
          </div>
        </div>
      )
    }
  })(),
  styles: () => {
    return {
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
      },
      pristine: {
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
      },
    };
  },
}))();

/**
 * different regexes for different types:
 *
 * Email: [a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$
 * Price: [0-9]+(\\.[0-9][0-9]?)?
 * Number: [0-9]{8,}
 */