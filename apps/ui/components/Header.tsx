import Image from 'next/image';
import logo from "../Logo.svg";

export default function Header() {

    const REPO = "https://github.com/saoodahmad/Tes"
  return (
    <div
      style={{
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '80px',
      }}
    >
      <Image
        style={{
          width: '100%',
          height: '280px',
          marginTop: '20px',
        }}
        src={logo}
        alt="Next.js Logo"
        priority
      />

      <a href={REPO} target="_blank">
        [{REPO}]
      </a>
      <h5
        style={{
          font: 'caption',
          fontSize: '25px',
          fontWeight: 'bold',
          color: 'GrayText',
          marginBottom: '15px',
          textAlign: 'center',
        }}
      >
        Toy programming language written in Typescript
      </h5>
      <p style={{ textAlign: 'center' }}>
        Made by <span style={{ fontStyle: 'oblique' }}> Saood Ahmad </span>
        and <span style={{ fontStyle: 'oblique' }}> Rohan Pandey</span>
      </p>

      <div
        style={{
          width: '100%',
          marginTop: '50px',
          marginBottom: '50px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <a
          href="#editor"
          style={{
            backgroundColor: 'black',
            padding: '20px',
            color: 'white',
            fontSize: '22px',
            borderRadius: '10px',
          }}
        >
          Playground
        </a>
      </div>
    </div>
  );
}
