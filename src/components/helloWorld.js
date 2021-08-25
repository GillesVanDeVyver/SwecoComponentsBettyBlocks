(() => ({ 
  name: 'customStyleSheet',
  icon: 'HtmlIcon',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const isDev = B.env === 'dev';
    const head = document.getElementsByTagName('head')[0];
    const link1 = document.createElement('link');
    link1.type = 'text/css'; link1.rel = 'stylesheet';
    link1.href = 'https://cdn.swecogroup.com/sweco-digital-platforms/5.0.41/fonts/fonts.css'; head.appendChild(link1);
    const link2 = document.createElement('link');
    link2.type = 'text/css'; link2.rel = 'stylesheet';
    link2.href = 'https://cdn.swecogroup.com/sweco-digital-platforms/5.0.41/icons/css/all.css'; head.appendChild(link2);
    const link3 = document.createElement('link');
    link3.type = 'text/css'; link3.rel = 'stylesheet';
    link3.href = 'https://cdn.swecogroup.com/sweco-digital-platforms/5.0.41/css/sweco-bootstrap.css'; head.appendChild(link3);
    return ( <div>
                <button> test_btn</button>
                </div> );
    })(),
    styles: () => () => ({ 
      root: { borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '2rem',
      width: '100%',
      fontSize: '0.75rem', color: '#262A3A',
      textTransform: 'uppercase',
      boxSizing: 'border-box', 
      textAlign: 'center',
     }, }),}))();

