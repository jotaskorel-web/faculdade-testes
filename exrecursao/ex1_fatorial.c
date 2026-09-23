#include <stdio.h> // Disponibiliza scanf e printf.

// Devolve n!. O int na frente da funcao indica que o resultado volta com return.
// Caso base: 0! e 1! valem 1.
// Passo: n! = n * (n-1)!.
int fatorial(int n) {
    // Se n for 0 ou 1, a recursao para aqui.
    if (n <= 1) {
        return 1;
    }

    // Multiplica n pelo fatorial de n-1. A chamada de fatorial dentro dela mesma e a recursao.
    return n * fatorial(n - 1);
}

int main() {
    int n; // numero lido do teclado

    // Le o valor de n.
    scanf("%d", &n);

    // Chama a funcao e imprime o valor que ela devolveu.
    // Exemplo: fatorial(5) = 5*4*3*2*1 = 120.
    printf("%d\n", fatorial(n));
    return 0;
}
