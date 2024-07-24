import React from "react";
import {
  Text,
  Page,
  Document,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
import logo from "../../Images/ZMCLogo-2.png";

const MRRegPDF = ({ mrData }) => {
  const MyPage = ({ children }) => (
    <Page size={[252, 144]} style={styles.page}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Text>Your Company Logo</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </Page>
  );

  return (
    <Document>
      <MyPage>
        <View style={styles.headC1}>
          <Text>Patient Detail</Text>
        </View>

        <View style={styles.head}>
          <Text style={{ fontSize: "9" }}>
            Patient Name: {mrData[0]?.patientType} {mrData[0]?.patientName}{" "}
            {mrData[0]?.relativeType} {mrData[0]?.relativeName}
          </Text>
          <Text style={{ fontSize: "9" }}>MR No: {mrData[0]?.MrNo}</Text>
          <Text style={{ fontSize: "9" }}>Gender: {mrData[0]?.gender}</Text>
          <Text style={{ fontSize: "9" }}>
            Age: {mrData[0]?.ageYear ? mrData[0]?.ageYear : "0"} Years{" "}
            {mrData[0]?.ageMonth ? mrData[0]?.ageMonth : "0"} Months{" "}
            {mrData[0]?.ageDay ? mrData[0]?.ageDay : "0"} Days
          </Text>
          <Text style={{ fontSize: "9" }}>Cell No: {mrData[0]?.cellNo}</Text>
        </View>
      </MyPage>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  Image: {
    height: 20,
    marginTop: 3,
    width: 200, // Adjust the width to fit the card size
  },

  head: {
    border: "1px solid black",
    padding: 2,
    display: "flex",
    paddingVertical: 4,
  },
  headC1: {
    border: "1px solid black",
    color: "white",
    backgroundColor: "#454545",
    textAlign: "center",
    padding: 2,
    marginTop: 4,
  },
});

export default MRRegPDF;
