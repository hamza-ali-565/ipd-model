import React from "react";
import { Text, Page, Document, StyleSheet, View } from "@react-pdf/renderer";

const RadiologyBookingPDF = ({ radioDetails }) => {
  console.log("booking response", radioDetails);
  const MyPage = ({ children }) => (
    <Page size={[288, "auto"]} style={styles.page}>
      <View style={styles.logoContainer}>
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
          <Text style={styles.text}>
            Patient Name: {radioDetails?.data2[0]?.patientType}{" "}
            {radioDetails?.data2[0]?.patientName}{" "}
            {radioDetails?.data2[0]?.relativeType}{" "}
            {radioDetails?.data2[0]?.relativeName}
          </Text>
          <Text style={styles.text}>
            Gender: {radioDetails?.data2[0]?.gender}
          </Text>
          <Text style={styles.text}>
            Age:{" "}
            {radioDetails?.data2[0]?.ageYear
              ? radioDetails?.data2[0]?.ageYear
              : "0"}{" "}
            Years{" "}
            {radioDetails?.data2[0]?.ageMonth
              ? radioDetails?.data2[0]?.ageMonth
              : "0"}{" "}
            Months{" "}
            {radioDetails?.data2[0]?.ageDay
              ? radioDetails?.data2[0]?.ageDay
              : "0"}{" "}
            Days
          </Text>
          <Text style={styles.text}>
            Cell No: {radioDetails?.data2[0]?.cellNo}
          </Text>
          <Text style={styles.text}>MR No: {radioDetails?.data2[0]?.MrNo}</Text>
          <Text style={styles.text}>
            Radiology No: {radioDetails?.data1[0]?.againstNo}
          </Text>
          <Text style={styles.text}>Performed By: {radioDetails?.doctor}</Text>
          <Text style={styles.text}>
            Payment Type: {radioDetails?.data1[0]?.paymentType}
          </Text>
          <Text style={styles.text}>
            Payment Location: {radioDetails?.data1[0]?.location}
          </Text>
          <Text style={styles.text}>
            Remarks: {radioDetails?.data1[0]?.remarks}
          </Text>
          <Text style={styles.text}>
            Created User: {radioDetails?.data1[0]?.createdUser}
          </Text>
          <Text style={styles.text}>
            CreatedOn: {radioDetails?.data1[0]?.createdOn}
          </Text>
        </View>

        <View style={styles.headC1}>
          <Text>Test Detail</Text>
        </View>
        <View style={styles.detailshead}>
          <Text style={{ fontSize: "9", width: "40%", textAlign: "left" }}>
            Test Name
          </Text>
          <Text style={{ fontSize: "9", width: "30%" }}>Charges</Text>
          <Text style={{ fontSize: "9", width: "30%" }}>Amount</Text>
        </View>
        {radioDetails &&
          radioDetails.data?.map((items) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "4",
                border: "1px solid black",
                padding: "2",
                borderBottom: "1 px solid black",
              }}
            >
              <Text style={{ fontSize: "9", width: "40%" }}>
                {items?.serviceName}
              </Text>
              <Text
                style={{ fontSize: "9", width: "30%", textAlign: "center" }}
              >
                {items?.amount} X {items?.amount / items?.amount}
              </Text>
              <Text
                style={{ fontSize: "9", width: "30%", textAlign: "center" }}
              >
                {items?.amount}
              </Text>
            </View>
          ))}
        <View style={styles.headC1}>
          <Text>Payment Detail</Text>
        </View>
        <View style={styles.detailshead}>
          <Text style={{ fontSize: "9", width: "40%" }}>Payment No</Text>
          <Text style={{ fontSize: "9", width: "30%" }}>Total Amount</Text>
          <Text style={{ fontSize: "9", width: "30%" }}>Amount Received</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "4",
            border: "1px solid black",
            padding: "2",
            borderBottom: "1 px solid black",
          }}
        >
          <Text style={{ fontSize: "9", width: "40%", textAlign: "center" }}>
            {radioDetails?.data1[0]?.paymentNo}
          </Text>
          <Text style={{ fontSize: "9", width: "30%", textAlign: "center" }}>
            {radioDetails?.data1[0]?.amount}
          </Text>
          <Text style={{ fontSize: "9", width: "30%", textAlign: "center" }}>
            {radioDetails?.data1[0]?.amount}
          </Text>
        </View>

        <View
          style={{
            height: "2",
            width: "100%",
            marginTop: "10",
            border: "1px solid black",
          }}
        />
        <Text style={{ marginTop: "5", textAlign: "center", fontSize: "15" }}>
          GET WELL SOON 🤞
        </Text>
      </MyPage>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
    width: 288, // 4 inches in points
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  content: {
    flexGrow: 1,
  },
  head: {
    border: "1px solid black",
    padding: 2,
    display: "flex",
    paddingVertical: 4,
    marginTop: "2",
  },
  headC1: {
    border: "1px solid black",
    color: "white",
    backgroundColor: "#454545",
    textAlign: "center",
    padding: 2,
    marginTop: 4,
  },
  detailshead: {
    border: "1px solid black",
    color: "white",
    backgroundColor: "#454545",
    textAlign: "center",
    padding: 2,
    marginTop: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "4",
  },
  text: {
    fontSize: 11,
    marginTop: "2",
    width: "100%",
    overflow: "hidden",
  },
});

export default RadiologyBookingPDF;
