(() => ({
  name: 'Typeahead',
  icon: 'AutoCompleteIcon',
  category: 'FORM',
  structure: [
    {
      name: 'Typeahead',
      options: [
        {
          value: { label: ['Autocomplete'], value: [] },
          label: 'Label',
          key: 'customModelAttribute',
          type: 'CUSTOM_MODEL_ATTRIBUTE',
          configuration: {
            allowedTypes: ['string'],
          },
        },
        {
          label: 'Option type',
          key: 'optionType',
          value: 'model',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Model', value: 'model' },
              { name: 'Property', value: 'property' },
            ],
          },
        },
        {
          value: '',
          label: 'Property',
          key: 'property',
          type: 'PROPERTY',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'optionType',
              comparator: 'EQ',
              value: 'property',
            },
          },
        },
        {
          value: '',
          label: 'Model',
          key: 'model',
          type: 'MODEL',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'optionType',
              comparator: 'EQ',
              value: 'model',
            },
          },
        },
        {
          value: {},
          label: 'Filter',
          key: 'filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'model',
            condition: {
              type: 'SHOW',
              option: 'optionType',
              comparator: 'EQ',
              value: 'model',
            },
          },
        },
        {
          type: 'PROPERTY',
          label: 'Order by',
          key: 'orderBy',
          value: '',
          configuration: {
            dependsOn: 'model',
            apiVersion: 'v1',
            condition: {
              type: 'SHOW',
              option: 'optionType',
              comparator: 'EQ',
              value: 'model',
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Sort order',
          key: 'order',
          value: 'asc',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            condition: {
              type: 'HIDE',
              option: 'orderBy',
              comparator: 'EQ',
              value: '',
            },
            allowedInput: [
              { name: 'Ascending', value: 'asc' },
              { name: 'Descending', value: 'desc' },
            ],
          },
        },
        {
          value: '',
          label: 'Label property',
          key: 'searchProperty',
          type: 'PROPERTY',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'optionType',
              comparator: 'EQ',
              value: 'model',
            },
          },
        },
        {
          value: '',
          label: 'Value property',
          key: 'valueProperty',
          type: 'PROPERTY',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'optionType',
              comparator: 'EQ',
              value: 'model',
            },
          },
        },
        {
          type: 'TOGGLE',
          label: 'Allow multiple values',
          key: 'multiple',
          value: false,
        },
        {
          type: 'TOGGLE',
          label: 'Add checkboxes',
          key: 'renderCheckboxes',
          value: false,
        },
        {
          type: 'TOGGLE',
          label: 'Close dropdown after select',
          key: 'closeOnSelect',
          value: true,
        },
        {
          type: 'TOGGLE',
          label: 'Free solo',
          key: 'freeSolo',
          value: false,
        },
        {
          value: false,
          label: 'Error',
          key: 'error',
          type: 'TOGGLE',
        },
        {
          value: 'built-in',
          label: 'Error message',
          key: 'showError',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Built in', value: 'built-in' },
              { name: 'Interaction', value: 'interaction' },
            ],
          },
        },
        {
          type: 'TOGGLE',
          label: 'Disabled',
          key: 'disabled',
          value: false,
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
          label: 'Variant',
          key: 'variant',
          value: 'outlined',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Standard', value: 'standard' },
              { name: 'Outlined', value: 'outlined' },
              { name: 'Filled', value: 'filled' },
            ],
          },
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
          value: 'medium',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Medium', value: 'medium' },
              { name: 'Small', value: 'small' },
            ],
          },
        },
        {
          label: 'Margin',
          key: 'margin',
          value: 'normal',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'None', value: 'none' },
              { name: 'Dense', value: 'dense' },
              { name: 'Normal', value: 'normal' },
            ],
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