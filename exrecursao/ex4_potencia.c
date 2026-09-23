#include <stdio.h> // Disponibiliza scanf e printf.

// Devolve a elevado a b.
// Caso base: qualquer numero elevado a 0 vale 1.
// Passo: a^b = a * a^(b-1). A base fica igual; so o expoente diminui.
int potencia(int a, int b) {
    // Expoente 0 encerra a recursao.
    if (b == 0) {
        return 1;
    }

    // Multiplica a pela potencia com expoente uma unidade menor.
    return a * potencia(a, b - 1);
}

int main() {
    int a, b; // a = base; b = expoente

    // Le a base e o expoente.
    scanf("%d %d", &a, &b);

    // Chama a funcao e imprime o valor que ela devolveu.
    // Exemplo: potencia(2, 3) = 2*2*2 = 8.
    printf("%d\n", potencia(a, b));
    return 0;
}
