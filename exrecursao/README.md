# Lista — Subprogramação recursiva

Cada função devolve um `int` com `return`. O `main` imprime esse valor.

Cada exercício está em um arquivo `.c` separado. Compile com GCC, por exemplo:

```text
gcc ex1_fatorial.c -o ex1_fatorial
```

Entrada: um valor por programa (no item **d**, dois inteiros `a` e `b`).

---

## a) Fatorial — `ex1_fatorial.c`

**Problema:** calcular \(n!\) para \(n\) inteiro não negativo.

**Ideia recursiva:** o fatorial de \(n\) é \(n\) vezes o fatorial de \(n-1\). Quando \(n \le 1\), o resultado é **1** (inclui \(0! = 1\)).

| Chamada encadeada para `fatorial(5)` |
|--------------------------------------|
| `5 * fatorial(4)` → `5 * 4 * fatorial(3)` → … → `5 * 4 * 3 * 2 * 1` = **120** |

---

## b) Soma dos primeiros n naturais — `ex2_soma_naturais.c`

**Problema:** retornar \(1 + 2 + \cdots + n\).

**Ideia recursiva:** a soma até \(n\) é \(n\) mais a soma até \(n-1\). Caso base: soma até **0** é **0**.

Exemplo: `soma_naturais(5)` = \(5 + 4 + 3 + 2 + 1\) = **15**.

---

## c) Fibonacci — `ex3_fibonacci.c`

**Problema:** retornar o \(n\)-ésimo termo com \(F(0)=0\), \(F(1)=1\), \(F(n)=F(n-1)+F(n-2)\).

**Ideia recursiva:** dois casos base (\(n=0\) e \(n=1\)); depois cada termo é a **soma** dos dois anteriores, chamando a função de novo para \(n-1\) e \(n-2\).

Exemplo: `fibonacci(6)` = **8** (sequência: 0, 1, 1, 2, 3, 5, 8).

> Esta versão é didática, mas lenta para \(n\) grande (muitas chamadas repetidas). Em produção costuma-se usar iteração ou memoização.

---

## d) Potência \(a^b\) — `ex4_potencia.c`

**Problema:** calcular \(a^b\) com \(a > 0\) e \(b \ge 0\).

**Ideia recursiva:** \(a^b = a \cdot a^{b-1}\). Caso base: qualquer \(a^0 = 1\).

Exemplo: `potencia(2, 10)` = **1024**.
