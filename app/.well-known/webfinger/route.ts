import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({
    subject: 'acct:contact@radityaharya.com',
    links: [
      {
        rel: 'http://openid.net/specs/connect/1.0/issuer',
        href: 'https://login.radityaharya.com'
      }
    ]
  })
}
