import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Reusable Page Component with Page Break Functionality
const CustomPage = ({ userName, content, patientData, labData }) => {
  const pageHeightLimit = 700; // Adjust this based on your requirements
  let currentHeight = 0;

  const renderContentWithBreaks = (content) => {
    const pages = [];
    let currentPageContent = [];

    content.forEach((item, index) => {
      const itemHeight = 100; // Example height of each content block, adjust as needed

      if (currentHeight + itemHeight > pageHeightLimit) {
        // Add current page's content to pages array
        pages.push(
          <Page style={styles.page} key={`page-${pages.length}`}>
            <Header />
            <PatDetails patientData={patientData} labData={labData} />
            <View style={styles.content}>{currentPageContent}</View>
            <Footer userName={userName} />
          </Page>
        );

        // Start a new page
        currentPageContent = [<Text key={index}>{item.text}</Text>];
        currentHeight = itemHeight;
      } else {
        currentPageContent.push(<Text key={index}>{item.text}</Text>);
        currentHeight += itemHeight;
      }
    });

    // Add the last page's content
    if (currentPageContent.length > 0) {
      pages.push(
        <Page style={styles.page} key={`page-${pages.length}`}>
          <Header />
          <PatDetails patientData={patientData} labData={labData} />
          <View style={styles.content}>{currentPageContent}</View>
          <Footer userName={userName} />
        </Page>
      );
    }

    return pages;
  };

  return <Document>{renderContentWithBreaks(content)}</Document>;
};

// Header Component
const Header = () => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Text>Your Company Logo</Text>
    <Text style={styles.labReport}>LAB REPORT</Text>
  </View>
);

// Patient's Detail
const PatDetails = ({ patientData, labData }) => (
  <View style={styles.head}>
    {/* Patient Details */}
    <View style={styles.headC1}>
      <Text>Patient Detail</Text>
    </View>
    <View style={styles.headCNew}>
      <View style={styles.headC2}>
        <Text fixed style={[styles.font, { fontWeight: "bold" }, styles.wid]}>
          Patient Name: {patientData[0]?.patientType}{" "}
          {patientData[0]?.patientName} {patientData[0]?.relativeType}{" "}
          {patientData[0]?.relativeName}
        </Text>
        <Text fixed style={[styles.font, styles.ml1, styles.wid1]}>
          Gender: {patientData[0]?.gender}
        </Text>
      </View>
      <View style={styles.headC2}>
        <Text fixed style={[styles.font, styles.wid]}>
          Contact: {patientData[0]?.cellNo}
        </Text>
        <Text fixed style={[styles.font, styles.ml2, styles.wid1]}>
          Consultant: {labData[0]?.consultant}
        </Text>
      </View>
      <View style={styles.headC2}>
        <Text fixed style={[styles.font, styles.wid]}>
          Party: {labData[0]?.party}
        </Text>
        <Text fixed style={[styles.font, styles.ml3, styles.wid1]}>
          Lab No: {labData[0]?.labNo}
        </Text>
      </View>
      <View style={styles.headC2}>
        <Text fixed style={[styles.font, styles.wid]}>
          Mr No: {labData[0]?.mrNo}
        </Text>
        <Text fixed style={[styles.font, styles.ml3, styles.wid1]}>
          Slip User: {labData[0]?.createdUser}
        </Text>
      </View>
      <View style={styles.headC2}>
        <Text fixed style={[styles.font, styles.ml4, styles.wid]}>
          Address: {patientData[0]?.address}
        </Text>
        <Text fixed style={[styles.font, styles.wid1]}>
          {/* Admission Date: {admissionData[0]?.createdOn} */}
          Slip Date: {labData[0]?.createdOn}
        </Text>
      </View>
      <View style={styles.headC2}>
        <Text fixed style={[styles.font, styles.ml5, styles.wid]}>
          Age: {patientData[0]?.ageYear ? patientData[0]?.ageYear : "0"} Years{" "}
          {patientData[0]?.ageMonth ? patientData[0]?.ageMonth : "0"} Months{" "}
          {patientData[0]?.ageDay ? patientData[0]?.ageDay : "0"} Days
        </Text>
        <Text fixed style={[styles.font, styles.wid1]}>
          {/* Discharge Date: {admissionData[0]?.dischargeDate} */}
          Result Date: ''
        </Text>
      </View>

      <View style={styles.headC2}>
        <Text fixed style={[styles.font, styles.ml4, styles.wid]}>
          {/* Remarks: {admissionData[0]?.remarks} */}
          Slip Remarks: {labData[0]?.remarks}
        </Text>
        <Text fixed style={[styles.font, styles.wid1]}>
          Lab Type: {labData[0]?.labFrom}
          {/* Reffered By: `{admissionData[0]?.referedBy}` */}
        </Text>
      </View>
    </View>
  </View>
);

// Footer Component
const Footer = ({ userName }) => (
  <>
    <View style={styles.footer} />
    <View style={styles.pageNumber2}>
      <Text>_____________________</Text>
      <Text>_____________________</Text>
    </View>
    <View style={styles.pageNumber3}>
      <Text>Admitted By</Text>
      <Text>Attendant Sign</Text>
    </View>
    <View style={styles.pageNumber}>
      <Text>Printed User: {userName}</Text>
      <Text
        style={{ textDecoration: "underline" }}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
    </View>
  </>
);

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  Image: {
    height: "50",
    marginTop: "3",
    width: "300",
  },
  pageNumber: {
    left: 0,
    right: 0,
    bottom: 10,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    fontSize: "10",
  },
  pageNumber2: {
    left: 0,
    right: 0,
    bottom: 80,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    fontSize: "10",
  },
  pageNumber3: {
    left: 0,
    right: 0,
    bottom: 60,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    fontSize: "10",
  },
  footer: {
    left: 8,
    right: 0,
    bottom: 30,
    position: "absolute",
    width: "100%",
    height: "2",
    backgroundColor: "black",
  },
  head: {
    border: "1px solid black",
    marginTop: "2",
    padding: "2",
  },
  headC1: {
    border: "1px solid black",
    color: "white",
    backgroundColor: "#454545",
    textAlign: "center",
    padding: "2",
    marginTop: "1",
  },
  headC2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "3",
    marginTop: "3",
    textAlign: "left",
  },
  headCNew: {
    marginVertical: "2",
  },
  font: {
    fontSize: 10,
  },

  depHead: {
    border: "1px solid black",
    padding: "2",
    textAlign: "center",
    marginTop: "5",
    color: "white",
    backgroundColor: "#454545",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#454545",
    color: "white",
    marginTop: "5",
    padding: "4",
    fontSize: "12",
    alignItems: "center",
  },
  test: {
    width: "30%",
    textAlign: "center",
  },
  test2: {
    width: "10%",
    textAlign: "center",
  },
  testHeading: {
    fontSize: "15",
    textDecoration: "underline",
    fontWeight: "bold",
    marginVertical: "4",
    paddingLeft: "3",
  },
  tableData: {
    display: "flex",
    flexDirection: "row",
    marginTop: "5",
    padding: "4",
    fontSize: "12",
    alignItems: "center",
  },
  wid: {
    width: "60%",
  },
  wid1: {
    width: "40%",
  },
});
export default CustomPage;
