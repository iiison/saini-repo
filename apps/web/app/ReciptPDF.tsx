import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { CartItems } from "./types";

export default function ReciptPDF({ cartItems }: { cartItems: CartItems[] }) {
  const date = new Date();
  const formattedDate = `${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}/${date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)}/${date.getFullYear()}`;
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <Document>
      <Page
        size={{ width: 58 * 2.83465 }}
        wrap={false}
        style={{ paddingBottom: "20px", margin: "0 auto", width: "95%" }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              padding: "10 0",
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Saini Sweets
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "95%",
              fontSize: "8px",
              margin: "0 auto",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                width: "60%",
              }}
            >
              {formattedDate}
            </Text>
            <Text
              style={{
                marginLeft: "auto",
                width: "30%",
                textAlign: "right",
              }}
            >
              {time}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 10,
              textAlign: "center",
            }}
          >
            ===========================
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            display: "flex",
            width: "95%",
            margin: "0 auto",
            flexDirection: "column",
            fontSize: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
            }}
          >
            <Text style={{ width: "40%" }}>Item</Text>
            <Text style={{ width: "30%" }}>Qty</Text>
            <Text style={{ width: "15%" }}>Rt.</Text>
            <Text style={{ width: "15%", textAlign: "right" }}>Amt</Text>
          </View>
        </View>
        {cartItems.map((item) => (
          <View
            key={item.id}
            style={{
              marginTop: 10,
              display: "flex",
              width: "95%",
              margin: "0 auto",
              flexDirection: "column",
              fontSize: 10,
            }}
          >
            <View>
              <Text
                style={{ width: "100%", fontSize: 12, fontWeight: "normal" }}
              >
                ----------------------------------------
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
              }}
            >
              <Text style={{ width: "40%" }}>{item.name}</Text>
              <Text style={{ width: "30%" }}>
                {item.count} {item.unit}
              </Text>
              <Text style={{ width: "15%" }}>{item.rate}</Text>
              <Text style={{ width: "15%", textAlign: "right" }}>
                {item.count * item.rate}
              </Text>
            </View>
          </View>
        ))}
        <View>
          <Text
            style={{
              width: "100%",
              fontSize: 12,
              fontWeight: "normal",
              textAlign: "center",
            }}
          >
            ----------------------------------------
          </Text>
        </View>
        <View
          style={{
            width: "90%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "row",
            fontSize: "12px",
          }}
        >
          <Text>Total</Text>
          <Text style={{ marginLeft: "auto", textAlign: "right" }}>
            Rs.{" "}
            {cartItems.reduce((prev, curr) => prev + curr.rate * curr.count, 0)}
          </Text>
        </View>
        <Text
          style={{
            width: "100%",
            fontSize: 12,
            fontWeight: "normal",
            textAlign: "center",
          }}
        >
          ----------------------------------------
        </Text>
      </Page>
    </Document>
  );
}
