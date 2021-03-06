(() => ({
  name: 'DataTable',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['DATATABLE_COLUMN'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      Children,
      env,
      getProperty,
      GetMe,
      useText,
      ModelProvider,
      useEndpoint,
      useAllQuery,
      useFilter,
    } = B;
    const { Search } = window.SwecoBettyBlocks.Icons;
    const isDev = env === 'dev';
    const {
      take,
      size,
      model,
      authProfile,
      filter,
      searchProperty,
      hideSearch,
      orderProperty,
      sortOrder,
      labelRowsPerPage,
      square,
      variant,
      stickyHeader,
      title,
      titleType,
      pagination,
      linkTo,
      showError,
      autoLoadOnScroll,
      autoLoadTakeAmount,
    } = options;
    const repeaterRef = React.createRef();
    const tableRef = React.createRef();
    const tableContainerRef = React.createRef();
    const displayError = showError === 'built-in';
    const [page, setPage] = useState(0);
    const takeNum = parseInt(take, 10);
    const initialRender = useRef(true);
    const [skip, setSkip] = useState(0);
    const loadOnScroll = pagination === 'never' && autoLoadOnScroll;
    const autoLoadTakeAmountNum = parseInt(autoLoadTakeAmount, 10);
    const [rowsPerPage, setRowsPerPage] = useState(takeNum);
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showPagination, setShowPagination] = useState(false);
    const searchPropertyArray = [searchProperty].flat();
    const { label: searchPropertyLabel = '{property}' } =
      getProperty(searchProperty) || {};
    const [orderBy, setOrderBy] = React.useState({
      field: [orderProperty].flat() || null,
      order: orderProperty ? sortOrder : null,
    });
    const [results, setResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [previousSearchTerm, setPreviousSearchTerm] = useState('');
    const [newSearch, setNewSearch] = useState(false);
    const fetchingNextSet = useRef(false);
    const [initialTimesFetched, setInitialTimesFetched] = useState(0);
    const amountOfRows = loadOnScroll ? autoLoadTakeAmountNum : rowsPerPage;

    const createSortObject = (fields, order) => {
      const fieldsArray = [fields].flat();
      const sort = fieldsArray.reduceRight((acc, property, index) => {
        const prop = getProperty(property);
        return index === fieldsArray.length - 1
          ? { [prop.name]: order.toUpperCase() }
          : { [prop.name]: acc };
      }, {});

      return sort;
    };
    const [variables, setVariables] = useState(
      orderProperty
        ? {
          sort: {
            relation: !isDev && createSortObject(orderProperty, sortOrder),
          },
        }
        : {},
    );

    const titleText = useText(title);
    const hasToolbar = titleText || (searchProperty && !hideSearch);
    const hasLink = linkTo && linkTo.id !== '';
    const toolbarRef = React.createRef();
    const paginationRef = React.createRef();
    const [stylesProps, setStylesProps] = useState(null);

    const deepMerge = (...objects) => {
      const isObject = item =>
        item && typeof item === 'object' && !Array.isArray(item);

      return objects.reduce((accumulator, object) => {
        Object.keys(object).forEach(key => {
          const accumulatorValue = accumulator[key];
          const value = object[key];

          if (Array.isArray(accumulatorValue) && Array.isArray(value)) {
            accumulator[key] = accumulatorValue.concat(value);
          } else if (isObject(accumulatorValue) && isObject(value)) {
            accumulator[key] = deepMerge(accumulatorValue, value);
          } else {
            accumulator[key] = value;
          }
        });
        return accumulator;
      }, {});
    };

    const searchFilter = searchProperty
      ? searchPropertyArray.reduceRight(
        (acc, property, index) =>
          index === searchPropertyArray.length - 1
            ? { [property]: { matches: searchTerm } }
            : { [property]: acc },
        {},
      )
      : {};

    const newFilter =
      searchProperty && searchTerm !== ''
        ? deepMerge(filter, searchFilter)
        : filter;
    const where = useFilter(newFilter);

    const { loading, error, data, refetch } =
      model &&
      useAllQuery(model, {
        rawFilter: where,
        variables,
        skip: loadOnScroll ? skip : page * rowsPerPage,
        take: loadOnScroll ? autoLoadTakeAmountNum : rowsPerPage,
      });

    useEffect(() => {
      if (!isDev && data) {
        if (pagination !== 'never') {
          setResults(data.results);
          setTotalCount(data.totalCount);
          return;
        }
        if (searchTerm !== previousSearchTerm) {
          setSkip(0);
          setPreviousSearchTerm(searchTerm);
          setNewSearch(true);
        } else {
          if (newSearch) {
            setResults(data.results);
          } else {
            setResults(prev => [...prev, ...data.results]);
          }
          fetchingNextSet.current = false;
          setNewSearch(false);
        }
        setTotalCount(data.totalCount);
      }
    }, [data, searchTerm]);

    useEffect(() => {
      const handler = setTimeout(() => {
        setSearchTerm(search);
      }, 300);

      return () => {
        clearTimeout(handler);
      };
    }, [search]);

    B.defineFunction('Refetch', () => refetch());
    B.defineFunction('SetSearchValue', event => {
      setSearch(event.target.value);
    });

    useEffect(() => {
      if (!isDev) return;
      const repeat = () => {
        if (!repeaterRef.current) return;
        if (repeaterRef.current.previousElementSibling.children.length === 0) {
          return;
        }
        repeaterRef.current.innerHTML = '';
        for (let i = 0, j = amountOfRows - 1; i < j; i += 1) {
          repeaterRef.current.innerHTML +=
            repeaterRef.current.previousElementSibling.children[0].outerHTML;
        }
      };
      const mutationObserver = new MutationObserver(() => {
        repeat();
      });
      mutationObserver.observe(tableRef.current, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false,
      });
      repeat();
    });

    useEffect(() => {
      setRowsPerPage(takeNum);
    }, [takeNum]);

    const mounted = useRef(false);

    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    useEffect(() => {
      if (mounted.current && loading) {
        B.triggerEvent('onLoad', loading);
      }
    }, [loading]);

    if (error && !displayError) {
      B.triggerEvent('onError', error.message);
    }

    if (results.length > 0) {
      B.triggerEvent('onSuccess', results);
    } else {
      B.triggerEvent('onNoResults');
    }

    const handleChangePage = (_, newPage) => {
      if (loading || error) return;
      setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
      if (loading || error) return;
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleSort = (field, newOrder) => {
      if (isDev) return;
      setOrderBy({ field, order: newOrder });
      setVariables({
        sort: {
          relation: createSortObject(field, newOrder),
        },
      });
    };

    const isFlatValue = value =>
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean';

    const history = isDev ? {} : useHistory();

    const handleRowClick = rowValue => {
      if (isDev) return;
      B.triggerEvent('OnRowClick', rowValue);
      if (hasLink) {
        const { id, params } = linkTo;
        const newParams = Object.entries(params).reduce((acc, cv) => {
          const key = cv[0];
          const value = cv[1];
          if (isFlatValue(value[0])) {
            acc[key] = value;
          } else {
            const propId = value[0].id;
            const property = getProperty(propId).name;
            acc[key] = [rowValue[property].toString()];
          }
          return acc;
        }, {});

        const endpointParams = {
          id,
          params: newParams,
        };
        history.push(useEndpoint(endpointParams));
      }
    };

    const renderTableHead = () => {
      if ((loading && !loadOnScroll) || error) {
        return Array.from(Array(children.length).keys()).map(colIdx => (
          <th key={colIdx}>
            <div className={classes.skeleton}>
              {error && displayError && error.message}
            </div>
          </th>
        ));
      }
      return (
        <Children headerOnly handleSort={handleSort} orderBy={orderBy}>
          {children}
        </Children>
      );
    };

    const tableContentModel = () => {
      if ((loading && !loadOnScroll) || error) {
        return Array.from(Array(rowsPerPage).keys()).map(idx => (
          <tr key={idx}>
            {Array.from(Array(children.length).keys()).map(colIdx => (
              <td key={colIdx}>
                <div className={classes.skeleton} />
              </td>
            ))}
          </tr>
        ));
      }

      const rows = results.map(value => (
        <ModelProvider value={value} id={model}>
          <tr
            key={value[0]}
            onClick={() => handleRowClick(value)}
            data-id={value.id}
          >
            <B.InteractionScope>{children}</B.InteractionScope>
          </tr>
        </ModelProvider>
      ));

      if (authProfile) {
        return <GetMe authenticationProfileId={authProfile}>{rows}</GetMe>;
      }

      return rows;
    };

    const renderTableContent = () => {
      let tableContent = Array.from(Array(amountOfRows).keys()).map(idx => (
        <tr key={idx}>
          <B.InteractionScope>{children}</B.InteractionScope>
        </tr>
      ));
      if (isDev) {
        tableContent = (
          <tr>{children}</tr>
        );
      } else if (model) {
        tableContent = tableContentModel();
      }
      return tableContent;
    };

    const TitleTag = titleType; // we HAVE to assign the string to a constant so it can be used as a tag.

    return (
      <div>
        {titleText && <TitleTag>{titleText}</TitleTag>}
        <table className="table table-responsive">
          <thead>
            <tr>
              {renderTableHead()}
            </tr>
          </thead>
          <tbody ref={tableRef}>
            {renderTableContent()}
          </tbody>
        </table>
      </div>

    )

  })(),
  styles: B => theme => {
    const { env, Styling } = B;
    const style = new Styling(theme);
    const isDev = env === 'dev';
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      root: {
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        height: ({ options: { height } }) => height,
      },
      paper: {
        height: '100%',
      },
      container: {
        height: '100%',
      },
      tableRoot: {
        tableLayout: 'fixed',
      },
      toolbar: {
        paddingLeft: ['1rem', '!important'],
        paddingRight: ['1rem', '!important'],
      },
      bodyRow: {
        cursor: ({ options: { linkTo } }) =>
          linkTo && linkTo.id !== '' && 'pointer',
        '&:hover td': {
          backgroundColor: ({ options: { linkTo, backgroundRowHover } }) =>
            linkTo && [style.getColor(backgroundRowHover), '!important'],
        },
      },
      searchField: {
        marginLeft: ['auto', '!important'],
        pointerEvents: isDev && 'none',
      },
      pagination: {
        pointerEvents: isDev && 'none',
      },
      autoRepeat: {
        opacity: 0.5,
      },
      skeleton: {
        height: `calc(${style.getFont('Body1').Mobile} * 1.2)`,
        [`@media ${B.mediaMinWidth(600)}`]: {
          height: `calc(${style.getFont('Body1').Portrait} * 1.2)`,
        },
        [`@media ${B.mediaMinWidth(960)}`]: {
          height: `calc(${style.getFont('Body1').Landscape} * 1.2)`,
        },
        [`@media ${B.mediaMinWidth(1280)}`]: {
          height: `calc(${style.getFont('Body1').Desktop} * 1.2)`,
        },
        backgroundColor: '#eee',
        borderRadius: 8,
        overflow: 'hidden',
        '&::after': {
          display: 'block',
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(90deg, #eee 25%, #fff 50%, #eee 75%)',
          backgroundSize: '200% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: '150%',
          borderRadius: `calc(${style.getFont('Body2').Landscape} / 2)`,
          content: '""',
          animation: 'loading 1.5s infinite',
        },
      },
      '@keyframes loading': {
        to: {
          backgroundPositionX: '-150%',
        },
      },
      [`@media ${B.mediaMinWidth(600)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
      },
      [`@media ${B.mediaMinWidth(960)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
      },
      [`@media ${B.mediaMinWidth(1280)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
      },
    };
  },
}))();
