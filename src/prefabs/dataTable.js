(() => ({
  name: 'DataTable',
  icon: 'DataTable',
  category: 'DATA',
  beforeCreate: ({
    components: {
      Content,
      Header,
      Field,
      Footer,
      ModelSelector,
      PropertiesSelector,
    },
    prefab,
    save,
    close,
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [properties, setProperties] = React.useState([]);

    return (
      <>
        <Header title="Configure data table" onClose={close} />
        <Content>
          <Field label="Model">
            <ModelSelector
              onChange={value => {
                setModelId(value);
              }}
              value={modelId}
            />
          </Field>
          <Field label="Columns">
            <PropertiesSelector
              modelId={modelId}
              value={properties}
              onChange={value => {
                setProperties(value);
              }}
            />
          </Field>
        </Content>
        <Footer
          onSave={() => {
            const newPrefab = { ...prefab };

            newPrefab.structure[0].options[0].value = modelId;
            properties.forEach(property => {
              newPrefab.structure[0].descendants.push({
                name: 'DataTableColumn',
                options: [
                  {
                    value: property,
                    label: 'Property',
                    key: 'property',
                    type: 'PROPERTY',
                  },
                  {
                    type: 'TOGGLE',
                    label: 'Sortable',
                    key: 'sortable',
                    value: false,
                  },
                  {
                    type: 'VARIABLE',
                    label: 'Header text',
                    key: 'headerText',
                    value: [''],
                  },
                  {
                    value: 'Body1',
                    label: 'Header Type',
                    key: 'type',
                    type: 'FONT',
                  },
                  {
                    type: 'VARIABLE',
                    label: 'Content',
                    key: 'content',
                    value: [''],
                    configuration: {
                      as: 'MULTILINE',
                    },
                  },
                  {
                    value: 'Body1',
                    label: 'Body type',
                    key: 'bodyType',
                    type: 'FONT',
                  },
                  {
                    type: 'CUSTOM',
                    label: 'Column Alignment',
                    key: 'horizontalAlignment',
                    value: 'left',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'Left', value: 'left' },
                        { name: 'Center', value: 'center' },
                        { name: 'Right', value: 'right' },
                      ],
                    },
                  },
                  {
                    type: 'SIZE',
                    label: 'Width',
                    key: 'width',
                    value: '',
                    configuration: {
                      as: 'UNIT',
                    },
                  },
                  {
                    type: 'COLOR',
                    label: 'Background',
                    key: 'background',
                    value: 'Transparent',
                  },
                  {
                    type: 'COLOR',
                    label: 'Border color',
                    key: 'borderColor',
                    value: 'Light',
                  },
                ],
                descendants: [],
              });
            });

            save(newPrefab);
          }}
          onClose={close}
        />
      </>
    );
  },
  structure: [
    {
      name: 'DataTable',
      options: [
        {
          value: '',
          label: 'Model',
          key: 'model',
          type: 'MODEL',
        },
        {
          value: {},
          label: 'Filter',
          key: 'filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: '',
          label: 'Order by',
          key: 'orderProperty',
          type: 'PROPERTY',
          configuration: {
            dependsOn: 'model',
            apiVersion: 'v1',
          },
        },
        {
          value: 'asc',
          label: 'Sort order',
          key: 'sortOrder',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Ascending', value: 'asc' },
              { name: 'Descending', value: 'desc' },
            ],
            condition: {
              type: 'HIDE',
              option: 'orderProperty',
              comparator: 'EQ',
              value: '',
            },
          },
        },
        {
          value: '',
          label: 'Search on property',
          key: 'searchProperty',
          type: 'PROPERTY',
          configuration: {
            dependsOn: 'model',
            apiVersion: 'v1',
          },
        },
        {
          value: '',
          label: 'Hide built-in search field',
          key: 'hideSearch',
          type: 'TOGGLE',
        },
        {
          value: '',
          label: 'Authentication Profile',
          key: 'authProfile',
          type: 'AUTHENTICATION_PROFILE',
        },
        {
          type: 'VARIABLE',
          label: 'Title',
          key: 'title',
          value: [''],
        },
        {
          type: 'CUSTOM',
          label: 'Title Type',
          key: 'titleType',
          value: 'h3',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: 'Header 1', value: 'h1' },
              { name: 'Header 2', value: 'h2' },
              { name: 'Header 3', value: 'h3' },
              { name: 'Header 4', value: 'h4' },
              { name: 'Header 5', value: 'h5' },
              { name: 'Header 6', value: 'h6' },
            ],
          },
        },
        {
          label: 'Pagination',
          key: 'pagination',
          value: 'always',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Always', value: 'always' },
              { name: 'When needed', value: 'whenNeeded' },
              { name: 'Never', value: 'never' },
            ],
          },
        },
        {
          value: false,
          label: 'Auto load on scroll',
          key: 'autoLoadOnScroll',
          type: 'TOGGLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'pagination',
              comparator: 'EQ',
              value: 'never',
            },
          },
        },
        {
          value: '50',
          label: 'Number of records to auto load',
          key: 'autoLoadTakeAmount',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: '5', value: '5' },
              { name: '10', value: '10' },
              { name: '25', value: '25' },
              { name: '50', value: '50' },
              { name: '100', value: '100' },
            ],
            condition: {
              type: 'SHOW',
              option: 'autoLoadOnScroll',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: '5',
          label: 'Rows per page',
          key: 'take',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: '5', value: '5' },
              { name: '10', value: '10' },
              { name: '25', value: '25' },
              { name: '50', value: '50' },
              { name: '100', value: '100' },
            ],
            condition: {
              type: 'HIDE',
              option: 'autoLoadOnScroll',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Rows per page text',
          key: 'labelRowsPerPage',
          value: ['Rows per page'],
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'pagination',
              comparator: 'EQ',
              value: 'never',
            },
          },
        },
        {
          type: 'SIZE',
          label: 'Height',
          key: 'height',
          value: '',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          type: 'TOGGLE',
          label: 'Sticky header',
          key: 'stickyHeader',
          value: false,
        },
        {
          value: 'medium',
          label: 'Size',
          key: 'size',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Small', value: 'small' },
              { name: 'Medium', value: 'medium' },
            ],
          },
        },
        {
          label: 'Square',
          key: 'square',
          value: false,
          type: 'TOGGLE',
        },
        {
          label: 'Variant',
          key: 'variant',
          value: 'elevation',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Flat', value: 'flat' },
              { name: 'Elevation', value: 'elevation' },
              { name: 'Outlined', value: 'outlined' },
            ],
          },
        },
        {
          value: '',
          label: 'Row click',
          key: 'linkTo',
          type: 'ENDPOINT',
        },
        {
          type: 'COLOR',
          label: 'Row hover color',
          key: 'backgroundRowHover',
          value: 'Transparent',
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'linkTo',
              comparator: 'EQ',
              value: '',
            },
          },
        },
        {
          value: ['0rem', '0rem', 'M', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
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
      ],
      descendants: [],
    },
  ],
}))();
