#include <stdio.h>

#define Tf 5 // tamanho fisico: cada matriz e quadrada, 5x5

int main() {
    int A[Tf][Tf];
    int B[Tf][Tf];
    int i, j;
    int simetricas = 1; // 1 enquanto todos os pares conferem; 0 se algum falhar

    // Le a matriz A, linha por linha.
    for (i = 0; i < Tf; i++) {
        for (j = 0; j < Tf; j++) {
            scanf("%d", &A[i][j]);
        }
    }

    // Le a matriz B, linha por linha.
    for (i = 0; i < Tf; i++) {
        for (j = 0; j < Tf; j++) {
            scanf("%d", &B[i][j]);
        }
    }

    // A e B sao simetricas entre si quando A[i][j] == B[j][i] em toda posicao.
    // Basta um par diferente para o resultado passar a ser 0.
    for (i = 0; i < Tf; i++) {
        for (j = 0; j < Tf; j++) {
            if (A[i][j] != B[j][i]) {
                simetricas = 0;
            }
        }
    }

    printf("%d\n", simetricas);
    return 0;
}
