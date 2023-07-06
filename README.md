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
