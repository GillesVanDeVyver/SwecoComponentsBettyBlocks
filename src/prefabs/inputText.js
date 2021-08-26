(() => ({
  name: 'Text Input',
  icon: 'TextInputIcon',
  category: 'FORM',
  structure: [
    {
      name: 'InputText',
      options: [
        {
          value: { label: ['Textfield'], value: [] },
          label: 'Label',
          key: 'customModelAttribute',
          type: 'CUSTOM_MODEL_ATTRIBUTE',
          configuration: {
            allowedTypes: ['string'],
          },
        },
        {
          type: 'TOGGLE',
          label: 'Show label',
          key: 'showLabel',
          value: true
        },
        {
          type: 'TOGGLE',
          label: 'Is part of input group',
          key: 'partOfInputGroup',
          value: false
        },
        {
          type: 'CUSTOM',
          label: 'Input Type',
          key: 'inputType',
          value: 'text',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: 'Text', value: 'text' },
              { name: 'Password', value: 'password' },
              { name: 'Number', value: 'number' },
            ],
          },
        },
        {
          type: 'CUSTOM',
          label: 'State',
          key: 'state',
          value: 'enabled',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Enabled', value: 'enabled' },
              { name: 'Disabled', value: 'disabled' }
            ]
          }
        },
        {
          type: 'TOGGLE',
          label: 'Multiline',
          key: 'multiline',
          value: false,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'inputType',
              comparator: 'EQ',
              value: 'text',
            },
          },
        },
        {
          value: [],
          label: 'Placeholder',
          key: 'placeholder',
          type: 'VARIABLE',
        },
        {
          value: [],
          label: 'Helper text',
          key: 'helperText',
          type: 'VARIABLE',
        },
        {
          type: 'TOGGLE',
          label: 'Full width',
          key: 'fullWidth',
          value: true,
        },
        {
          label: 'Size',
          key: 'size',
          value: 'm',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Large', value: 'lg' },
              { name: 'Medium', value: 'm' },
              { name: 'Small', value: 'sm' },
            ],
          },
        },
        {
          value: true,
          label: 'Validation options',
          key: 'validationOptions',
          type: 'TOGGLE',
        },
        {
          type: 'TOGGLE',
          label: 'Use premade validation pattern',
          key: 'usePremadeRegex',
          value: false,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'validationOptions',
              comparator: 'EQ',
              value: true,
            },
          }

        },
        {
          type: 'CUSTOM',
          label: 'Premade validation pattern',
          key: ' premadeRegex',
          value: '',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: 'Text', value: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' },
              { name: 'Email', value: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$' },
              { name: 'Price', value: '[0-9]+(\\.[0-9][0-9]?)?' },
            ],
            condition: {
              type: 'SHOW',
              option: 'usePremadeRegex',
              comparator: 'EQ',
              value: true,
            }
          }
        },
        {
          label: 'Validation pattern',
          key: 'pattern',
          value: '',
          type: 'TEXT',
          configuration: {
            placeholder: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
            condition: {
              type: 'SHOW',
              option: 'usePremadeRegex',
              comparator: 'EQ',
              value: false,
            },
          },
        },
        {
          label: 'Min length',
          key: 'minlength',
          value: '',
          type: 'NUMBER',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'validationOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          label: 'Max length',
          key: 'maxlength',
          value: '',
          type: 'NUMBER',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'validationOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: ['This field is required'],
          label: 'Value required message',
          key: 'validationValueMissing',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'validationOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: ['Invalid value'],
          label: 'Pattern mismatch message',
          key: 'validationPatternMismatch',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'validationOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: ['This value is too short'],
          label: 'Value too short message',
          key: 'validationTooShort',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'validationOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: ['This value is too long'],
          label: 'Value too long message',
          key: 'validationTooLong',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'validationOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'name attribute',
          key: 'nameAttribute',
          value: [],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
