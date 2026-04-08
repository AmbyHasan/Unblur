import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Preview,
} from "@react-email/components";

interface Props {
  username: string;
  verifyUrl: string;
}

export default function VerificationEmail({ username, verifyUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Verify your KORE account</Preview>
      <Body style={{ backgroundColor: "#f4f4f5", padding: "40px 0" , margin:"3px" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            maxWidth: "500px",
          }}
        >
          <Heading style={{ color: "#111827", margin: "2px" }}>
            Welcome to KORE ✨
          </Heading>

          <Text style={{ color: "#4b5563", fontSize: "16px" }}>
           <div>Hi {username}, </div> 
            click the button below to verify your email and activate your account.
          </Text>

          <Button
            href={verifyUrl}
            style={{
              backgroundColor: "#111827",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              display: "inline-block",
              marginTop: "20px",
            }}
          >
            Verify Email
          </Button>

          <Text style={{ fontSize: "12px", color: "#9ca3af", marginTop: "30px" }}>
            If you didn’t create this account, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}