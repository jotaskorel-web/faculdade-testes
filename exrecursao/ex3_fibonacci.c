#include <stdio.h> // Disponibiliza scanf e printf.

// Devolve o n-esimo termo de Fibonacci.
// Sequencia: 0, 1, 1, 2, 3, 5, 8...
// F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2).
int fibonacci(int n) {
    // Primeiro caso base: o termo 0 vale 0.
    if (n == 0) {
        return 0;
    }

    // Segundo caso base: o termo 1 vale 1.
    // Sao dois casos base porque cada termo depende dos dois anteriores.
    if (n == 1) {
        return 1;
    }

    // Soma o termo anterior com o termo antes dele.
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int n; // posicao do termo pedido

    // Le o valor de n.
    scanf("%d", &n);

    // Chama a funcao e imprime o valor que ela devolveu.
    // Exemplo: fibonacci(6) = 8.
    printf("%d\n", fibonacci(n));
    return 0;
}
