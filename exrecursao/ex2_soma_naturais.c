#include <stdio.h> // Disponibiliza scanf e printf.

// Devolve 1 + 2 + ... + n.
// Caso base: a soma ate 0 vale 0.
// Passo: soma ate n = n + soma ate (n-1).
int somaNaturais(int n) {
    // Nao ha mais numeros para somar.
    if (n <= 0) {
        return 0;
    }

    // Soma n com a soma de todos os numeros anteriores.
    return n + somaNaturais(n - 1);
}

int main() {
    int n; // quantidade de naturais que entram na soma

    // Le o valor de n.
    scanf("%d", &n);

    // Chama a funcao e imprime o valor que ela devolveu.
    // Exemplo: somaNaturais(5) = 5+4+3+2+1 = 15.
    printf("%d\n", somaNaturais(n));
    return 0;
}
