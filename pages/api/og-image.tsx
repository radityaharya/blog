/* eslint-disable react/no-unknown-property */
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const font = fetch(new URL('../../assets/jetbrains-mono-latin-400-normal.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fontData = await font;

    const title = searchParams.get('title') || 'Post Title';
    const author = searchParams.get('author') || 'radityaharya';
    const subtext = searchParams.get('subtext') || 'Blog by Raditya Harya';
    const url = searchParams.get('url') || 'https://radityaharya.com';
    const theme = searchParams.get('theme') || 'dark';
    
    const gradient = theme === 'dark' ? 'linear-gradient(254.59deg, #29323C 0%, #000000 100%)' : 'linear-gradient(74.59deg, #FEA2C3 0%, #8AC4FD 100%)';
    const textColor = theme === 'dark' ? '#fff' : '#000';
    const boxcolortw = theme === 'dark' ? ' w-[327px] h-[20px]  bg-[#fff]' : ' w-[327px] h-[20px]  bg-[#000]';


    return new ImageResponse(
      <div style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: gradient,
        padding: "40px",
        fontFamily: "JetBrains Mono",
        color: textColor,
      }}>
        <div tw=" flex flex-col justify-between items-start gap-[124px] w-[100%] h-[100%] box-border">
          <p tw="  border-[#040404ff] text-2xl leading-6 font-mono font-[300]">
            root@local /h/{author}
          </p>
          <div tw=" flex flex-col justify-start items-start gap-[27px] box-border">
            <p tw="  border-[#040404ff] text-8xl  leading-[104%] font-mono font-[700]">
              {title}
            </p>
            <p tw="  border-[#040404ff] text-2xl leading-6 font-mono font-[400]">
              {subtext}
            </p>
          </div>
          <div tw=" flex flex-row justify-between items-center gap-2 w-[100%] box-border">
            <div tw={boxcolortw} />
            <p tw="  border-[#040404ff] text-xl leading-5 font-mono font-[300]">
              {url}
            </p>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            data: fontData,
            name: 'JetBrains Mono',
            style: 'normal',
          }
        ],
      },
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image error: ${e.message}`, {
      status: 500,
    });
  }
}