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
  resetUrl: string;
}

export default function ResetPasswordEmail({ username, resetUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Reset your KORE password</Preview>
      <Body
        style={{
          backgroundColor: "#f4f4f5",
          padding: "40px 0",
          margin: "3px",
        }}
      >
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
            Reset Your Password 🔐
          </Heading>

          <Text style={{ color: "#4b5563", fontSize: "16px" }}>
            Hi {username},
          </Text>

          <Text style={{ color: "#4b5563", fontSize: "16px" }}>
            We received a request to reset your password for your KORE account.
            Click the button below to choose a new password.
          </Text>

          <Button
            href={resetUrl}
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
            Reset Password
          </Button>

          <Text
            style={{
              fontSize: "14px",
              color: "#6b7280",
              marginTop: "20px",
            }}
          >
            This link will expire in 15 minutes for security reasons.
          </Text>

          <Text
            style={{
              fontSize: "12px",
              color: "#9ca3af",
              marginTop: "30px",
            }}
          >
            If you didn’t request a password reset, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}