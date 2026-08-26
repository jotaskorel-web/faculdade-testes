#include <stdio.h>

#define Tf 100 // tamanho fisico: o vetor suporta ate 100 inteiros

int main() {
    int vet[Tf];
    int tl, i, numero, contador = 0;

    // Le o tamanho logico: quantas posicoes do vetor serao preenchidas.
    scanf("%d", &tl);

    // Le os tl valores e guarda cada um em uma posicao do vetor.
    for (i = 0; i < tl; i++) {
        scanf("%d", &vet[i]);
    }

    // Le o numero que sera procurado dentro do vetor.
    scanf("%d", &numero);

    // Compara cada valor do vetor com o numero procurado.
    for (i = 0; i < tl; i++) {
        if (vet[i] == numero) {
            contador++; // aumenta a contagem quando encontra uma ocorrencia
        }
    }

    printf("%d\n", contador);
    return 0;
}
