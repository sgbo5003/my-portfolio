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
        <body id="app_body" className="app-default">
          <Main />
          <NextScript />
          <div id="modal_root"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
