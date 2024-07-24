import React from "react";
import {
  Text,
  Page,
  Document,
  StyleSheet,
  View,
  Image,
  Font,
} from "@react-pdf/renderer";
import logo from "../../Images/ZMCLogo-2.png";
// Register the Roboto font
Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf",
});

const ReservationPDF = ({ billData, userName, consultantDetails }) => {
  const MyPage = ({ children }) => (
    <Page style={styles.page}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Your Company Logo</Text>
        <Text style={{ fontSize: "12", fontFamily: "Roboto" }}>
          Reservation Form
        </Text>
      </View>
      <View style={styles.content}>{children}</View>
      <View style={styles.footer} />
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
    </Page>
  );

  return (
    <Document>
      <MyPage>
        <View style={styles.headC1}>
          <Text>Patient Detail</Text>
        </View>

        <View style={styles.head}>
          {/* Patient Details */}
          <View style={styles.headCNew}>
            <View style={styles.headC2}>
              <Text
                fixed
                style={[styles.font, { fontWeight: "bold" }, styles.wid]}
              >
                Patient Name: {billData?.patientType} {billData?.patientName}{" "}
                {billData?.relativeType} {billData?.relativeName}
              </Text>
              <Text fixed style={[styles.font, styles.ml1, styles.wid1]}>
                Gender: {billData?.gender}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Contact: {billData.cellNo}
              </Text>
              <Text fixed style={[styles.font, styles.ml2, styles.wid1]}>
                Consultant:{" "}
                {consultantDetails[0]?.name
                  ? consultantDetails[0]?.name
                  : billData
                  ? billData?.consultantName
                  : ""}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Party: Cash
              </Text>
              <Text fixed style={[styles.font, styles.ml3, styles.wid1]}>
                Reservation No: {billData?.reservationNo}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Mr No: {billData?.mrNo}
              </Text>
              <Text fixed style={[styles.font, styles.ml3, styles.wid1]}>
                Reservation User: {billData?.createdUser}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.ml4, styles.wid]}>
                Address: {billData?.address}
              </Text>
              <Text fixed style={[styles.font, styles.wid1]}>
                Reservation Date: {billData?.createdOn}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.ml5, styles.wid]}>
                Age: {billData?.ageYear ? billData?.ageYear : "0"} Years{" "}
                {billData?.ageMonth ? billData?.ageMonth : "0"} Months{" "}
                {billData?.ageDay ? billData?.ageDay : "0"} Days
              </Text>

              <Text fixed style={[styles.font, styles.wid1]}>
                Remarks: "Hello"
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.head}>
          <View style={styles.headC1}>
            <Text>Reservation Period</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: "5",
              fontSize: "10",
              paddingHorizontal: "2",
            }}
          >
            <Text>From Date: {billData?.fromDate}</Text>
            <Text>To Date: {billData?.toDate}</Text>
          </View>
        </View>

        <View style={styles.head}>
          <View style={styles.headC1}>
            <Text>Advice By</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: "5",
              fontSize: "10",
              paddingHorizontal: "2",
            }}
          >
            <Text>
              Consultant Name:{" "}
              {consultantDetails[0]?.name
                ? consultantDetails[0]?.name
                : billData
                ? billData?.consultantName
                : ""}
            </Text>
          </View>
        </View>

        <View style={styles.head}>
          <View style={styles.headC1}>
            <Text>Amount Details</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: "5",
              fontSize: "10",
              paddingHorizontal: "2",
            }}
          >
            <Text>Amount Paid: {billData?.amount}</Text>
          </View>
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
    marginTop: "10",
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

export default ReservationPDF;
