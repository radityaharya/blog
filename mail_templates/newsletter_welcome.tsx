import Link from "@components/Link"
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components"
import * as React from "react"

interface WelcomeEmailProps {
  address: string | string[]
}

export const NewsletterWelcomeEmail = ({
  address = " ",
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Thanks for subscribing to my newsletter!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>
          Hi there,
          <br />
          <br />
          I wanted to take a moment to thank you for subscribing to my
          newsletter. I&apos;m thrilled to have you as part of my community!
          <br />
          <br />
          Moving forward, you can expect to receive regular updates on my latest
          blog posts, projects, and other things I&apos;m working on.
          <br />
          <br />
          If you ever have any questions or feedback, please don&apos;t hesitate
          to reach out by replying to this email.
          <br />
          <br />
          Once again, thank you for subscribing!
        </Text>
        <Text style={paragraph}>
          Best,
          <br />
          Raditya Harya
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          {" "}
          don&apos;t want to receive these emails?{" "}
          <Link
            href={`https://radityaharya.com/api/newsletter/unsubscribe?address=${address}`}
          >
            unsubscribe
          </Link>
          .
        </Text>
      </Container>
    </Body>
  </Html>
)

export default NewsletterWelcomeEmail

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "monospace",
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
}

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
}
