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

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf",
});

const FinallBillPDF = ({
  billData,
  service,
  ward,
  procedure,
  visit,
  totalCharges,
  depositAmount,
  userName,
  FinalBillD,
  radiology,
}) => {
  console.log("FinalBillD", FinalBillD);
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
        <Text style={{ fontSize: "12", fontFamily: "Roboto" }}>Final Bill</Text>
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
                Patient Name: {billData?.patientData[0]?.patientType}{" "}
                {billData?.patientData[0]?.patientName}{" "}
                {billData?.patientData[0]?.relativeType}{" "}
                {billData?.patientData[0]?.relativeName}
              </Text>
              <Text fixed style={[styles.font, styles.ml1, styles.wid1]}>
                Gender: {billData?.patientData[0]?.gender}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Contact: {billData?.patientData[0]?.cellNo}
              </Text>
              <Text fixed style={[styles.font, styles.ml2, styles.wid1]}>
                Consultant: {billData?.ConsultantName[0]?.name}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Party: {billData?.activeParty[0]?.party}
              </Text>
              <Text fixed style={[styles.font, styles.ml3, styles.wid1]}>
                Admission No: {billData?.activeParty[0]?.admissionNo}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Mr No: {billData?.activeParty[0]?.mrNo}
              </Text>
              <Text fixed style={[styles.font, styles.ml3, styles.wid1]}>
                Admission User: {billData?.admissionData[0]?.createdUser}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.ml4, styles.wid]}>
                Address: {billData?.patientData[0]?.address}
              </Text>
              <Text fixed style={[styles.font, styles.wid1]}>
                Admission Date: {billData?.admissionData[0]?.createdOn}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.ml5, styles.wid]}>
                Age:{" "}
                {billData?.patientData[0]?.ageYear
                  ? billData?.patientData[0]?.ageYear
                  : "0"}{" "}
                Years{" "}
                {billData?.patientData[0]?.ageMonth
                  ? billData?.patientData[0]?.ageMonth
                  : "0"}{" "}
                Months{" "}
                {billData?.patientData[0]?.ageDay
                  ? billData?.patientData[0]?.ageDay
                  : "0"}{" "}
                Days
              </Text>
              <Text fixed style={[styles.font, styles.wid1]}>
                Discharge Date: {billData?.admissionData[0]?.dischargeDate}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.ml4, styles.wid]}>
                Ward Name: {billData?.activeWard[0]?.wardName}
              </Text>
              <Text fixed style={[styles.font, styles.wid1]}>
                Discharge User: {FinalBillD?.dischargeUser}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.ml4, styles.wid]}>
                Bed No: {billData?.activeWard[0]?.bedNo}
              </Text>
              <Text fixed style={[styles.font, styles.wid1]}>
                Bill No: {FinalBillD?.billNo}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.ml4, styles.wid]}>
                Bill User: {FinalBillD?.billUser}
              </Text>
              <Text fixed style={[styles.font, styles.wid1]}>
                Bill Date: {FinalBillD?.billDate}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.ml4, styles.wid]}>
                Remarks: {billData?.admissionData[0]?.remarks}
              </Text>
              <Text fixed style={[styles.font, styles.wid1]}>
                Reffered By: {billData?.admissionData[0]?.referedBy}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.headC1}>
          <Text>Services Detail</Text>
        </View>
        <View style={styles.head}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#454545",
              color: "white",
              padding: "2",
            }}
          >
            <Text style={{ fontSize: "10" }}>Service Heads</Text>
            <Text style={{ fontSize: "10" }}> Charges </Text>
          </View>
          {/* service Charges8 */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "2px",
              borderBottom: "1px solid lightgray", // Change 'lightgray' to your desired color
            }}
          >
            <Text style={{ fontSize: "10" }}>Service Charges</Text>
            <Text style={{ fontSize: "10" }}>{service} </Text>
          </View>
          {/* .visit charges */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "2px",
              borderBottom: "1px solid lightgray", // Change 'lightgray' to your desired color
            }}
          >
            <Text style={{ fontSize: "10" }}>Consultant Visit Charges</Text>
            <Text style={{ fontSize: "10" }}>{visit} </Text>
          </View>

          {/* Ward Charges */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "2px",
              borderBottom: "1px solid lightgray", // Change 'lightgray' to your desired color
            }}
          >
            <Text style={{ fontSize: "10" }}>Ward Charges</Text>
            <Text style={{ fontSize: "10" }}>{ward} </Text>
          </View>
          {/* procedure Charges */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "2px",
              borderBottom: "1px solid lightgray", // Change 'lightgray' to your desired color
            }}
          >
            <Text style={{ fontSize: "10" }}>Procedure Charges</Text>
            <Text style={{ fontSize: "10" }}>{procedure} </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "2px",
              borderBottom: "1px solid lightgray", // Change 'lightgray' to your desired color
            }}
          >
            <Text style={{ fontSize: "10" }}>Laboratory Charges</Text>
            <Text style={{ fontSize: "10" }}>0 </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "2px",
              borderBottom: "1px solid lightgray", // Change 'lightgray' to your desired color
            }}
          >
            <Text style={{ fontSize: "10" }}>Radiology Charges</Text>
            <Text style={{ fontSize: "10" }}>{radiology}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "2px",
            }}
          >
            <Text style={{ fontSize: "10" }}>Pharmacy Charges</Text>
            <Text style={{ fontSize: "10" }}>0 </Text>
          </View>
        </View>

        <View style={styles.headC1}>
          <Text>Deposit Detail</Text>
        </View>
        <View style={styles.head}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#454545",
              color: "white",
              padding: "2",
            }}
          >
            <Text style={{ fontSize: "10", width: "25%", textAlign: "center" }}>
              Payment No
            </Text>
            <Text style={{ fontSize: "10", width: "25%", textAlign: "center" }}>
              {" "}
              Payment Type{" "}
            </Text>
            <Text style={{ fontSize: "10", width: "25%", textAlign: "center" }}>
              {" "}
              Data{" "}
            </Text>
            <Text style={{ fontSize: "10", width: "25%", textAlign: "center" }}>
              {" "}
              Amount{" "}
            </Text>
          </View>
          {billData.depositDetails.length > 0 &&
            billData.depositDetails.map((item, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "2px",
                  borderBottom: "1px solid lightgray", // Change 'lightgray' to your desired color
                }}
              >
                <Text
                  style={{ fontSize: "10", width: "25%", textAlign: "center" }}
                >
                  {item?.paymentNo}
                </Text>
                <Text
                  style={{ fontSize: "10", width: "25%", textAlign: "center" }}
                >
                  {item?.paymentType}
                </Text>
                <Text
                  style={{ fontSize: "10", width: "25%", textAlign: "center" }}
                >
                  {item?.createdOn}
                </Text>
                <Text
                  style={{ fontSize: "10", width: "25%", textAlign: "center" }}
                >
                  {item?.amount}
                </Text>
              </View>
            ))}
        </View>
        <View
          style={{
            width: "60%",
            border: "2px solid black",
            marginTop: "3",
            display: "flex",
            padding: "2",
            alignSelf: "flex-end",
          }}
        >
          <View style={styles.headC1}>
            <Text>Bill Detail</Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: "2" }}
          >
            <Text
              style={{
                width: "50%",
                textAlign: "center",
                border: "1px solid black",
                fontSize: "12",
              }}
            >
              Total Amount
            </Text>
            <Text
              style={{
                width: "50%",
                textAlign: "center",
                border: "1px solid black",
                fontSize: "12",
              }}
            >
              {totalCharges}
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: "2" }}
          >
            <Text
              style={{
                width: "50%",
                textAlign: "center",
                border: "1px solid black",
                fontSize: "12",
              }}
            >
              Deposit Amount
            </Text>
            <Text
              style={{
                width: "50%",
                textAlign: "center",
                border: "1px solid black",
                fontSize: "12",
              }}
            >
              {depositAmount}
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: "2" }}
          >
            <Text
              style={{
                width: "50%",
                textAlign: "center",
                border: "1px solid black",
                fontSize: "12",
              }}
            >
              Recievable Amount
            </Text>
            <Text
              style={{
                width: "50%",
                textAlign: "center",
                border: "1px solid black",
                fontSize: "12",
              }}
            >
              {totalCharges - depositAmount > 0
                ? totalCharges - depositAmount
                : 0}
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: "2" }}
          >
            <Text
              style={{
                width: "50%",
                textAlign: "center",
                border: "1px solid black",
                fontSize: "12",
              }}
            >
              Refunded Amount
            </Text>
            <Text
              style={{
                width: "50%",
                textAlign: "center",
                border: "1px solid black",
                fontSize: "12",
              }}
            >
              {totalCharges - depositAmount > 0
                ? 0
                : totalCharges - depositAmount}
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
  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.3,
  },
  watermark: {
    width: 600,
    height: 150,
    transform: "rotate(-45deg)", // Rotate the watermark
  },
  content: {
    zIndex: 1,
  },
});

export default FinallBillPDF;
