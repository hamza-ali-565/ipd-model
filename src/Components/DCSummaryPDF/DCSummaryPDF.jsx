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

const DCSummary = ({ summaryData, mrData, userName, consultant, ward }) => {
  const MyPage = ({ children }) => (
    <Page style={styles.page}>
      <Text>Your Company Logo</Text>
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
                Patient Name: {mrData?.patientType} {mrData?.patientName}{" "}
                {mrData?.relativeType} {mrData?.relativeName}
              </Text>
              <Text fixed style={[styles.font, styles.ml1, styles.wid1]}>
                Gender: {mrData?.gender}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Contact: {mrData?.cellNo}
              </Text>
              <Text fixed style={[styles.font, styles.ml2, styles.wid1]}>
                Consultant: {consultant[0]?.name}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Party: {consultant[0]?.party}
              </Text>
              <Text fixed style={[styles.font, styles.ml3, styles.wid1]}>
                Admission No: {mrData?.admissionNo}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Mr No: {mrData?.mrNo}
              </Text>
              <Text fixed style={[styles.font, styles.ml5, styles.wid1]}>
                Age: {mrData?.ageYear ? mrData?.ageYear : "0"} Years{" "}
                {mrData?.ageMonth ? mrData?.ageMonth : "0"} Months{" "}
                {mrData?.ageDay ? mrData?.ageDay : "0"} Days
              </Text>
            </View>

            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.ml4, styles.wid]}>
                Ward Name: {ward[0]?.wardName}
              </Text>
              <Text fixed style={[styles.font, styles.wid1]}>
                Bed No: {ward[0]?.bedNo}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.ml4, styles.wid]}>
                Discharge Condition: {summaryData[0]?.dischargeCondition}
              </Text>
              <Text fixed style={[styles.font, styles.wid1]}>
                Discharge Summary Date: {summaryData[0]?.createdOn}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.ml4, styles.wid]}>
                Discharge Consultant: {summaryData[0]?.dischargeDoctor}
              </Text>
              <Text fixed style={[styles.font, styles.wid1]}>
                Created User: {summaryData[0]?.createUser}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.headC1}>
          <Text>Discharge Summary Details</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "2",
          }}
        >
          <View
            style={{
              width: "48%",
              border: "1px solid black",
              borderRadius: "2",
              marginTop: "3",
            }}
          >
            <View style={styles.headC3}>
              <Text style={{ fontSize: "10" }}>Presenting Complaints</Text>
            </View>
            <Text style={{ fontSize: "8", padding: "2" }}>
              {summaryData[0]?.dischargeSummaryData[0].pComplaints}
            </Text>
          </View>
          <View
            style={{
              width: "48%",
              border: "1px solid black",
              borderRadius: "2",
              marginTop: "3",
            }}
          >
            <View style={styles.headC3}>
              <Text style={{ fontSize: "10" }}>Diagnosis</Text>
            </View>
            <Text style={{ fontSize: "8", padding: "2" }}>
              {summaryData[0]?.dischargeSummaryData[1].diagnosis}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "2",
          }}
        >
          <View
            style={{
              width: "48%",
              border: "1px solid black",
              borderRadius: "2",
              marginTop: "3",
            }}
          >
            <View style={styles.headC3}>
              <Text style={{ fontSize: "10" }}>Relevant Investigation</Text>
            </View>
            <Text style={{ fontSize: "8", padding: "2" }}>
              {summaryData[0]?.dischargeSummaryData[2].rInvestigation}
            </Text>
          </View>
          <View
            style={{
              width: "48%",
              border: "1px solid black",
              borderRadius: "2",
              marginTop: "3",
            }}
          >
            <View style={styles.headC3}>
              <Text style={{ fontSize: "10" }}>Hospital Course</Text>
            </View>
            <Text style={{ fontSize: "8", padding: "2" }}>
              {summaryData[0]?.dischargeSummaryData[3].hCourse}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "2",
          }}
        >
          <View
            style={{
              width: "48%",
              border: "1px solid black",
              borderRadius: "2",
              marginTop: "3",
            }}
          >
            <View style={styles.headC3}>
              <Text style={{ fontSize: "10" }}>Date Of Surgery</Text>
            </View>
            <Text style={{ fontSize: "8", padding: "2" }}>
              {summaryData[0]?.dischargeSummaryData[4].DOSurgery}
            </Text>
          </View>
          <View
            style={{
              width: "48%",
              border: "1px solid black",
              borderRadius: "2",
              marginTop: "3",
            }}
          >
            <View style={styles.headC3}>
              <Text style={{ fontSize: "10" }}>Operative Procedure</Text>
            </View>
            <Text style={{ fontSize: "8", padding: "2" }}>
              {summaryData[0]?.dischargeSummaryData[5].oProcedure}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "2",
          }}
        >
          <View
            style={{
              width: "48%",
              border: "1px solid black",
              borderRadius: "2",
              marginTop: "3",
            }}
          >
            <View style={styles.headC3}>
              <Text style={{ fontSize: "10" }}>Pending Reports</Text>
            </View>
            <Text style={{ fontSize: "8", padding: "2" }}>
              {summaryData[0]?.dischargeSummaryData[6].pReports}
            </Text>
          </View>
          <View
            style={{
              width: "48%",
              border: "1px solid black",
              borderRadius: "2",
              marginTop: "3",
            }}
          >
            <View style={styles.headC3}>
              <Text style={{ fontSize: "10" }}>Instruction On Discharge</Text>
            </View>
            <Text style={{ fontSize: "8", padding: "2" }}>
              {summaryData[0]?.dischargeSummaryData[7].IODischarge}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "2",
          }}
        >
          <View
            style={{
              width: "48%",
              border: "1px solid black",
              borderRadius: "2",
              marginTop: "3",
            }}
          >
            <View style={styles.headC3}>
              <Text style={{ fontSize: "10" }}>Madication On Discharge</Text>
            </View>
            <Text style={{ fontSize: "8", padding: "2" }}>
              {summaryData[0]?.dischargeSummaryData[8].MODischarge}
            </Text>
          </View>
          <View
            style={{
              width: "48%",
              border: "1px solid black",
              borderRadius: "2",
              marginTop: "3",
            }}
          >
            <View style={styles.headC3}>
              <Text style={{ fontSize: "10" }}>Follow Up</Text>
            </View>
            <Text style={{ fontSize: "8", padding: "2" }}>
              {summaryData[0]?.dischargeSummaryData[9].FollowUp}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "2",
          }}
        >
          <View
            style={{
              width: "48%",
              border: "1px solid black",
              borderRadius: "2",
              marginTop: "3",
            }}
          >
            <View style={styles.headC3}>
              <Text style={{ fontSize: "10" }}>Condition On Discharge</Text>
            </View>
            <Text style={{ fontSize: "8", padding: "2" }}>
              {summaryData[0]?.dischargeSummaryData[10].CODischarge}
            </Text>
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
    marginTop: "2",
    padding: "2",
  },
  headC1: {
    border: "1px solid black",
    color: "white",
    backgroundColor: "#454545",
    textAlign: "center",
    padding: "2",
    marginTop: "4",
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
  headC3: {
    border: "1px solid black",
    color: "white",
    backgroundColor: "#454545",
    textAlign: "center",
    padding: "1",
    marginTop: "1",
  },
});

export default DCSummary;
