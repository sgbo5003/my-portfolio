import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <link rel="stylesheet" id="layout-styles-anchor" href="/assets/styles/splash-screen.css" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <body id="app_body" className="app-default">
          <Main />
          <NextScript />
          <div id="splash-screen" className="splash-screen">
            <img src="/assets/images/spinner/Spinner-250px.gif" alt="logo" />
            <span>Loading ...</span>
          </div>
          <div id="modal_root"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
