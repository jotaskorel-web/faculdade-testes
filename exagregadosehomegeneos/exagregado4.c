#include <stdio.h> // Disponibiliza scanf e printf.

// Define a capacidade maxima de cada vetor.
#define Tf 100

int main() {
    // Vetores de entrada e vetor que guardara os valores em comum.
    int vet1[Tf];
    int vet2[Tf];
    int vet3[Tf];

    // tl1, tl2 e tl3 sao os tamanhos logicos dos vetores.
    // i e j sao usados para percorrer as posicoes dos vetores.
    int tl1, tl2, tl3 = 0, i, j;

    // Le a quantidade de elementos que serao inseridos no primeiro vetor.
    scanf("%d", &tl1);

    // Le os elementos do primeiro vetor.
    for (i = 0; i < tl1; i++) {
        scanf("%d", &vet1[i]);
    }

    // Le a quantidade de elementos que serao inseridos no segundo vetor.
    scanf("%d", &tl2);

    // Le os elementos do segundo vetor.
    for (i = 0; i < tl2; i++) {
        scanf("%d", &vet2[i]);
    }

    // Compara cada elemento de vet1 com todos os elementos de vet2.
    for (i = 0; i < tl1; i++) {
        for (j = 0; j < tl2; j++) {
            // Se o valor existir nos dois vetores, adiciona-o a vet3.
            if (vet1[i] == vet2[j]) {
                vet3[tl3++] = vet1[i];
            }
        }
    }

    // Exibe os elementos em comum armazenados no terceiro vetor.
    for (i = 0; i < tl3; i++) {
        printf("%d ", vet3[i]);
    }

    return 0; // Indica que o programa terminou corretamente.
}











