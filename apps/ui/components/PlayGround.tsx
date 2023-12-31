'use client';

import dynamic from 'next/dynamic';
import {  useState } from 'react';

import  { TesLang } from 'tes';

const CodeEditor = dynamic(() => import('@uiw/react-codemirror'), {
  ssr: false,
});

export default function Editor() {
  const templates = [
    {
      label: '1. Hello World!',
      code:
        '// Print Hello World!\n\n' +  
        'println "Hello World!";',
    },
    {
      label: '2. Fibonacci!',
      code:
        '/*\n' + 
        ' Print first 5 fibonacci numbers\n' +
        '*/\n\n' + 
        'fun fib( n ) {\n' +
        '  if(n <= 1) {\n' +
        '    return n;\n' +
        '  }\n\n' +
        '  return fib(n-1) + fib(n-2);\n' +
        '}\n\n' +
        'for (var i = 0; i<5; i = i + 1) {\n' +
        '  print fib(i);\n'+
        '  print " ";\n'+
        '}\n'  
    },
    {
      label: '3. Prime Numbers!',
      code:
        '/*\n' + 
        ' Print first 5 prime numbers starting from 5\n' +
        '*/\n\n' + 
        'fun isPrime( n ) {\n' +
        '  for (var i = 2; i * i <= n; i = i + 1) {\n' +
        '    if(n % i == 0){\n' +
        '      return false;\n' +
        '    }\n' +
        '  }\n\n' +
        '  return true;\n' +
        '}\n\n' + 
        'var x = 5;\n' + 
        'var cnt = 0;\n\n' +
        'while(true){\n' + 
        '  if(cnt == 5) break;\n\n' +
        '  if(isPrime(x)) {\n' +
        '    cnt = cnt + 1;\n' +
        '    print x;\n' + 
        '    print " ";\n' + 
        '  }\n\n' +
        '  x = x + 1;\n' +
        '}\n'
    },
    {
      label: '4. Odd Numbers!',
      code:
        '/*\n' + 
        ' Print odd numbers between 1 and 10 (both inclusive)\n' +
        '*/\n\n' + 
        'var x = 1;\n\n' + 
        'for (; x <= 10; x = x + 1) {\n' + 
        '  if( x % 2 == 0) continue;\n\n' + 
        '  print x;\n' + 
        '  println " ";\n' + 
        '}\n' 
    },
  ];

  const [src, setSrc] = useState<string>(templates[0].code);

  const [hasError, setHasError] = useState<boolean>(false);

  const [output, setOutput] = useState<string>('');

  const run = (src: string) => {
    TesLang.reset();

    setHasError(false);
    setOutput('');

    TesLang.run(src);
    
    if (
      TesLang.hasInterpreterError ||
      TesLang.hasParserError ||
      TesLang.hasLexerError
    ) {
      setHasError(true);
      setOutput(TesLang.error.trimEnd());

      return;
    }

    setOutput(TesLang.output.trimEnd());
  };

  return (
    <div
      id="editor"
      style={{
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            color: 'black',
            width: '20%',
          }}
        >
          Playground
        </h1>
        <div style={{ width: '30%' }}>
          <select
            style={{ width: '100%', padding: '4px', border: '1px solid black' }}
            defaultValue={0}
            onChange={(e) => setSrc(templates[Number(e.target.value)].code)}
          >
            {templates.map((template, idx) => (
              <option value={idx} key={idx}>
                {template.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: '330px',
          border: '1px solid  black',
          marginBottom: '20px',
        }}
      >
        <CodeEditor
          style={{
            width: '100%',
            fontSize: '18px',
          }}
          value={src}
          height="330px"
          extensions={[]}
          onChange={(value: string, viewUpdate: unknown) => {
            setSrc(value);
          }}
          theme="light"
        />
      </div>
      <button
        style={{
          alignSelf: 'flex-end',
          // alignSelf: 'flex-',
          width: '150px',
          padding: '10px',
          backgroundColor: 'black',
          color: 'white',
          font: 'caption',
          border: 'none',
          fontWeight: 'bolder',
          borderRadius: '10px',
          //   fontFamily: 'monospace',
        }}
        onClick={(e) => {
          run(src);
        }}
      >
        Run
      </button>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <h4 style={{ alignContent: 'flex-start' }}>Output</h4>

        <div
          style={{
            width: '100%',
            boxSizing: 'border-box',
            border: '1px solid black',
            height: '200px',
            padding: '6px',
          }}
        >
          {output.split('\n').map((line, idx) => (
            <p
              key={idx}
              style={{
                width: '92%',
                color: hasError ? 'red' : 'darkslategray',
                font: 'caption',
                wordWrap: 'break-word',
                letterSpacing: '1px',
                margin: '0px',
                marginBottom: '3px',
                fontSize: '18px',
                fontFamily: 'sans-serif',
              }}
            >
              {`> ${line.trim()}`}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
