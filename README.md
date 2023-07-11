<p align="center">
  <img width="460" height="300" src="./Logo.png">
</p>

# Tes Lang

Tes is dynamically typed interpreted toy programming language written in typescript

## Parser

Recursive Descent Parser

## Grammar

### Lexer Grammar

```
ALPHA          -> "a" ... "z" | "A" ... "Z" | "_"
DIGIT          -> "0" ... "9"
IDENTIFIER     -> ALPHA ( ALPHA | DIGIT )*
NUMBER         -> DIGIT+ ( "." DIGIT+ )?
STRING         -> "( any char except "\" )*"
```

### Parser Grammar

```
program        -> declaration* EOF
declaration    ->  funDecl | varDecl | statement
funDecl        -> "fun" function
varDecl        -> "var" IDENTIFIER ( "=" expression )? ";"

statement      -> forStmt | ifStmt | printStmt | printlnStmt | breakStmt | continueStmt | returnStmt |  whileStmt | exprStmt | blockStmt
exprStmt       -> expression ";"
forStmt        -> "for" "(" ( varDecl | exprStmt | ";" ) expression? ";" expression? ")" statement
ifStmt         -> "if" "(" expression ")" statement ( "else" statement )?
printStmt      -> "print" expression ";"
printlnStmt    -> "println" expression ";"
breakStmt      -> "break ;"
continueStmt   -> "continue ;"
returnStmt     -> "return" expression? ";"
whileStmt      -> "while" "(" expression ")" statement
blockStmt     -> "{" declaration* "}"

expression     -> assignment
assignment     -> IDENTIFIER "=" assignment | logic_or
logic_or       -> logic_and ( "or" logic_and )*
logic_and      -> equality ( "and" equality )*
equality       -> comparison ( ( "!=" | "==" ) comparison )*
comparison     -> term ( ( ">" | ">=" | "<" | "<=" ) term )*
term           -> factor ( ( "-" | "+" ) factor )*
factor         -> unary ( ( "/" | "*" | "%" ) unary )*

unary          -> ( "!" | "-" ) unary | call
call           -> primary "(" arguments? ")"
primary        -> "true" | "false" | "nil" | NUMBER | STRING | IDENTIFIER | group
group          -> "(" expression ")"

function       -> IDENTIFIER "(" parameters? ")" statement
parameters     -> IDENTIFIER ( "," IDENTIFIER )*
arguments      -> expression ( "," expression )*
```
