const PdfDocument = ({ imageData }) => (
    <Document>
      <Page>
        <View>
          <Image src={imageData} />
        </View>
      </Page>
    </Document>
  );